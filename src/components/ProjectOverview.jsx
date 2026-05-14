import { useState, useEffect } from 'react';
import { useT, font, mono } from '../theme';

export default function ProjectOverview({ projects, vis, onNavigateTo, sidebarW = 420 }) {
  const t = useT();
  const [focusIdx, setFocusIdx] = useState(null);
  const [hovIdx, setHovIdx] = useState(null);

  useEffect(() => {
    if (vis) setFocusIdx(null);
  }, [vis]);

  useEffect(() => {
    if (!vis) return;
    const handler = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const col = focusIdx ?? 0;
        if (col < projects.length - 1) setFocusIdx(col + 1);
        else setFocusIdx(col);
      } else if (e.key === 'ArrowLeft') {
        const col = focusIdx ?? 0;
        if (col > 0) {
          e.preventDefault();
          e.stopImmediatePropagation();
          setFocusIdx(col - 1);
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onNavigateTo(projects[focusIdx ?? 0].id);
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [vis, focusIdx, projects, onNavigateTo]);

  return (
    <div style={{ display: 'flex', height: '100%', gap: 10 }}>
      {projects.map((project, i) => {
        const isHovered = hovIdx === i;
        const isKeyFocused = hovIdx === null && focusIdx !== null && focusIdx === i;
        const isActive = isHovered || isKeyFocused;
        const isDimmed = hovIdx !== null ? !isHovered : false;

        return (
          <div
            key={project.id}
            onClick={() => onNavigateTo(project.id)}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '24px',
              paddingTop: '10%',
              borderRadius: 13,
              border: `1px solid ${isActive ? t.accentBorder : t.border}`,
              background: isActive ? t.accentMuted : 'transparent',
              cursor: 'pointer',
              opacity: isDimmed ? 0.28 : 1,
              transition: 'opacity 0.3s ease, border-color 0.25s ease, background 0.25s ease',
              animation: vis ? `stIn 0.5s cubic-bezier(0.22,1,0.36,1) ${460 + i * 80}ms both` : 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ height: 88, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10 }}>
                <span style={{
                  fontFamily: mono, fontSize: 11, fontWeight: 600,
                  color: t.accent, letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {project.meta}
                </span>
                <div style={{
                  fontFamily: font, fontSize: 26, fontWeight: 700,
                  color: t.text, lineHeight: 1.05, letterSpacing: '-0.02em',
                }}>
                  {project.title}
                </div>
              </div>
              <div style={{ height: 1, background: isActive ? t.accentBorder : t.border, transition: 'background 0.25s ease' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {project.highlights.map((h, j) => (
                  <div key={j} style={{
                    padding: '12px 14px', background: t.surfaceInner,
                    borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 5,
                  }}>
                    <span style={{
                      fontFamily: mono, fontSize: 11, fontWeight: 600,
                      color: t.accent, textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      {h.label}
                    </span>
                    <span style={{ fontFamily: font, fontSize: 15, fontWeight: 500, color: t.text, lineHeight: 1.5 }}>
                      {h.body}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
