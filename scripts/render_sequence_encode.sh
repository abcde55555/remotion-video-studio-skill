#!/usr/bin/env bash
# PNG 序列 + 单线程 x264 编码（可复现）
# usage: render_sequence_encode.sh frames_dir audio.wav out.mp4 [pattern] [fps] [crf]
set -euo pipefail
FRAMES=$1; AUDIO=$2; OUT=$3
PATTERN=${4:-element-%04d.png}; FPS=${5:-30}; CRF=${6:-18}
ffmpeg -y -v error -framerate "$FPS" -i "$FRAMES/$PATTERN" -i "$AUDIO" \
  -map 0:v -map 1:a -c:v libx264 -threads 1 -crf "$CRF" -preset medium \
  -pix_fmt yuv420p -c:a aac -b:a 256k -ar 48000 -shortest \
  -movflags +faststart "$OUT"
md5 -q "$OUT"
