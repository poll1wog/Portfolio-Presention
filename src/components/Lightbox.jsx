import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease both',
      }}
    >
      {/* X button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          fontSize: 18,
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        ✕
      </button>

      {/* Image — stopPropagation so clicking it doesn't close the lightbox */}
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: 10,
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          animation: 'popIn 0.3s cubic-bezier(0.22,1,0.36,1) both',
        }}
      />
    </div>,
    document.body
  );
}
