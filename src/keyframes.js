export const KF = `
@keyframes stIn {
  0%   { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.85); }
  60%  { opacity: 1; transform: scale(1.06); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes typReveal {
  0%   { width: 0; opacity: 0.6; }
  100% { width: 100%; opacity: 0.6; }
}
@keyframes sprPress {
  0%   { transform: scale(1); }
  40%  { transform: scale(0.88); }
  70%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}
@keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes scrollUp {
  from { transform: translateY(0); }
  to   { transform: translateY(calc(-1 * var(--scroll-dist, 50%))); }
}
`;
