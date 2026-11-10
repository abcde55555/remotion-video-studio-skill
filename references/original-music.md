# 原创音乐

## 原则

- **每支片一首新原创**：不复用上一首、不套同一模板。
- BPM 按内容选：教程 100–110、发布 120–128、回顾/情绪 90–100；30fps 下 1 拍=1800/BPM 帧。
- 调性、配器、律动都要换：钢琴/pluck/bell/弦乐/电子鼓/木质打击，按品牌气质选。
- 全部程序化合成（Python + numpy/scipy），无采样、无第三方音频。
- 给作曲的需求写清：情绪、主奏、参考气质、impact/riser 时间点。

## 结构模板（90s / 45 小节 @120BPM）

| 段落 | 时间 | 设计 |
|---|---|---|
| 开场 | 0–8s | 动机 + drone，6–8s riser |
| 命题 | 8–18s | 进入，18s impact |
| 主体 1 | 18–32s | 主节奏，32s impact |
| 主体 2 | 32–46s | 换和弦/配器，46s impact |
| 高潮/安全 | 46–58s | drop 或 half-time，58s impact |
| 主体 3 | 58–72s | 最亮/最满，72s impact |
| 收 | 72–84s | 收一点 |
| 尾 | 84–90s | 88s 最后一记，2s 尾音 |

## 质量

- −14 LUFS；true peak ≤ −1 dBFS；无削波。
- kick 起振 vs 网格 ≤1ms；卡点自检 20+ 项 PASS。
- 输出 wav 48k/16bit/stereo + beatgrid.json + compose.py + README。
