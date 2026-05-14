export default function Stagger({ vis, base = 0, gap = 70, children }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <>
      {items.map((c, i) => (
        <div
          key={i}
          style={{
            opacity: vis ? 1 : 0,
            animation: vis
              ? `stIn 0.5s cubic-bezier(0.22,1,0.36,1) ${base + i * gap}ms both`
              : 'none',
          }}
        >
          {c}
        </div>
      ))}
    </>
  );
}
