import { useState, useEffect, useRef } from 'react';
import { useT, font, mono } from '../theme';
import ThemeToggle from './ThemeToggle';
import NavDots from './NavDots';
import ArrBtn from './ArrBtn';
import Pop from './primitives/Pop';
import HoverLift from './primitives/HoverLift';

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoBadge() {
  const t = useT();
  return (
    <div style={{
      width: 27, height: 27, borderRadius: '50%',
      background: t.surfaceInner,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: '-0.02em' }}>
        PD
      </span>
    </div>
  );
}

// ─── Photo slot ───────────────────────────────────────────────────────────────
function PhotoSlot({ src, round }) {
  const t = useT();
  return (
    <div style={{
      width: round ? 100 : '100%',
      height: round ? 100 : 170,
      borderRadius: round ? '50%' : 12,
      background: t.surfaceInner,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {src && (
        <img
          src={src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </div>
  );
}

// ─── Outcome chip ─────────────────────────────────────────────────────────────
function OutcomeChip({ metric, label, vis, delay }) {
  const t = useT();
  return (
    <Pop vis={vis} delay={delay}>
      <div style={{
        background: t.surfaceInner,
        borderRadius: 12,
        padding: '15px 18px',
        display: 'flex', flexDirection: 'column', gap: 3,
        width: '100%',
      }}>
        <span style={{ fontFamily: font, fontSize: 19, fontWeight: 700, color: t.accent, letterSpacing: '-0.02em' }}>
          {metric}
        </span>
        <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: t.textSecondary }}>
          {label}
        </span>
      </div>
    </Pop>
  );
}

// ─── Tag chip ─────────────────────────────────────────────────────────────────
function TagItem({ text }) {
  const t = useT();
  return (
    <div style={{
      background: t.surfaceInner,
      borderRadius: 12,
      padding: '14px 18px',
      width: '100%',
      flexShrink: 0,
    }}>
      <span style={{ fontFamily: font, fontSize: 15, fontWeight: 500, color: t.textSecondary, lineHeight: 1.2 }}>
        {text}
      </span>
    </div>
  );
}

// ─── Bio card content ─────────────────────────────────────────────────────────
// animBase only handles entrance stagger — the wrapper div handles the fade.
function BioCardContent({ slide, vis }) {
  const t = useT();
  const sb = slide.sidebar;
  const enter = (delay) => ({
    animation: vis ? `stIn 0.45s cubic-bezier(0.22,1,0.36,1) ${delay}ms both` : 'none',
  });

  if (sb.type === 'intro') {
    return (
      <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: t.textSecondary, lineHeight: 1.6, ...enter(0) }}>
        {sb.body}
      </div>
    );
  }

  if (sb.type === 'project') {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={enter(60)}>
            <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, lineHeight: 1.1 }}>
              {sb.title}
            </div>
            <div style={{ fontFamily: mono, fontSize: 11, color: t.textMuted, marginTop: 5, letterSpacing: '0.04em' }}>
              {sb.role}
            </div>
          </div>
          <div style={{ height: 1, background: t.border, ...enter(80) }} />
          <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: t.textSecondary, lineHeight: 1.6, ...enter(100) }}>
            {sb.body}
          </div>
        </div>
      </>
    );
  }

  // simple / end
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...enter(0) }}>
      {sb.label && (
        <span style={{ fontFamily: mono, fontSize: 11, color: t.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {sb.label}
        </span>
      )}
      <div style={{ fontFamily: font, fontSize: sb.type === 'end' ? 24 : 20, fontWeight: 700, color: t.text, lineHeight: 1.1 }}>
        {sb.title}
      </div>
      {sb.body && (
        <>
          <div style={{ height: 1, background: t.border }} />
          <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: t.textSecondary, lineHeight: 1.65, ...enter(60) }}>
            {sb.body}
          </div>
        </>
      )}
    </div>
  );
}

// ─── List card content ────────────────────────────────────────────────────────
function ListCardContent({ slide, vis }) {
  const t = useT();
  const sb = slide.sidebar;
  if (!sb.cardLabel) return null;

  return (
    <>
      <div style={{
        padding: '8px 14px 4px',
        animation: vis ? 'stIn 0.45s cubic-bezier(0.22,1,0.36,1) 100ms both' : 'none',
      }}>
        <span style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: t.accent }}>
          {sb.cardLabel}
        </span>
      </div>

      {sb.cardStyle === 'outcome'
        ? sb.cards.map((card, i) => (
            <OutcomeChip key={i} metric={card.metric} label={card.label} vis={vis} delay={140 + i * 60} />
          ))
        : sb.cards.map((card, i) => (
            <Pop key={i} vis={vis} delay={140 + i * 40}>
              <HoverLift>
                <TagItem text={card} />
              </HoverLift>
            </Pop>
          ))
      }
    </>
  );
}

// ─── Main Sidebar ──────────────────────────────────────────────────────────────
export default function Sidebar({ slides, cur, total, mode, width = 420, onNav, onPrev, onNext, onToggle }) {
  const t = useT();

  // displayCur lags behind cur — content only swaps when invisible
  const [displayCur, setDisplayCur] = useState(cur);
  const [vis, setVis] = useState(true);
  const bioCardRef = useRef(null);
  const prevCur = useRef(cur);

  useEffect(() => {
    if (prevCur.current === cur) return;
    prevCur.current = cur;

    const el = bioCardRef.current;

    // ── Phase 1: lock current height, fade content out ──────────────────────
    if (el) {
      const oldH = el.scrollHeight;
      el.style.transition = 'none';
      el.style.height = `${oldH}px`;
      el.offsetHeight; // force reflow so transition:none takes effect
    }
    setVis(false);

    // ── Phase 2: swap content + animate bio card to new height ──────────────
    const swapTimer = setTimeout(() => {
      setDisplayCur(cur);

      // Two rAFs: first lets React render the new content, second lets layout settle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!el) return;
          const oldH = parseFloat(el.style.height);
          el.style.height = 'auto';
          const newH = el.scrollHeight;

          if (newH !== oldH) {
            el.style.height = `${oldH}px`;
            el.offsetHeight; // force reflow
            el.style.transition = 'height 0.32s cubic-bezier(0.22,1,0.36,1)';
            el.style.height = `${newH}px`;
          }
        });
      });
    }, 180);

    // ── Phase 3: fade content back in ───────────────────────────────────────
    const inTimer = setTimeout(() => {
      setVis(true);
    }, 180 + 280); // after swap + most of height transition

    // ── Cleanup: reset explicit height so card can breathe naturally ─────────
    const cleanTimer = setTimeout(() => {
      if (el) {
        el.style.transition = 'none';
        el.style.height = 'auto';
      }
    }, 180 + 280 + 500);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(inTimer);
      clearTimeout(cleanTimer);
    };
  }, [cur]);

  const labels = slides.map((s) => s.label);
  const isOverview = slides[displayCur]?.content === 'overview';

  const card = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 17,
    overflow: 'hidden',
  };

  // Content wrapper: fades in/out without touching the card chrome
  const contentWrap = {
    opacity: vis ? 1 : 0,
    transition: 'opacity 0.18s ease',
  };

  return (
    <div style={{
      width,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      position: 'relative',
      zIndex: 10,
    }}>

      {/* ── Top bar ── */}
      <div style={{
        ...card,
        height: 33,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 3px',
        flexShrink: 0,
      }}>
        <LogoBadge />
        <ThemeToggle mode={mode} onToggle={onToggle} />
      </div>

      {/* ── Bio card + List card — hidden on overview slide ── */}
      {isOverview ? (
        <div style={{ flex: 1 }} />
      ) : (
        <>
          <div
            ref={bioCardRef}
            style={{ ...card, padding: 22, flexShrink: 0 }}
          >
            <div style={{
              ...contentWrap,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
            }}>
              <BioCardContent slide={slides[displayCur]} vis={vis} />
            </div>
          </div>

          <div style={{
            ...card,
            padding: 10,
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}>
            <div style={{
              ...contentWrap,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}>
              <ListCardContent slide={slides[displayCur]} vis={vis} />
            </div>
          </div>
        </>
      )}

      {/* ── Nav bar ── */}
      <div style={{
        ...card,
        overflow: 'visible',
        height: 52,
        position: 'relative',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute',
          left: 5, top: 5, bottom: 5,
          background: t.surfaceInner,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
        }}>
          <NavDots cur={cur} total={total} labels={labels} onNav={onNav} />
        </div>

        <div style={{
          position: 'absolute',
          right: 5, top: 5, bottom: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <ArrBtn dir="l" disabled={cur === 0} onClick={onPrev} />
          <ArrBtn dir="r" disabled={cur === total - 1} onClick={onNext} />
        </div>
      </div>
    </div>
  );
}
