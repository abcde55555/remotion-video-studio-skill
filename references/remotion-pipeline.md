# Remotion 工程与确定性渲染

## 1. 工程结构

```
src/
  Root.tsx                 # Composition 注册
  scenes/<film>/<Film>.tsx # 场景组件（含 Subtitle/VO 表）
  theme/fonts.ts           # loadFont
  theme/tokens.ts          # spring 配置/色板
public/
  audio/<music>.wav
  audio/<film>vo/l1.wav…
  assets/<film>/...        # 帧序列 JPEG/PNG
```

## 2. 素材：预抽帧，不用 `<OffthreadVideo>`

```bash
# 视频 → 帧序列（2s / 60 帧，640–800px，JPEG q4–5）
ffmpeg -ss 1.0 -t 2.0 -i clip.webm -vf "fps=30,scale=800:450" -q:v 4 out/f%03d.jpg
```

```tsx
const Seq = ({dir,count,frame,span}) => {
  const i = Math.min(count-1, Math.floor(frame/span*count));
  return <Img src={staticFile(`assets/.../${dir}/f${String(i+1).padStart(3,'0')}.jpg`)} />;
};
```

> `<OffthreadVideo>` 播 mp4 在长片上会产生编码级不可复现；帧序列 + `<Img>` 可字节级一致。

## 3. 确定性渲染

```bash
# 1) 渲染 PNG 序列
npx remotion render <Comp> out/frames --sequence --concurrency=6 --image-format=png
# 2) 单线程编码
ffmpeg -y -framerate 30 -i out/frames/element-%04d.png -i mix.wav \
  -map 0:v -map 1:a -c:v libx264 -threads 1 -crf 18 -preset medium \
  -pix_fmt yuv420p -c:a aac -b:a 256k -ar 48000 -shortest \
  -movflags +faststart out/film.mp4
```

连续两次编码 md5 必须一致；若不一致，检查是否用了并行编码/默认 mp4 直出。

## 4. 常见坑

- 时长不是整拍：先用 beatgrid 对齐帧。
- 字体未注册：`loadFont` 在 Root 调用一次。
- 音频文件路径大小写：`staticFile` 严格匹配。
- 帧序列太多：只给需要的片段抽帧，控制 10–30MB。
