import { useEffect, useRef, useState, useMemo } from 'react';
import { useT } from '../theme';
import Lightbox from './Lightbox';

const GAP = 8;
const ROW_TARGET = 520;
const ROW_MAX = 620;     // tallest any row is allowed to be
const REPEATS = 5;       // how many full cycles in the strip
const SPEED_PX_S = 40;   // pixels per second — tune this for feel

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRows(items, containerWidth) {
  if (!containerWidth || !items.length) return [];
  const rows = [];
  let i = 0;
  while (i < items.length) {
    let rowItems = [];
    let totalAspect = 0;

    // Fill row until projected width meets container
    while (i < items.length) {
      const aspect = (items[i].w / items[i].h) * (items[i].scale || 1);
      rowItems.push(items[i]);
      totalAspect += aspect;
      i++;
      if ((totalAspect * ROW_TARGET) >= containerWidth - GAP * (rowItems.length - 1)) break;
    }

    // If row is still too tall, keep pulling in more images until height is acceptable
    let rowHeight = (containerWidth - GAP * (rowItems.length - 1)) / totalAspect;
    while (rowHeight > ROW_MAX && i < items.length) {
      const aspect = (items[i].w / items[i].h) * (items[i].scale || 1);
      rowItems.push(items[i]);
      totalAspect += aspect;
      i++;
      rowHeight = (containerWidth - GAP * (rowItems.length - 1)) / totalAspect;
    }

    rows.push(rowItems.map((img) => ({
      src: img.src,
      width: (img.w / img.h) * (img.scale || 1) * rowHeight,
      height: rowHeight,
    })));
  }
  return rows;
}

export default function BentoGrid({ images = [] }) {
  const t = useT();
  const containerRef = useRef(null);
  const stripRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dims, setDims] = useState([]);
  const [animStyle, setAnimStyle] = useState({});
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [hoveredKey, setHoveredKey] = useState(null);

  const shuffled = useMemo(() => shuffle([...images]), [images.length]);

  // Measure container width
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Preload all images to get natural dimensions
  useEffect(() => {
    if (!shuffled.length) return;
    let cancelled = false;
    const results = new Array(shuffled.length);
    let pending = shuffled.length;
    shuffled.forEach((img, idx) => {
      const el = new Image();
      const finish = () => {
        if (cancelled) return;
        // scale: random multiplier that makes each image "want" to be
        // wider or narrower than its natural ratio, creating rows of
        // varying heights for a collage feel
        const scale = 0.7 + Math.random() * 0.65; // 0.70 → 1.35
        results[idx] = {
          src: img.src,
          w: el.naturalWidth || 4,
          h: el.naturalHeight || 3,
          scale,
        };
        if (--pending === 0) setDims(results.filter(Boolean));
      };
      el.onload = finish;
      el.onerror = finish;
      el.src = img.src;
    });
    return () => { cancelled = true; };
  }, [shuffled]);

  // One shuffled pass through all photos as rows
  const oneSetRows = useMemo(() => {
    if (!dims.length || !containerWidth) return [];
    return buildRows(dims, containerWidth);
  }, [dims, containerWidth]);

  // Repeat REPEATS times so the visible area never spans the loop seam
  const strip = useMemo(() => {
    const out = [];
    for (let i = 0; i < REPEATS; i++) out.push(...oneSetRows);
    return out;
  }, [oneSetRows]);

  // After DOM renders the strip, measure one cycle height and start animation
  useEffect(() => {
    if (!stripRef.current || !oneSetRows.length) return;
    const oneSetHeight = stripRef.current.scrollHeight / REPEATS;
    const duration = oneSetHeight / SPEED_PX_S;
    stripRef.current.style.setProperty('--scroll-dist', `${oneSetHeight}px`);
    setAnimStyle({ animation: `scrollUp ${duration}s linear infinite` });
  }, [oneSetRows]);

  return (
    <>
    <div
      ref={containerRef}
      style={{
        height: '100%',
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)',
      }}
    >
      <div
        ref={stripRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: GAP,
          willChange: 'transform',
          animationPlayState: lightboxSrc ? 'paused' : 'running',
          ...animStyle,
        }}
      >
        {strip.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', gap: GAP, flexShrink: 0 }}>
            {row.map((cell, cellIdx) => (
              <div
                key={cellIdx}
                onClick={() => setLightboxSrc(cell.src)}
                onMouseEnter={() => setHoveredKey(`${rowIdx}-${cellIdx}`)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  width: cell.width,
                  height: cell.height,
                  flexShrink: 0,
                  borderRadius: 10,
                  overflow: 'hidden',
                  background: t.surface,
                  cursor: 'zoom-in',
                  position: 'relative',
                }}
              >
                <img
                  src={cell.src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transform: hoveredKey === `${rowIdx}-${cellIdx}` ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.18)',
                  opacity: hoveredKey === `${rowIdx}-${cellIdx}` ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </>
  );
}
