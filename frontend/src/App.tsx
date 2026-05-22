import { useState, useEffect, useMemo } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import our layouts and page components
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';

// Create Emotion caches for LTR and RTL layouts
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
});

export default function App() {
  const { t, i18n } = useTranslation();

  // Core Theme States
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [hue] = useState<number>(258); // elegant default purple hue

  // Syncing Language & Layout Direction Changes
  useEffect(() => {
    const isRtl = i18n.language === 'he';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  // Dynamic customized MUI Theme
  const muiTheme = useMemo(() => {
    const isDark = theme === 'dark';
    const primaryMain = `hsl(${hue}, 85%, ${isDark ? 65 : 58}%)`;
    const secondaryMain = `hsl(195, 90%, ${isDark ? 55 : 42}%)`;
    const textPrimary = isDark ? `hsl(${hue}, 25%, 95%)` : `hsl(${hue}, 35%, 12%)`;
    const textSecondary = isDark ? `hsl(${hue}, 14%, 72%)` : `hsl(${hue}, 18%, 40%)`;
    const paperBg = isDark ? 'rgba(18, 15, 28, 0.45)' : 'rgba(255, 255, 255, 0.45)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(140, 120, 240, 0.12)';

    return createTheme({
      direction: i18n.language === 'he' ? 'rtl' : 'ltr',
      palette: {
        mode: theme,
        primary: {
          main: primaryMain,
        },
        secondary: {
          main: secondaryMain,
        },
        background: {
          default: 'transparent',
          paper: paperBg,
        },
        text: {
          primary: textPrimary,
          secondary: textSecondary,
        },
      },
      typography: {
        fontFamily: `'Plus Jakarta Sans', var(--font-body), sans-serif`,
        h1: { fontFamily: 'var(--font-heading), sans-serif', fontWeight: 800 },
        h2: { fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700 },
        h3: { fontFamily: 'var(--font-heading), sans-serif', fontWeight: 700 },
        h4: { fontFamily: 'var(--font-heading), sans-serif', fontWeight: 600 },
        h5: { fontFamily: 'var(--font-heading), sans-serif', fontWeight: 600 },
        h6: { fontFamily: 'var(--font-heading), sans-serif', fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 },
      },
      shape: {
        borderRadius: 14,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: 'transparent',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${borderColor}`,
              boxShadow: 'var(--glass-shadow)',
              background: paperBg,
              transition: 'background var(--transition-normal), border var(--transition-normal), box-shadow var(--transition-normal)',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: ({ ownerState }) => ({
              borderRadius: '12px',
              padding: '8px 20px',
              fontWeight: 600,
              fontFamily: 'var(--font-body), sans-serif',
              transition: 'all var(--transition-fast)',
              '&:hover': {
                transform: 'translateY(-1px)',
              },
              ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
                background: primaryMain,
                color: '#fff',
                boxShadow: `0 4px 15px hsla(${hue}, 85%, 58%, 0.2)`,
                '&:hover': {
                  background: `hsl(${hue}, 85%, ${isDark ? 70 : 50}%)`,
                  boxShadow: `0 6px 20px hsla(${hue}, 85%, 58%, 0.3)`,
                },
              }),
              ...(ownerState.variant === 'outlined' && ownerState.color === 'primary' && {
                borderColor: primaryMain,
                color: primaryMain,
                '&:hover': {
                  borderColor: `hsl(${hue}, 85%, ${isDark ? 70 : 50}%)`,
                  background: `hsla(${hue}, 85%, 58%, 0.08)`,
                },
              }),
            }),
          },
        },
      },
    });
  }, [theme, hue, i18n.language]);

  // Syncing Theme Changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Syncing Dynamic Hue Customizer (CSS Variable)
  useEffect(() => {
    document.documentElement.style.setProperty('--hue-primary', hue.toString());
  }, [hue]);

  const currentCache = i18n.language === 'he' ? cacheRtl : cacheLtr;

  return (
    <CacheProvider value={currentCache}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<MainLayout theme={theme} setTheme={setTheme} />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  );
}
