import { createContext, useContext } from 'react';

export const themes = {
  dark: {
    bg: '#0D1211',
    surface: '#161C1A',
    surfaceInner: 'rgba(255,255,255,0.05)',
    border: '#223028',
    gridLine: 'rgba(255,255,255,0.09)',
    frameBorder: 'rgba(255,255,255,0.16)',
    text: '#E4EAE7',
    textSecondary: '#8EA59D',
    textMuted: '#5E7570',
    accent: '#4DB896',
    accentMuted: 'rgba(77,184,150,0.12)',
    accentBorder: 'rgba(77,184,150,0.28)',
    dotGrid: '#223028',
    shadow: '0 4px 20px rgba(0,0,0,0.3)',
    shadowSm: '0 2px 12px rgba(0,0,0,0.25)',
  },
  light: {
    bg: '#F0F4F1',
    surface: '#E6EDEA',
    surfaceInner: 'rgba(255,255,255,0.72)',
    border: '#C8DAD3',
    gridLine: 'rgba(200,218,211,0.55)',
    frameBorder: '#C8DAD3',
    text: '#1E302A',
    textSecondary: '#45645C',
    textMuted: '#7A9890',
    accent: '#1C7A58',
    accentMuted: 'rgba(28,122,88,0.1)',
    accentBorder: 'rgba(28,122,88,0.22)',
    dotGrid: '#C8DAD3',
    shadow: '0 4px 20px rgba(0,0,0,0.08)',
    shadowSm: '0 2px 8px rgba(0,0,0,0.06)',
  },
};

export const ThemeCtx = createContext(themes.dark);
export const useT = () => useContext(ThemeCtx);
export const font = `'Satoshi','Helvetica Neue',sans-serif`;
export const mono = `'JetBrains Mono','SF Mono',monospace`;
