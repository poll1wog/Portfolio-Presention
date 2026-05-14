import { useT, font, mono } from '../theme';
import Pop from '../components/primitives/Pop';
import HoverLift from '../components/primitives/HoverLift';

const links = [
  {
    label: 'Portfolio',
    value: 'pauldavisdesigns.com',
    href: 'https://pauldavisdesigns.com',
  },
  {
    label: 'Location',
    value: 'Relocating to Austin, TX — end of May',
    href: null,
  },
];

const closing = [
  { title: "I ship.", body: "Everything in this presentation is in production. I'm not a concept designer — I work until it's live." },
  { title: "I own it.", body: "Sole designer on every squad I've joined. I'm comfortable with ambiguity and I close the loop." },
  { title: "I collaborate.", body: "Engineering, CS, ops — I build with people, not just for them. That's how good work happens." },
  { title: "I'm moving to Austin.", body: "End of May. I'm excited about RealWork, the team, and the city." },
];

export default function EndContent({ vis }) {
  const t = useT();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{
          opacity: vis ? 1 : 0,
          animation: vis ? 'stIn 0.5s cubic-bezier(0.22,1,0.36,1) 0ms both' : 'none',
        }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: t.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Let's talk
          </span>
          <h2 style={{ fontFamily: font, fontSize: 36, fontWeight: 700, color: t.text, letterSpacing: '-0.03em', margin: '4px 0 16px' }}>
            Why I'd love to work here.
          </h2>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {links.map((l, i) => (
            <Pop key={i} vis={vis} delay={120 + i * 80}>
              <div style={{
                background: t.accentMuted,
                border: `1px solid ${t.accentBorder}`,
                borderRadius: 8,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ fontFamily: mono, fontSize: 10, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {l.label}
                </span>
                {l.href ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: font, fontSize: 13, color: t.accent, textDecoration: 'none' }}>
                    {l.value}
                  </a>
                ) : (
                  <span style={{ fontFamily: font, fontSize: 13, color: t.text }}>{l.value}</span>
                )}
              </div>
            </Pop>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {closing.map((c, i) => (
          <Pop key={i} vis={vis} delay={280 + i * 80}>
            <HoverLift style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
              padding: '20px 22px',
            }}>
              <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: t.accent, marginBottom: 6 }}>
                {c.title}
              </div>
              <div style={{ fontFamily: font, fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
                {c.body}
              </div>
            </HoverLift>
          </Pop>
        ))}
      </div>

      <div style={{
        opacity: vis ? 1 : 0,
        animation: vis ? 'stIn 0.5s cubic-bezier(0.22,1,0.36,1) 700ms both' : 'none',
      }}>
        <p style={{
          fontFamily: mono,
          fontSize: 11,
          color: t.textMuted,
          animation: vis ? 'typReveal 1.4s cubic-bezier(0.22,1,0.36,1) 800ms both' : 'none',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          display: 'inline-block',
          width: vis ? undefined : 0,
        }}>
          Built with Claude Code · pauldavisdesigns.com
        </p>
      </div>
    </div>
  );
}
