import { useState } from 'react';
import { useT } from '../theme';

export default function ArrBtn({ dir, disabled, onClick }) {
  const t = useT();
  const [pr, setPr] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setPr(true);
    onClick();
    setTimeout(() => setPr(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label={dir === 'l' ? 'Previous slide' : 'Next slide'}
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        border: 'none',
        background: t.surfaceInner,
        color: disabled ? t.textMuted : t.textSecondary,
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        opacity: disabled ? 0.35 : 1,
        animation: pr ? 'sprPress 0.3s ease' : 'none',
        transition: 'opacity 0.2s',
        flexShrink: 0,
      }}
    >
      {dir === 'l' ? '←' : '→'}
    </button>
  );
}
