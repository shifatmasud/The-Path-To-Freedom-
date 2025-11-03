// design-tokens.ts

export const tokens = {
  space: {
    '4xs': '0.125rem', // 2px
    '3xs': '0.25rem', // 4px
    '2xs': '0.5rem',  // 8px
    xs: '0.75rem',    // 12px
    s: '1rem',       // 16px
    m: '1.5rem',     // 24px
    l: '2rem',       // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',     // 64px
    '3xl': '6rem',     // 96px
    '4xl': '8rem',     // 128px
  },
  radius: {
    s: '4px',
    m: '8px',
    l: '16px',
    full: '9999px',
  },
  motion: {
    duration: {
      '100': '100ms',
      '200': '200ms',
      '300': '300ms',
    },
    ease: {
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  typography: {
    displayL: { fontFamily: "'Anton', sans-serif", fontSize: '6rem', letterSpacing: '0.025em', lineHeight: 1.1, textTransform: 'uppercase' },
    displayM: { fontFamily: "'Anton', sans-serif", fontSize: '4.5rem', letterSpacing: '0.025em', lineHeight: 1.1, textTransform: 'uppercase' },
    handwritingL: { fontFamily: "'Comic Neue', cursive", fontSize: '3.5rem', fontWeight: 700, lineHeight: 1 },
    handwritingM: { fontFamily: "'Comic Neue', cursive", fontSize: '2.25rem', fontWeight: 700, lineHeight: 1 },
    headingL: { fontSize: '1.5rem', fontWeight: 700 },
    headingM: { fontSize: '1.25rem', fontWeight: 700 },
    bodyL: { fontSize: '1.25rem', lineHeight: 1.625 },
    bodyM: { fontSize: '1.125rem', lineHeight: 1.625 },
    bodyS: { fontSize: '1rem', lineHeight: 1.625 },
    labelM: { fontSize: '1rem' },
    labelS: { fontSize: '0.875rem' },
  },
  themes: {
    light: {
      theme: 'light',
      Color: {
        Base: {
          Surface: { 1: '#F9F9F9', 2: '#FFFFFF', 3: 'rgba(255, 255, 255, 0.5)' },
          Content: { 1: '#000000', 2: '#1F2937', 3: '#4B5563' },
          Border: { 1: 'rgba(0, 0, 0, 0.1)', 2: 'rgba(0, 0, 0, 0.2)' },
        },
        Primary: { Glow: '59, 130, 246', Icon: '#2563eb' }, // blue
        Secondary: { Glow: '34, 197, 94', Icon: '#16a34a' }, // green
        Tertiary: { Glow: '234, 179, 8', Icon: '#ca8a04' }, // yellow
      },
    },
    dark: {
      theme: 'dark',
      Color: {
        Base: {
          Surface: { 1: '#101010', 2: '#181818', 3: 'rgba(0, 0, 0, 0.3)' },
          Content: { 1: '#F9FAFB', 2: '#D1D5DB', 3: '#9CA3AF' },
          Border: { 1: 'rgba(255, 255, 255, 0.1)', 2: 'rgba(255, 255, 255, 0.2)' },
        },
        Primary: { Glow: '59, 130, 246', Icon: '#93c5fd' }, // blue
        Secondary: { Glow: '34, 197, 94', Icon: '#86efac' }, // green
        Tertiary: { Glow: '245, 158, 11', Icon: '#fcd34d' }, // yellow
      },
    },
  },
};

export type DesignTokens = typeof tokens;