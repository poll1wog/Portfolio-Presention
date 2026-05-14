import { useState, useEffect, useRef } from 'react';
import { useT, font, mono } from '../theme';
import Lightbox from './Lightbox';

// Renders one media item — crossfade only (no translateX) for sub-image transitions
function MediaItem({ src, type, caption, active, vis, onOpen }) {
  const t = useT();
  const videoRef = useRef(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return;
    if (active && vis) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [active, vis, type]);

  const showPlaceholder = !src || errored;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: active ? 1 : 0,
      transition: 'opacity 0.35s ease',
      pointerEvents: active ? 'auto' : 'none',
      zIndex: 1,
    }}>
      {showPlaceholder ? (
        <div style={{
          width: '100%', height: '100%',
          background: t.surfaceInner,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span style={{ color: t.textMuted, fontSize: 13, fontFamily: mono, textAlign: 'center', maxWidth: 280, lineHeight: 1.5, padding: '0 16px' }}>
            {caption || 'Screenshot'}
          </span>
        </div>
      ) : type === 'video' ? (
        <video
          ref={videoRef}
          src={src}
          loop muted playsInline
          onError={() => setErrored(true)}
          style={{
            position: 'absolute', inset: '3%', width: '94%', height: '94%',
            objectFit: 'contain', display: 'block',
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))',
          }}
        />
      ) : (
        <img
          src={src}
          alt={caption || ''}
          loading="lazy"
          onError={() => setErrored(true)}
          onClick={active ? onOpen : undefined}
          style={{
            position: 'absolute', inset: '3%', width: '94%', height: '94%',
            objectFit: 'contain', display: 'block',
            cursor: active ? 'zoom-in' : 'default',
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))',
          }}
        />
      )}
    </div>
  );
}

export default function ImageCarousel({ images: rawItems = [], vis, onExitRight }) {
  const t = useT();
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // Normalize: items with images[] get a `subs` array; single-image items wrap into one-element subs
  const items = rawItems.map(item =>
    item.images
      ? { ...item, subs: item.images }
      : { ...item, subs: [{ src: item.src, type: item.type, caption: item.caption }] }
  );

  const currentItem = items[idx] || { subs: [] };
  const currentSubs = currentItem.subs;

  const navigate = (d) => {
    const nextSub = subIdx + d;
    if (nextSub >= 0 && nextSub < currentSubs.length) {
      setSubIdx(nextSub);
      return true;
    }
    const nextIdx = idx + d;
    if (nextIdx >= 0 && nextIdx < items.length) {
      setDir(d);
      setIdx(nextIdx);
      setSubIdx(d === 1 ? 0 : items[nextIdx].subs.length - 1);
      return true;
    }
    return false;
  };

  // Capture arrow keys — consume sub-image steps first, topic steps second,
  // pass through at absolute boundary so App.jsx can navigate to prev/next slide
  useEffect(() => {
    if (!vis) return;
    const handler = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const d = e.key === 'ArrowRight' ? 1 : -1;
      const nextSub = subIdx + d;
      const canSub = nextSub >= 0 && nextSub < currentSubs.length;
      const canTopic = (idx + d) >= 0 && (idx + d) < items.length;
      if (canSub || canTopic) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (canSub) {
          setSubIdx(nextSub);
        } else {
          const nextIdx = idx + d;
          setDir(d);
          setIdx(nextIdx);
          setSubIdx(d === 1 ? 0 : items[nextIdx].subs.length - 1);
        }
      } else if (d === 1 && onExitRight) {
        // At absolute right boundary — hand off to caller (e.g. back to overview)
        e.preventDefault();
        e.stopImmediatePropagation();
        onExitRight();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [vis, idx, subIdx, items.length, currentSubs.length]);

  const topicXOff = dir > 0 ? 50 : -50;
  const atStart = idx === 0 && subIdx === 0;
  const atEnd = idx === items.length - 1 && subIdx === currentSubs.length - 1;
  const hasNav = !(atStart && atEnd);
  const currentSubCaption = currentSubs[subIdx]?.caption || currentItem.caption || '';

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 14 }}>
      {/* Image area */}
      <div style={{
        flex: 1, position: 'relative', borderRadius: 10, overflow: 'hidden', minHeight: 0,
        boxShadow: `inset 0 0 0 1px ${t.frameBorder}`,
      }}>
        {/* Persistent grid backdrop */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(to right, ${t.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${t.gridLine} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Topic frames — handle topic-level slide animation */}
        {items.map((item, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? 'translateX(0)' : `translateX(${topicXOff}px)`,
            transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: i === idx ? 'auto' : 'none',
          }}>
            {item.subs.map((sub, j) => (
              <MediaItem
                key={j}
                src={sub.src}
                type={sub.type}
                caption={sub.caption || item.caption}
                active={i === idx && j === subIdx}
                vis={vis}
                onOpen={sub.type === 'video' ? undefined : () => setLightboxSrc(sub.src)}
              />
            ))}
          </div>
        ))}

        {/* Prev/next arrows */}
        {hasNav && (
          <>
            <button
              onClick={() => navigate(-1)}
              disabled={atStart}
              style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(0,0,0,0.5)', border: 'none',
                color: '#fff', cursor: atStart ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, opacity: atStart ? 0.2 : 0.75,
                transition: 'opacity 0.2s',
                zIndex: 5,
              }}
            >←</button>
            <button
              onClick={() => navigate(1)}
              disabled={atEnd}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(0,0,0,0.5)', border: 'none',
                color: '#fff', cursor: atEnd ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, opacity: atEnd ? 0.2 : 0.75,
                transition: 'opacity 0.2s',
                zIndex: 5,
              }}
            >→</button>
          </>
        )}
      </div>

      {/* Caption + dots */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexShrink: 0 }}>
        {/* Text: pinned title (if multi-sub topic) + per-image caption */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {currentItem.title && (
            <p style={{
              fontFamily: font, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: t.accent, lineHeight: 1.4, marginBottom: 3,
            }}>
              {currentItem.title}
            </p>
          )}
          <p style={{ fontFamily: font, fontSize: 13, color: t.textSecondary, lineHeight: 1.5 }}>
            {currentSubCaption}
          </p>
        </div>

        {/* Dots column: sub-image dots on top, topic dots below */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
          {currentSubs.length > 1 && (
            <div style={{ display: 'flex', gap: 4 }}>
              {currentSubs.map((_, j) => (
                <button
                  key={j}
                  onClick={() => setSubIdx(j)}
                  style={{
                    width: j === subIdx ? 12 : 5, height: 5, borderRadius: 2.5,
                    background: j === subIdx ? t.accent : t.textMuted,
                    border: 'none', cursor: 'pointer', padding: 0,
                    opacity: 0.7,
                    transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1), background 0.2s',
                  }}
                />
              ))}
            </div>
          )}
          {items.length > 1 && (
            <div style={{ display: 'flex', gap: 5 }}>
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); setSubIdx(0); }}
                  style={{
                    width: i === idx ? 16 : 6, height: 6, borderRadius: 3,
                    background: i === idx ? t.accent : t.textMuted,
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1), background 0.2s',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </>
  );
}
