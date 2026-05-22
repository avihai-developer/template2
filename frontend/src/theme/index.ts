import { createTheme } from '@mui/material';

interface AppThemeOptions {
  themeMode: 'light' | 'dark';
  primaryHue: number;
  secondaryHue: number;
  direction: 'rtl' | 'ltr';
}

export const createAppTheme = ({ themeMode, direction, primaryHue, secondaryHue }: AppThemeOptions) => {
  const isDark = themeMode === 'dark';
  
  const primaryColor = isDark 
    ? `hsl(${primaryHue}, 90%, 65%)` 
    : `hsl(${primaryHue}, 85%, 58%)`;
    
  const secondaryColor = isDark 
    ? `hsl(${secondaryHue}, 90%, 55%)` 
    : `hsl(${secondaryHue}, 90%, 42%)`;

  return createTheme({
    direction,
    palette: {
      mode: themeMode,
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    },
  });
};
