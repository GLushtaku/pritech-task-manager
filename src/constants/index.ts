export const STORAGE_KEY = '@pritech_tasks';

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