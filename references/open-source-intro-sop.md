# 开源项目介绍视频 · SOP（2026-11 定版）

> 默认采用「真实页面走查」版：把项目真页面截下来 → 镜头推拉/滚动 → 该点的才点。**不再用 PPT 卡片、不要做地球/抽象背景。**
> 参考成品：`out/craft-anything-walkthrough-vertical-cn.mp4`；工程：`remotion/src/scenes/craftanything/CraftAnythingWalk.tsx`。

---

## 0. 成品标准（先对齐再开工）

- **时长**：主版 90s 竖屏 9:16（1080×1920）；需要横屏另出 16:9 版本。
- **主体**：真实 GitHub 仓库/官网/产品界面截图，占画面 ≥80%；标注只做辅助。
- **镜头**：每 2–5 秒一次推近/平移/滚动；全程有运动，不定格念稿。
- **信息**：四问结构 + 至少 1 个实测数字 + 1 个翻车/边界 + 版本/成本 + 适合/不适合。
- **证据**：片尾给仓库链接 + 「非官方实测」声明；原始 capture/分数可公开。

---

## 1. 选项目 & 事实核查（30–60min）

1. 项目是否值得做：GitHub 星数/增速、是否有可演示的界面或 CLI、是否有争议点。
2. 用 `gh` 拉硬事实：`gh api repos/<owner>/<repo>`（stars/forks/license/created）、`releases/latest`（版本/日期）。
3. 列出「可验证事实表」：版本号、依赖、工具数、平台、测试数、官方示例分数；**每个数字标来源与日期**。
4. 定 4 个观众最关心的问题（本项目示例：和 REA 差在哪 / 真能几分钟 / 安不安全 / 值不值得装）。

## 2. 采集真实页面（20–40min）

用 Playwright 截全页（最稳）：

```bash
mkdir -p /tmp/ghshots
npx playwright screenshot --viewport-size=1440,900 --full-page --wait-for-timeout=3000 \
  https://github.com/<owner>/<repo> /tmp/ghshots/repo.png
npx playwright screenshot --viewport-size=1440,900 --full-page --wait-for-timeout=3000 \
  https://github.com/<owner>/<repo>/releases /tmp/ghshots/releases.png
npx playwright screenshot --viewport-size=1440,900 --full-page --wait-for-timeout=3000 \
  https://github.com/<owner>/<repo>/blob/main/docs/tools.md /tmp/ghshots/tools.png
```

采集清单：
- [ ] 仓库首页（含 Star/Fork/About/文件树）
- [ ] README 全篇（长图，供滚动）
- [ ] Releases（版本、日期、下载量）
- [ ] docs/关键文档（工具/架构/限制）
- [ ] 官网/产品截图或演示视频帧
- [ ] 自测/第三方实测截图（复刻页、对比页、分数 JSON）

命名：`assets/<project>/gh/repo.png`、`releases.png`、`tools.png`、`repo-top.png`。

## 3. 写脚本（30–45min）

- 结构：钩子（热度/争议）→ 四问 → 原理（净室/流程）→ 实测（数字）→ 翻车/边界 → 引擎/规模 → 成本与坑 → 适合/不适合 → 证据+链接。
- 14 句左右，230–280 字/分；每句 ≤22 字，具体数字必须有出处。
- 禁词：最强/全面领先/一键/完美；用「实测/官方示例/我这次」区分口径。

## 4. 分镜与镜头表（30–60min）

| 段 | 时间 | 页面/素材 | 镜头动作 | 标注 |
|---|---|---|---|---|
| 钩子 | 0–10s | repo 首屏 | 从全页推近 Star 数（1→1.5），光标移到 Star、点击波纹 | 星数/天数 |
| 四问 | 10–20s | README 顶部 | 向下滚 800–1500px | 四问小标注 |
| 原理 | 20–36s | README 中段 | 滚到 How it works/Clean room/Get started；终端打字 | 流程三步 |
| 实测 | 36–50s | 自测证据页 | 切页面、轻微推近 | 分数/口径 |
| 翻车 | 50–60s | 原站 vs 复刻 | 原站推近 → 复刻擦除/滚动盖上 | 60%→28% |
| 引擎 | 60–70s | docs/tools.md | 快速滚过清单 | 300+/17/13 |
| 坑 | 70–80s | Releases | 推近版本号；切 README Status | npm/成本/版本 |
| 结论 | 80–86s | README | 压暗 0.25，两行结论 | 适合/不适合 |
| 证据 | 86–90s | repo 首页 | 轻推 | 链接+非官方实测 |

镜头实现（Remotion）：浏览器窗口 `overflow:hidden` + 图片 `translate(x,y) scale(z)`；滚动=translateY，推近=scale（origin 对准焦点）；关键帧用 smoothstep 插值，避免跳变。
**铁律**：截图必须铺满窗口（按宽度或高度 cover，留白只允许深色底）；点击位置按 zoom/fx 反算到目标元素；标注不压页面主体。

## 5. 配音 + 字幕（20–30min）

- Edge TTS：`zh-CN-XiaoxiaoNeural --rate=+3% --pitch=-2Hz`，逐句 `loudnorm=I=-16:TP=-1.5`。
- 字幕与旁白同起同收；每句起点在画面切换后 0.2–0.6s；不跨切；底部独立字幕条，不遮挡主图。
- 导出 SRT（14 条左右）。

## 6. 配乐（并行，60–90min）

- 原创程序化音乐（numpy），120 BPM，90.000s=45 小节；数据/评测感：干鼓+click+低音脉冲。
- 卡点：段落切换在 10/20/36/50/60/70/80/86s；一段一 impact。
- 混音：音乐 0.55 + VO −16 LUFS，总线 −15±1 LUFS、TP ≤−1。

## 7. 渲染 & QA（30–60min）

```bash
npx remotion render CraftAnythingWalk /tmp/seq --sequence --concurrency=8 --image-format=png
ffmpeg -framerate 30 -i /tmp/seq/element-%04d.png -i mix.wav \
  -c:v libx264 -threads 1 -crf 18 -preset medium -pix_fmt yuv420p \
  -c:a aac -b:a 256k -movflags +faststart out.mp4
```

QA 清单：
- [ ] 2700 帧 / 90.000s / 无黑帧
- [ ] −15±1 LUFS、TP ≤−1；14 句非静音、起点偏差 ≤±5 帧、不跨切
- [ ] 字幕与 SRT 逐字逐帧一致、不压主图
- [ ] 镜头连续无跳变；点击对准目标；截图铺满窗口无白块
- [ ] 事实逐条对照；无「最强」；复刻图中性占位；片尾有「非官方实测」
- [ ] PNG 序列两次编码 md5 一致

## 8. 交付（10min）

- 1080p 母版（crf18）+ 720p 分享版（飞书视频上限约 30MB，用 720p；大文件走文件消息/网盘）。
- 交付物：成片、预览拼图、SOP/分镜、字幕 SRT、事实来源、QA 报告、原始证据目录。
- IM 只发：成片 + 一句结论 + 链接；技术细节留文档。

---

## 本次踩坑与对应做法

| 坑 | 做法 |
|---|---|
| GitHub 页面太长，随手截图只有首屏 | Playwright `--full-page`；Remotion 里滚动 |
| 截图高度 < 浏览器窗口出现白块 | 窗口高度匹配截图或 cover 缩放（不能留白） |
| 光标点不到 Star | 按 `scale/fx` 反算目标屏幕坐标；抽帧核对 |
| 页面文字太密，标注压住内容 | 标注放边角、压暗 0.2–0.3、必要处只保留一行 |
| 飞书视频 >30MB 发不出 | 出 720p 分享版（13MB 左右） |
| 终端窗口单帧弹出 | 淡入 6–12 帧；挂载即渲染、只用 opacity 控制 |

> 默认模板：竖屏走查版；横屏仅在平台需要时另出。新项目沿用本 SOP，不再从 PPT 卡片重新设计。
