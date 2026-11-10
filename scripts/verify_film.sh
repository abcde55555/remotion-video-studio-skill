#!/usr/bin/env bash
# 基础校验：帧数/时长/响度/黑帧
# usage: verify_film.sh film.mp4 [expected_frames] [expected_seconds]
set -euo pipefail
F=$1; FN=${2:-}; DUR=${3:-}
echo "== file: $F"; ls -lh "$F"
echo "== streams"; ffprobe -v error -show_entries format=duration,size \
  -show_entries stream=width,height,nb_frames,codec_name -of default=noprint_wrappers=1 "$F"
echo "== loudness"; ffmpeg -i "$F" -af ebur128=peak=true -vn -f null - 2>&1 \
  | grep -A3 -E "Integrated loudness|True peak" | head -7
echo "== black frames"; ffmpeg -i "$F" -vf blackdetect=d=0.2:pix_th=0.02 -an -f null - 2>&1 \
  | grep black_start || echo "no black segments"
if [ -n "$FN" ]; then
  ACT=$(ffprobe -v error -select_streams v:0 -count_frames \
    -show_entries stream=nb_read_frames -of csv=p=0 "$F")
  echo "== frames: $ACT (expected $FN)"
fi
if [ -n "$DUR" ]; then
  ACTD=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$F")
  echo "== duration: $ACTD (expected $DUR)"
fi
