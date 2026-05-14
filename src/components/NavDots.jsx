import { useState, useRef, useEffect } from 'react';
import { useT, font, mono } from '../theme';

export default function NavDots({ cur, total, labels, onNav }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(null);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>

      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '3px 0',
          fontFamily: mono,
          fontSize: 11,
          fontWeight: 600,
          color: t.accent,
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Current dot */}
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: t.accent, flexShrink: 0,
          boxShadow: `0 0 6px ${t.accent}`,
        }} />
        {labels[cur]}
        {/* Chevron */}
        <svg
          width="8" height="8" viewBox="0 0 8 8" fill="none"
          style={{
            color: t.textMuted,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        >
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          left: 0,
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 13,
          padding: 5,
          minWidth: 210,
          boxShadow: t.shadow,
          zIndex: 100,
          animation: 'popIn 0.18s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          {labels.map((label, i) => (
            <button
              key={i}
              onClick={() => { onNav(i); setOpen(false); }}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                width: '100%',
                padding: '7px 10px',
                background: i === cur ? t.accentMuted : hov === i ? t.surfaceInner : 'transparent',
                border: 'none',
                borderRadius: 9,
                cursor: 'pointer',
                fontFamily: mono,
                fontSize: 11,
                fontWeight: i === cur ? 600 : 400,
                color: i === cur ? t.accent : hov === i ? t.text : t.textSecondary,
                textAlign: 'left',
                transition: 'background 0.12s ease, color 0.12s ease',
                letterSpacing: '0.02em',
              }}
            >
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: i === cur ? t.accent : t.border,
                flexShrink: 0,
                transition: 'background 0.12s ease',
              }} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
