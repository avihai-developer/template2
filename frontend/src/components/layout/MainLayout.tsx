import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Sun, Moon, Globe, Sparkles } from 'lucide-react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export default function MainLayout({ theme, setTheme }: MainLayoutProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="app-container">
      {/* Ambient glowing background orbs */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      {/* Clean Main Content Layout */}
      <div className="layout-wrapper">
        {/* Header top bar */}
        <header className="navbar glass">
          <div className="brand-section">
            <div className="logo-icon">
              <Sparkles size={20} fill="currentColor" />
            </div>
            <span className="logo-text">{t('app.title')}</span>
          </div>

          <div className="navbar-actions">
            {/* Language Switch Button */}
            <button 
              className="btn btn-secondary" 
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'he' : 'en')}
              title={t('app.toggleLang')}
              aria-label={t('app.toggleLang')}
            >
              <Globe size={16} />
              <span>{t('app.toggleLang')}</span>
            </button>

            {/* Theme Mode Toggle Button */}
            <button 
              className="theme-toggle" 
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
              title={t('app.toggleTheme')}
              aria-label={t('app.toggleTheme')}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </header>

        {/* Core Router Outlet */}
        <main className="main-content">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="footer-section">
          <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
            {t('app.footer')}
          </Typography>
        </footer>
      </div>
    </div>
  );
}
