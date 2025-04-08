
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
    'float': 'float 6s ease-in-out infinite',
    'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'bounce-slow': 'bounce 3s infinite',
    'slide-in-right': 'slideInRight 0.5s forwards',
    'slide-in-left': 'slideInLeft 0.5s forwards',
    'slide-in-up': 'slideInUp 0.5s forwards',
    'slide-in-down': 'slideInDown 0.5s forwards',
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
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    },
    slideInRight: {
      '0%': { transform: 'translateX(100px)', opacity: '0' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    },
    slideInLeft: {
      '0%': { transform: 'translateX(-100px)', opacity: '0' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    },
    slideInUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideInDown: {
      '0%': { transform: 'translateY(-20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
  },
  extend: {
    transitionProperty: {
      'height': 'height',
      'spacing': 'margin, padding',
    },
    transitionTimingFunction: {
      'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    transitionDuration: {
      '2000': '2000ms',
    },
  }
};
