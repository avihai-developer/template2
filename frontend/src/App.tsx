import { useState, useEffect, useMemo } from 'react';
import {
  ThemeProvider,
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
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import ProtectedRoute from './components/common/ProtectedRoute';
import { createAppTheme } from './theme';
import { AuthProvider } from './context/AuthContext';

// Create Emotion caches for LTR and RTL layouts
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
});

export default function App() {
  const { i18n } = useTranslation();

  // Core Theme States
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [primaryHue, setPrimaryHue] = useState<number>(() => {
    return Number(localStorage.getItem('primaryHue') || '258');
  });
  const [secondaryHue, setSecondaryHue] = useState<number>(() => {
    return Number(localStorage.getItem('secondaryHue') || '195');
  });

  // Syncing Language & Layout Direction Changes
  useEffect(() => {
    const isRtl = i18n.language === 'he';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  // Dynamic customized MUI Theme
  const muiTheme = useMemo(() => {
    return createAppTheme({
      themeMode: theme,
      primaryHue,
      secondaryHue,
      direction: i18n.language === 'he' ? 'rtl' : 'ltr',
    });
  }, [theme, primaryHue, secondaryHue, i18n.language]);

  // Syncing Theme Changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Syncing Dynamic Hue Customizers (CSS Variables & Storage)
  useEffect(() => {
    document.documentElement.style.setProperty('--hue-primary', primaryHue.toString());
    localStorage.setItem('primaryHue', primaryHue.toString());
  }, [primaryHue]);

  useEffect(() => {
    document.documentElement.style.setProperty('--hue-secondary', secondaryHue.toString());
    localStorage.setItem('secondaryHue', secondaryHue.toString());
  }, [secondaryHue]);

  const currentCache = i18n.language === 'he' ? cacheRtl : cacheLtr;

  return (
    <AuthProvider>
      <CacheProvider value={currentCache}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={
              <MainLayout 
                theme={theme} 
                setTheme={setTheme} 
                primaryHue={primaryHue}
                setPrimaryHue={setPrimaryHue}
                secondaryHue={secondaryHue}
                setSecondaryHue={setSecondaryHue}
              />
            }>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="users" element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
}
