export const STORAGE_KEY = '@pritech_tasks';

export const API = {
  quotesUrl: process.env.EXPO_PUBLIC_QUOTES_API_URL ?? 'https://dummyjson.com/quotes/random',
} as const;

export const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Not Completed', value: 'not_completed' },
] as const;

export const COLORS = {
  primary: '#6C63FF',
  success: '#4CAF50',
  danger: '#F44336',
  warning: '#FF9800',
  background: '#F5F5F5',
  white: '#FFFFFF',
  text: '#212121',
  textLight: '#757575',
  border: '#E0E0E0',
  cardShadow: '#00000015',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  ssm: 10,
  md: 12,
  lg: 16,
  lgg : 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  icon: 16,
  emoji: 56,
} as const;

export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
} as const;

export const LINE_HEIGHTS = {
  sm: 18,
  md: 20,
  lg: 24,
  xl: 28,
} as const;