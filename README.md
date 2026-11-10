# Remotion Video Studio · Skill

一套可复用的 AI 视频生产方法：研究 → 文案 → 分镜 → Edge TTS 配音 → 字幕 → 原创程序化音乐 → Remotion 渲染 → 独立 QA → 交付。

## 内容

```
SKILL.md                      # 技能入口（agent 读取）
references/                   # 方法论文档
scripts/                      # 可复用脚本（TTS/混音/编码/SRT/校验）
templates/                    # Remotion 场景/字幕模板与文档模板
```

## 依赖

- Node 18+ / pnpm / Remotion 4.x
- Python 3.10+（numpy/scipy、edge-tts）
- ffmpeg / ffprobe
- 中文字体：Inter、Noto Sans SC、JetBrains Mono、Newsreader（OFL）

## 快速开始

```bash
# 1) 配音
bash scripts/edge_tts_lines.sh lines.txt out_vo/
# 2) 混音（音乐 + 逐句配音）
bash scripts/mix_voice_music.sh music.wav out_vo/ 0.55 mix.wav
# 3) Remotion：把素材预抽成帧序列，渲染 PNG 序列
npx remotion render <Composition> out/frames --sequence --concurrency=6 --image-format=png
# 4) 单线程编码（可复现）
bash scripts/render_sequence_encode.sh out/frames mix.wav out/film.mp4
# 5) 校验
bash scripts/verify_film.sh out/film.mp4 2700 90
```

## 方法论重点

- 体裁先决策（概念片 / 解说片 / 双版本），不要默认 90 秒。
- 文案：先给结论、具体场景、第二人称、短句、主动讲边界、结尾给行动。
- 开场时间口径按发布距今天数（今天/昨天/本周/最近/已上线/回顾），屏上不写「就在刚刚」。
- 信息密度：信息型视频每屏 6–10 个点，TL;DR + 章节数据条 + 片尾总结表。
- 音乐每支新写，BPM/调性/配器都换。
- 渲染确定性：帧序列 + 单线程编码，连续两次 md5 一致。

## 许可

MIT（方法/模板/脚本可自由复用；请自行确保素材与音乐版权）。
