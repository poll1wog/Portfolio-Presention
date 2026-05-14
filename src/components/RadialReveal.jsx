import { useRef, useEffect } from 'react';
import { themes } from '../theme';

export default function RadialReveal({ targetMode, origin, onSwap, onDone }) {
  const ref = useRef(null);
  const rt = themes[targetMode];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mx = Math.max(origin.x, window.innerWidth - origin.x);
    const my = Math.max(origin.y, window.innerHeight - origin.y);
    const mr = Math.sqrt(mx * mx + my * my) + 50;

    el.style.clipPath = `circle(0px at ${origin.x}px ${origin.y}px)`;
    el.style.opacity = '1';
    void el.offsetWidth;
    el.style.transition = 'clip-path 0.6s cubic-bezier(0.4,0,0.2,1)';
    el.style.clipPath = `circle(${mr}px at ${origin.x}px ${origin.y}px)`;

    const t1 = setTimeout(() => {
      onSwap();
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.35s ease-out';
        el.style.opacity = '0';
      });
    }, 610);
    const t2 = setTimeout(onDone, 970);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [origin, onSwap, onDone]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: rt.bg,
        zIndex: 50,
        opacity: 0,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(${rt.dotGrid} 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />
    </div>
  );
}
