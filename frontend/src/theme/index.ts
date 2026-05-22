import { createTheme } from '@mui/material';

interface AppThemeOptions {
  themeMode: 'light' | 'dark';
  hue?: number; // Kept in interface for backward compatibility with App.tsx calls
  direction: 'rtl' | 'ltr';
}

export const createAppTheme = ({ themeMode, direction }: AppThemeOptions) => {
  return createTheme({
    direction,
    palette: {
      mode: themeMode,
    },
  });
};
