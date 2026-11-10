#!/usr/bin/env bash
# 音乐 + 逐句配音混音（限峰，输出 -1 附近）
# usage: mix_voice_music.sh music.wav vodir timings.tsv music_volume out.wav
set -euo pipefail
MUSIC=$1; VO=$2; TIMING=$3; VOL=${4:-0.55}; OUT=${5:-mix.wav}
INPUTS=(-i "$MUSIC"); FILTER="[0:a]volume=${VOL}[m]"; MIX="[m]"
i=0
while IFS=$'\t' read -r idx delay; do
  [ -z "${idx:-}" ] && continue
  i=$((i+1))
  INPUTS+=(-i "$VO/l${idx}.wav")
  FILTER+=";[${i}:a]adelay=${delay}|${delay}[a${i}]"
  MIX+="[a${i}]"
done < "$TIMING"
FILTER+=";${MIX}amix=inputs=$((i+1)):duration=first:normalize=0[out]"
ffmpeg -y -v error "${INPUTS[@]}" -filter_complex "$FILTER" \
  -map "[out]" -ar 48000 -ac 2 -c:a pcm_s16le /tmp/_mix_raw.wav
ffmpeg -y -v error -i /tmp/_mix_raw.wav \
  -af "alimiter=limit=0.82:level=false,volume=0.4dB" -c:a pcm_s16le "$OUT"
echo "wrote $OUT"
ffmpeg -i "$OUT" -af ebur128=peak=true -vn -f null - 2>&1 | grep -A3 -E "Integrated loudness|True peak" | head -7
