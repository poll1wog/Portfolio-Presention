import { useT, font, mono } from '../theme';
import Pop from '../components/primitives/Pop';

export default function QuestionsContent({ questions = [], vis, onRestart }) {
  const t = useT();

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 32px',
    }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {questions.map((q, i) => (
          <Pop key={i} vis={vis} delay={60 + i * 80}>
            <div style={{
              display: 'flex',
              gap: 20,
              alignItems: 'baseline',
              padding: '16px 0',
              borderBottom: `1px solid ${t.border}`,
            }}>
              <span style={{
                fontFamily: mono,
                fontSize: 11,
                color: t.accent,
                letterSpacing: '0.06em',
                flexShrink: 0,
                paddingTop: 3,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: t.text, lineHeight: 1.3 }}>
                  {q.q}
                </div>
                <div style={{ fontFamily: font, fontSize: 15, color: t.textSecondary, lineHeight: 1.55, marginTop: 6 }}>
                  {q.d}
                </div>
              </div>
            </div>
          </Pop>
        ))}

        {/* Restart button */}
        <Pop vis={vis} delay={60 + questions.length * 80}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20 }}>
            <button
              onClick={onRestart}
              style={{
                fontFamily: mono,
                fontSize: 11,
                color: t.accent,
                letterSpacing: '0.06em',
                background: 'none',
                border: `1px solid ${t.border}`,
                borderRadius: 8,
                padding: '8px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              ↩ Back to start
            </button>
          </div>
        </Pop>
      </div>
    </div>
  );
}
