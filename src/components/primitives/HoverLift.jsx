import { useState } from 'react';
import { useT } from '../../theme';

export default function HoverLift({ children, style = {} }) {
  const t = useT();
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        ...style,
        transform: h ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: h ? t.shadow : '0 0 0 transparent',
        transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease',
      }}
    >
      {children}
    </div>
  );
}
