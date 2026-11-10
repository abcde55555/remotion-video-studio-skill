#!/usr/bin/env bash
# 逐句 Edge TTS + loudnorm -16 LUFS
# usage: edge_tts_lines.sh lines.txt outdir [voice] [rate] [pitch]
set -euo pipefail
LINES=$1; OUT=${2:-vo}; VOICE=${3:-zh-CN-XiaoxiaoNeural}; RATE=${4:-+3%}; PITCH=${5:--2Hz}
mkdir -p "$OUT"
i=0
while IFS= read -r line; do
  [ -z "$line" ] && continue
  i=$((i+1))
  edge-tts --voice "$VOICE" --rate="$RATE" --pitch="$PITCH" \
    --text "$line" --write-media "$OUT/l$i.mp3" >/dev/null 2>&1
  ffmpeg -y -v error -i "$OUT/l$i.mp3" \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000" \
    -ac 1 -c:a pcm_s16le "$OUT/l$i.wav"
  printf "L%d %.2fs %s\n" "$i" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/l$i.wav")" "$line"
done < "$LINES"
