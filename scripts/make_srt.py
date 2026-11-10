#!/usr/bin/env python3
"""从 TSV（start_frame\tend_frame\ttext）生成 SRT。
usage: python3 make_srt.py cues.tsv out.srt [fps]
"""
import sys

def ts(frame, fps):
    ms = round(frame / fps * 1000)
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

def main():
    src, out = sys.argv[1], sys.argv[2]
    fps = float(sys.argv[3]) if len(sys.argv) > 3 else 30.0
    rows = []
    with open(src, encoding="utf-8") as f:
        for line in f:
            parts = line.rstrip("\n").split("\t")
            if len(parts) < 3:
                continue
            rows.append((int(parts[0]), int(parts[1]), parts[2]))
    with open(out, "w", encoding="utf-8") as f:
        for i, (a, b, text) in enumerate(rows, 1):
            f.write(f"{i}\n{ts(a,fps)} --> {ts(b,fps)}\n{text}\n\n")
    print(f"{len(rows)} cues -> {out}")

if __name__ == "__main__":
    main()
