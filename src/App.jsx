import { useState, useEffect, useCallback } from 'react';
import { ThemeCtx, themes, font, mono } from './theme';
import { KF } from './keyframes';
import { slides } from './data/slides';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import RadialReveal from './components/RadialReveal';

export default function App() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [mode, setMode] = useState('dark');
  const [reveal, setReveal] = useState(null);
  const [winW, setWinW] = useState(window.innerWidth);

  useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const total = slides.length;
  const t = themes[mode];
  const isOverview = slides[cur]?.content === 'overview';
  const isMobile = winW < 768;
  const sidebarW = winW < 1200 ? 300 : 420;

  const go = useCallback((d) => {
    setCur((c) => {
      const n = c + d;
      if (n < 0 || n >= total) return c;
      setDir(d);
      return n;
    });
  }, [total]);

  const jump = useCallback((i) => {
    setCur((c) => {
      if (i === c) return c;
      setDir(i > c ? 1 : -1);
      return i;
    });
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        if (cur === total - 1) jump(0);
        else go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [go, jump, cur, total]);

  const handleToggle = useCallback((cx, cy) => {
    const tm = mode === 'dark' ? 'light' : 'dark';
    if (cx !== undefined && cy !== undefined) {
      setReveal({ tm, o: { x: cx, y: cy } });
    } else {
      setMode(tm);
    }
  }, [mode]);

  const handleSwap = useCallback(() => { if (reveal) setMode(reveal.tm); }, [reveal]);
  const handleClean = useCallback(() => setReveal(null), []);

  const navProps = {
    cur,
    total,
    mode,
    labels: slides.map(s => s.label),
    onNav: jump,
    onPrev: () => go(-1),
    onNext: () => go(1),
    onToggle: handleToggle,
  };

  return (
    <ThemeCtx.Provider value={t}>
      <style>{KF}</style>
      <div style={{
        width: '100vw',
        height: '100vh',
        background: t.bg,
        display: 'flex',
        gap: 0,
        padding: 10,
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}>
        {/* Dot grid background */}
        <div style={{
          position: 'absolute',
          inset: '-32px',
          backgroundImage: `radial-gradient(${t.dotGrid} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.25,
          pointerEvents: 'none',
        }} />

        {/* Sidebar — collapses to 0 on overview slide */}
        <div style={{
          width: isOverview ? 0 : sidebarW + 10,
          flexShrink: 0,
          overflow: 'hidden',
          display: 'flex',
          opacity: isOverview ? 0 : 1,
          pointerEvents: isOverview ? 'none' : 'auto',
          transition: 'width 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
        }}>
          <Sidebar
            slides={slides}
            cur={cur}
            total={total}
            mode={mode}
            width={sidebarW}
            onNav={jump}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            onToggle={handleToggle}
          />
        </div>

        <ContentArea slides={slides} cur={cur} dir={dir} onRestart={() => jump(0)} onJump={jump} navProps={navProps} sidebarW={sidebarW} />

        {/* Mobile overlay */}
        {isMobile && (
          <div style={{
            position: 'absolute', inset: 0,
            background: t.bg,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 16, zIndex: 999, padding: 32, textAlign: 'center',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: t.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: t.accent }}>PD</span>
            </div>
            <p style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: t.text, lineHeight: 1.4, maxWidth: 280 }}>
              This experience is best viewed on a larger screen.
            </p>
            <p style={{ fontFamily: font, fontSize: 13, color: t.textSecondary }}>
              Please open this on a desktop or laptop.
            </p>
          </div>
        )}

        {reveal && (
          <RadialReveal
            targetMode={reveal.tm}
            origin={reveal.o}
            onSwap={handleSwap}
            onDone={handleClean}
          />
        )}
      </div>
    </ThemeCtx.Provider>
  );
}
