export default function Pop({ vis, delay = 0, children }) {
  return (
    <div
      style={{
        opacity: vis ? 1 : 0,
        animation: vis
          ? `popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both`
          : 'none',
      }}
    >
      {children}
    </div>
  );
}
