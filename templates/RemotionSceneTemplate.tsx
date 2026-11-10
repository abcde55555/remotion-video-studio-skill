import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {springConfigs} from '../theme/tokens';

/** 通用讲解片模板：8 段 / 90s / 120BPM。
 *  替换 palette、文案、素材目录即可复用。 */

export const FILM_DURATION = 2700; // 90s @30fps
const FPS = 30;

const C = {
  paper: '#F5F4F0',
  ink: '#141413',
  dark: '#0F0F0E',
  accent: '#D97757',
  muted: '#6B6B66',
  border: '#D1CFC5',
  cream: '#FAF9F5',
};
const SANS = '"Inter", "Noto Sans SC", sans-serif';
const CJK = '"Noto Sans SC", "PingFang SC", sans-serif';
const MONO = '"JetBrains Mono", monospace';

/** 帧序列：dir 下 f001.jpg…，按局部帧线性取帧（确定性） */
const Seq: React.FC<{dir: string; count: number; frame: number; span: number}> = ({dir, count, frame, span}) => {
  const i = Math.max(0, Math.min(count - 1, Math.floor((frame / span) * count)));
  const name = String(i + 1).padStart(3, '0');
  return (
    <Img
      src={staticFile(`assets/${dir}/f${name}.jpg`)}
      style={{width: '100%', height: '100%', objectFit: 'cover'}}
    />
  );
};

const DataStrip: React.FC<{items: string[]; dark?: boolean}> = ({items, dark = false}) => (
  <div
    style={{
      position: 'absolute',
      left: 48,
      right: 48,
      bottom: 84,
      borderTop: `1px solid ${dark ? 'rgba(250,249,245,0.2)' : C.border}`,
      paddingTop: 7,
      fontFamily: MONO,
      fontSize: 9,
      letterSpacing: '0.01em',
      color: dark ? 'rgba(250,249,245,0.7)' : C.muted,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }}
  >
    {items.join(' · ')}
  </div>
);

const Subtitles: React.FC<{cues: {from: number; to: number; text: string}[]; dark: boolean}> = ({cues, dark}) => {
  const f = useCurrentFrame();
  const cue = cues.find((c) => f >= c.from && f < c.to);
  const opacity = cue ? interpolate(f, [cue.from, cue.from + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 66,
        backgroundColor: dark ? 'rgba(15,15,14,0.93)' : 'rgba(250,249,245,0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <span style={{fontFamily: CJK, fontSize: 21, color: dark ? C.cream : C.ink}}>{cue?.text}</span>
    </div>
  );
};

/** 一句话：一段 = 一个信息页。复制此组件改成你的 8 段。 */
const Section: React.FC<{index: string; kicker: string; title: string; data: string[]; dark?: boolean}> = ({
  index,
  kicker,
  title,
  data,
  dark = false,
}) => {
  const f = useCurrentFrame();
  const p = spring({frame: f, fps: FPS, config: springConfigs.softRise, delay: 2});
  return (
    <AbsoluteFill style={{backgroundColor: dark ? C.dark : C.paper}}>
      <div style={{position: 'absolute', left: 48, top: 30, fontFamily: MONO, fontSize: 11, color: dark ? C.cream : C.ink}}>
        FILM NAME · {index}
      </div>
      <div style={{position: 'absolute', left: 48, top: 120, opacity: p}}>
        <div style={{fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: C.muted}}>{kicker}</div>
        <div style={{fontFamily: CJK, fontWeight: 700, fontSize: 52, color: dark ? C.cream : C.ink, marginTop: 8}}>{title}</div>
      </div>
      <DataStrip items={data} dark={dark} />
    </AbsoluteFill>
  );
};

/* ------------------------- 旁白/字幕表（与成片时间轴一致） ------------------------- */
const SUBS = [
  {from: 15, to: 160, text: '第一句字幕，和旁白同起同收。'},
  // …按段补齐
];

const VO = [
  {from: 15, file: 'l1.wav'},
  // …按句补齐
];

export const DemoFilm: React.FC<{cn?: boolean}> = ({cn = true}) => {
  return (
    <AbsoluteFill style={{backgroundColor: C.paper}}>
      <Sequence from={0} durationInFrames={240}>
        <Section index="00 / OPEN" kicker="JUST IN" title="开场标题" data={['产品 A', '2026.11.09', '关键数字 49.1%']} dark />
      </Sequence>
      {/* …其余 7 段 */}

      <Audio src={staticFile('audio/music.wav')} volume={cn ? 0.55 : 1} />
      {cn &&
        VO.map((v) => (
          <Sequence key={v.file} from={v.from} durationInFrames={240}>
            <Audio src={staticFile(`audio/vo/${v.file}`)} />
          </Sequence>
        ))}
      {cn && <Subtitles cues={SUBS} dark />}
    </AbsoluteFill>
  );
};
