
import { THEME_COLORS } from './constants';

// Tailwind theme extensions for our NU Academic Hub
export const themeExtensions = {
  colors: {
    'nu-blue': THEME_COLORS.nuBlue,
    'nu-yellow': THEME_COLORS.nuYellow,
    'nu-darkblue': THEME_COLORS.nuDarkBlue,
    'nu-lightblue': THEME_COLORS.nuLightBlue,
  },
  animation: {
    'fade-in': 'fadeIn 0.5s ease-in-out',
    'slide-in': 'slideIn 0.5s ease-in-out',
    'scale-in': 'scaleIn 0.3s ease-in-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideIn: {
      '0%': { transform: 'translateX(-10px)', opacity: '0' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
  },
};
