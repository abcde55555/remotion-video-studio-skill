# 配音与字幕

## 1. 默认配音（TTS）

| 项 | 取值 |
|---|---|
| 引擎 | Microsoft Edge TTS（`edge-tts`） |
| 音色 | `zh-CN-XiaoxiaoNeural`（女声，Warm，中文母语） |
| 语速 | `--rate=+3%` |
| 音调 | `--pitch=-2Hz` |
| 响度 | 逐句 `loudnorm=I=-16:TP=-1.5:LRA=11` |
| 备选 | `zh-CN-XiaoyiNeural`（活泼）；`--pitch=-4Hz`（低沉）；`--rate=+6%`（更快） |

```bash
edge-tts --voice zh-CN-XiaoxiaoNeural --rate=+3% --pitch=-2Hz \
  --text "文本" --write-media line.mp3
ffmpeg -y -i line.mp3 -af "loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000" \
  -ac 1 -c:a pcm_s16le line.wav
```

## 2. 与画面切换对齐

- 画面切换点（如 8/18/32/46/58/72/84s）后 **0.2–0.6s** 再开口，让画面先落地。
- 任何一句不跨切：句尾距下一刀 ≥2s。
- 字幕与旁白同起同收，句尾多留 ≤0.2s。
- 每句 ≤22 字（手机单行），关键词可高亮。

## 3. 混音

- 音乐 0.55 铺底；人声 −16 LUFS。
- 总线 `alimiter=limit=0.82:level=false,volume=0.4dB`。
- 成片 −14～−16 LUFS，真峰值 ≤ −1 dBFS。

## 4. 字幕

- 硬字幕：底部 66px 通栏，深场米白/浅场墨色自适应，单行居中。
- 外挂 SRT：与硬字幕逐字一致；用 `scripts/make_srt.py` 从帧时间表生成。
- 校对：字幕起点=配音起点；结束=配音结束+≤6 帧；不重叠、不跨切。
