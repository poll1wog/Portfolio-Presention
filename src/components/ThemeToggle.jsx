import { useRef } from 'react';
import { useT } from '../theme';

function SunIcon({ s = 15, c }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ s = 15, c }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle({ mode, onToggle }) {
  const t = useT();
  const ref = useRef(null);
  const isDark = mode === 'dark';

  const handleClick = () => {
    if (!ref.current) { onToggle(); return; }
    const r = ref.current.getBoundingClientRect();
    onToggle(r.left + r.width / 2, r.top + r.height / 2);
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        position: 'relative',
        width: 27,
        height: 27,
        borderRadius: '50%',
        border: 'none',
        background: t.surfaceInner,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s',
        transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
        opacity: isDark ? 1 : 0,
      }}>
        <MoonIcon c={t.accent} />
      </div>
      <div style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s',
        transform: isDark ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
        opacity: isDark ? 0 : 1,
      }}>
        <SunIcon c={t.accent} />
      </div>
    </button>
  );
}
