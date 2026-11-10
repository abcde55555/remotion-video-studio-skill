import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

/** 中文字幕条：底部 66px，深/浅场自适应，单行居中。 */
export const Subtitles: React.FC<{
  cues: {from: number; to: number; text: string}[];
  dark: boolean;
  height?: number;
}> = ({cues, dark, height = 66}) => {
  const f = useCurrentFrame();
  const cue = cues.find((c) => f >= c.from && f < c.to);
  const opacity = cue
    ? interpolate(f, [cue.from, cue.from + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height,
        backgroundColor: dark ? 'rgba(15,15,14,0.93)' : 'rgba(250,249,245,0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <span style={{fontFamily: '"Noto Sans SC", "PingFang SC", sans-serif', fontSize: 21, color: dark ? '#FAF9F5' : '#141413'}}>
        {cue?.text}
      </span>
    </div>
  );
};
