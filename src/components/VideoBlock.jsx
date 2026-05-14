import { useRef, useEffect } from 'react';
import { useT } from '../theme';

export default function VideoBlock({ src, caption, vis }) {
  const t = useT();
  const ref = useRef(null);

  // Play from start when slide becomes visible, pause when it leaves
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (vis) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [vis]);

  if (!src) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 14 }}>
      {/* Frame — matches carousel grid treatment */}
      <div style={{
        flex: 1,
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        minHeight: 0,
        boxShadow: `inset 0 0 0 1px ${t.frameBorder}`,
      }}>
        {/* Line grid backdrop */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${t.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${t.gridLine} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        {/* Video — inset + drop shadow to float above grid */}
        <video
          ref={ref}
          src={src}
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: '3%',
            width: '94%',
            height: '94%',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))',
          }}
        />
      </div>

      {/* Caption row — matches carousel */}
      {caption && (
        <div style={{ flexShrink: 0 }}>
          <p style={{
            fontFamily: "'Satoshi','Helvetica Neue',sans-serif",
            fontSize: 13,
            color: t.textSecondary,
            lineHeight: 1.5,
          }}>
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
