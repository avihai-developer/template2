import { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  PlayCircle, 
  Settings as SettingsIcon, 
  Terminal, 
  Sun, 
  Moon, 
  RefreshCw, 
  Cpu, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Globe
} from 'lucide-react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { Routes, Route, Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';

// Import our routed page components
import Overview from './pages/Overview';
import Pipelines from './pages/Pipelines';
import Settings from './pages/Settings';
import MuiShowcase from './pages/MuiShowcase';

// Create caches for LTR and RTL layouts
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
});

interface ConsoleLog {
  time: string;
  type: 'info' | 'success' | 'warning';
  text?: string;
  key?: string;
  params?: Record<string, any>;
}

export default function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Theme States
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [hue, setHue] = useState<number>(258);
  
  // Telemetry Metrics States (feel "alive")
  const [cpu, setCpu] = useState<number>(28);
  const [memory, setMemory] = useState<number>(4.2);
  const [latency, setLatency] = useState<number>(18);
  const [pipelinesActive, setPipelinesActive] = useState<number>(3);
  
  // Pipeline Sandbox States
  const [sandboxInput, setSandboxInput] = useState<string>('npm run build');
  const [sandboxStatus, setSandboxStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');

  // Interactive logs console
  const [logs, setLogs] = useState<ConsoleLog[]>([
    { time: '14:10:02', type: 'info', key: 'logs.init' },
    { time: '14:10:15', type: 'success', key: 'logs.tls' },
    { time: '14:10:39', type: 'info', key: 'logs.ready' }
  ]);

  // Dialog State
  const [auditOpen, setAuditOpen] = useState(false);

  // Syncing Language/Direction Changes
  useEffect(() => {
    const isRtl = i18n.language === 'he';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  // Dynamic MUI Theme
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
        MuiSlider: {
          styleOverrides: {
            root: {
              color: primaryMain,
              height: 6,
            },
            thumb: {
              width: 18,
              height: 18,
              backgroundColor: primaryMain,
              border: '2px solid #fff',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px hsla(${hue}, 85%, 58%, 0.16)`,
              },
            },
            rail: {
              opacity: 0.28,
              backgroundColor: primaryMain,
            },
            track: {
              backgroundColor: primaryMain,
            },
          },
        },
        MuiSwitch: {
          styleOverrides: {
            root: {
              width: 42,
              height: 26,
              padding: 0,
              '& .MuiSwitch-switchBase': {
                padding: 0,
                margin: 2,
                transitionDuration: '300ms',
                '&.Mui-checked': {
                  transform: 'translateX(16px)',
                  color: '#fff',
                  '& + .MuiSwitch-track': {
                    backgroundColor: primaryMain,
                    opacity: 1,
                    border: 0,
                  },
                },
              },
              '& .MuiSwitch-thumb': {
                boxSizing: 'border-box',
                width: 22,
                height: 22,
              },
              '& .MuiSwitch-track': {
                borderRadius: 26 / 2,
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                opacity: 1,
              },
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                fontFamily: 'var(--font-body), sans-serif',
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: primaryMain,
                },
                '&.Mui-focused fieldset': {
                  borderColor: primaryMain,
                  borderWidth: '1.5px',
                },
              },
            },
          },
        },
        MuiAlert: {
          styleOverrides: {
            root: ({ ownerState }) => ({
              borderRadius: '12px',
              fontFamily: 'var(--font-body), sans-serif',
              ...(ownerState.severity === 'success' && {
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--success)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                '& .MuiAlert-icon': {
                  color: 'var(--success)',
                },
              }),
              ...(ownerState.severity === 'info' && {
                backgroundColor: 'rgba(140, 120, 240, 0.1)',
                color: primaryMain,
                border: `1px solid ${borderColor}`,
                '& .MuiAlert-icon': {
                  color: primaryMain,
                },
              }),
              ...(ownerState.severity === 'error' && {
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--error)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                '& .MuiAlert-icon': {
                  color: 'var(--error)',
                },
              }),
              ...(ownerState.severity === 'warning' && {
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning)',
                border: '1px solid rgba(245, 158, 11, 0.15)',
                '& .MuiAlert-icon': {
                  color: 'var(--warning)',
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

  // Syncing Dynamic Hue Customizer
  useEffect(() => {
    document.documentElement.style.setProperty('--hue-primary', hue.toString());
  }, [hue]);

  // Fluctuate metrics dynamically to make the app feel alive
  useEffect(() => {
    const timer = setInterval(() => {
      setCpu(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.min(Math.max(prev + delta, 12), 65);
      });
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.min(Math.max(prev + delta, 10), 45);
      });
      setMemory(prev => {
        const delta = (Math.random() * 0.2) - 0.1;
        return parseFloat(Math.min(Math.max(prev + delta, 3.8), 4.8).toFixed(1));
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const addLog = (textOrKey: string, type: 'info' | 'success' | 'warning' = 'info', params?: Record<string, any>) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const isKey = textOrKey.includes('.');
    const newLog: ConsoleLog = isKey
      ? { time: timestamp, type, key: textOrKey, params }
      : { time: timestamp, type, text: textOrKey };
    setLogs(prev => [newLog, ...prev.slice(0, 15)]);
  };

  const handleRunPipeline = () => {
    if (!sandboxInput.trim()) return;
    setSandboxStatus('running');
    addLog('logs.runPipeline', 'info', { input: sandboxInput });
    
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15;
      if (isSuccess) {
        setSandboxStatus('success');
        setPipelinesActive(prev => Math.min(prev + 1, 9));
        addLog('logs.pipelineSuccess', 'success', { input: sandboxInput });
      } else {
        setSandboxStatus('failed');
        addLog('logs.pipelineFailed', 'warning');
      }
    }, 2000);
  };

  const handleSystemAudit = () => {
    addLog('logs.executingAudit', 'info');
    setAuditOpen(true);
    setTimeout(() => {
      addLog('logs.auditNoVulnerabilities', 'success');
      addLog('logs.auditCompliance', 'success');
    }, 1200);
  };

  // Header Title mapping based on current browser path
  const getHeaderInfo = () => {
    switch (location.pathname) {
      case '/pipelines':
        return {
          title: t('header.titles.pipelines'),
          subtitle: t('header.subtitles.pipelines'),
        };
      case '/settings':
        return {
          title: t('header.titles.config'),
          subtitle: t('header.subtitles.config'),
        };
      case '/mui':
        return {
          title: t('header.titles.mui'),
          subtitle: t('header.subtitles.mui'),
        };
      case '/':
      default:
        return {
          title: t('header.titles.overview'),
          subtitle: t('header.subtitles.overview'),
        };
    }
  };

  const { title, subtitle } = getHeaderInfo();
  const currentCache = i18n.language === 'he' ? cacheRtl : cacheLtr;

  // Bundle state/actions to share with child pages
  const sharedContext = {
    cpu,
    latency,
    memory,
    pipelinesActive,
    setPipelinesActive,
    logs,
    addLog,
    setLogs,
    hue,
    setHue,
    theme,
    setTheme,
    sandboxInput,
    setSandboxInput,
    sandboxStatus,
    setSandboxStatus,
    handleRunPipeline
  };

  return (
    <CacheProvider value={currentCache}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <div className="app-container">
          {/* Background glowing orbs */}
          <div className="ambient-glow glow-1"></div>
          <div className="ambient-glow glow-2"></div>

          {/* Sidebar Navigation */}
          <aside className="sidebar glass">
            <div className="logo-section">
              <div className="logo-icon">
                <Zap size={22} fill="currentColor" />
              </div>
              <div>
                <span className="logo-text">{t('sidebar.title')}</span>
              </div>
            </div>

            <nav>
              <ul className="nav-links">
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  >
                    <LayoutDashboard size={18} />
                    {t('sidebar.overview')}
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pipelines" 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  >
                    <PlayCircle size={18} />
                    {t('sidebar.pipelines')}
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/settings" 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  >
                    <SettingsIcon size={18} />
                    {t('sidebar.settings')}
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/mui" 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Layers size={18} />
                    {t('sidebar.mui')}
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="sidebar-footer">
              <div className="user-profile">
                <div className="user-avatar">AG</div>
                <div className="user-info">
                  <span className="user-name">{t('sidebar.devMode')}</span>
                  <span className="user-role">{t('sidebar.admin')}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="theme-toggle" 
                  onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'he' : 'en')}
                  title={t('sidebar.toggleLang')}
                  aria-label={t('sidebar.toggleLang')}
                >
                  <Globe size={18} />
                </button>
                <button 
                  className="theme-toggle" 
                  onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                  title={t('sidebar.toggleTheme')}
                  aria-label={t('sidebar.toggleTheme')}
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              </div>
            </div>
          </aside>

          {/* Main Workspace Area */}
          <main className="main-workspace">
            {/* Dynamic Header */}
            <header className="dashboard-header">
              <div className="header-title-sec">
                <h1>{title}</h1>
                <p className="header-subtitle">{subtitle}</p>
              </div>
              
              <div className="header-actions">
                <button className="btn btn-secondary" onClick={() => addLog('logs.settingsSynced', 'info')}>
                  <RefreshCw size={15} />
                  {t('header.sync')}
                </button>
                <button className="btn btn-primary" onClick={handleSystemAudit}>
                  <CheckCircle2 size={15} />
                  {t('header.audit')}
                </button>
              </div>
            </header>

            {/* Real-time Telemetry Grid */}
            <section className="metrics-grid">
              <div className="metric-card glass glass-interactive">
                <div className="metric-header">
                  <span className="metric-title">{t('metrics.cpuTitle')}</span>
                  <div className="metric-icon-wrapper" style={{ background: 'rgba(140, 120, 240, 0.1)', color: 'var(--primary)' }}>
                    <Cpu size={18} />
                  </div>
                </div>
                <span className="metric-value">{cpu}%</span>
                <div className={`metric-trend ${cpu > 50 ? 'down' : 'up'}`}>
                  <Zap size={12} fill="currentColor" /> {cpu > 50 ? t('metrics.cpuTrendHigh') : t('metrics.cpuTrendNominal')}
                </div>
              </div>

              <div className="metric-card glass glass-interactive">
                <div className="metric-header">
                  <span className="metric-title">{t('metrics.channelsTitle')}</span>
                  <div className="metric-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary)' }}>
                    <Layers size={18} />
                  </div>
                </div>
                <span className="metric-value">{t('metrics.channelsValue', { count: pipelinesActive })}</span>
                <div className="metric-trend up">
                  <CheckCircle2 size={12} fill="currentColor" /> {t('metrics.channelsTrend')}
                </div>
              </div>

              <div className="metric-card glass glass-interactive">
                <div className="metric-header">
                  <span className="metric-title">{t('metrics.latencyTitle')}</span>
                  <div className="metric-icon-wrapper" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--accent)' }}>
                    <Terminal size={18} />
                  </div>
                </div>
                <span className="metric-value">{latency}ms</span>
                <div className="metric-trend up">
                  <Zap size={12} fill="currentColor" /> {t('metrics.latencyTrend')}
                </div>
              </div>

              <div className="metric-card glass glass-interactive">
                <div className="metric-header">
                  <span className="metric-title">{t('metrics.memoryTitle')}</span>
                  <div className="metric-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--success)' }}>
                    <Layers size={18} />
                  </div>
                </div>
                <span className="metric-value">{memory} GB</span>
                <div className="metric-trend up">
                  <CheckCircle2 size={12} fill="currentColor" /> {t('metrics.memoryTrend')}
                </div>
              </div>
            </section>

            {/* Core Routed Workspace Panels */}
            <Routes>
              <Route path="/" element={<Outlet context={sharedContext} />}>
                <Route index element={<Overview />} />
                <Route path="pipelines" element={<Pipelines />} />
                <Route path="settings" element={<Settings />} />
                <Route path="mui" element={<MuiShowcase />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>

            {/* Dedicated Live Log Terminal */}
            <section style={{ marginTop: '2.5rem' }}>
              <div className="glass" style={{ padding: '1.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 700 }}>
                    <Terminal size={18} style={{ color: 'var(--primary)' }} />
                    {t('console.title')}
                  </div>
                  <button 
                    onClick={() => setLogs([])}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--text-muted)', 
                      cursor: 'pointer', 
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}
                  >
                    {t('console.clear')}
                  </button>
                </div>
                
                <div className="console-panel">
                  {logs.length === 0 ? (
                    <div style={{ color: 'var(--text-muted)', padding: '10px 0' }}>{t('console.empty')}</div>
                  ) : (
                    logs.map((log, idx) => (
                      <div key={idx} className="console-line">
                        <span className="console-timestamp">[{log.time}]</span>
                        <span className={
                          log.type === 'success' ? 'console-success' : 
                          log.type === 'warning' ? 'console-warning' : 
                          'console-text'
                        }>
                          {log.type === 'warning' ? '⚠️ ' : log.type === 'success' ? '✔ ' : 'ℹ '}
                          {log.key ? t(log.key, log.params) : log.text}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </main>
          
          {/* Dynamic Security Audit Dialog */}
          <Dialog 
            open={auditOpen} 
            onClose={() => setAuditOpen(false)}
            maxWidth="sm"
            fullWidth
            sx={{
              '& .MuiDialog-paper': {
                background: 'var(--surface-solid)',
                backdropFilter: 'blur(24px)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-lg)'
              }
            }}
          >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 800, color: 'var(--text-primary)', pt: 3 }}>
              <CheckCircle2 size={24} style={{ color: 'var(--success)' }} />
              {t('auditDialog.title')}
            </DialogTitle>
            <DialogContent sx={{ color: 'var(--text-secondary)' }}>
              <Typography variant="body2" sx={{ mb: 2, color: 'var(--text-muted)', mt: 1 }}>
                {t('auditDialog.subtitle')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
                  <div style={{ color: 'var(--success)', marginTop: '2px' }}>✔</div>
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t('auditDialog.secTitle')}</Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>{t('auditDialog.secDesc')}</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
                  <div style={{ color: 'var(--success)', marginTop: '2px' }}>✔</div>
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t('auditDialog.reactTitle')}</Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>{t('auditDialog.reactDesc')}</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
                  <div style={{ color: 'var(--success)', marginTop: '2px' }}>✔</div>
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t('auditDialog.qualityTitle')}</Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>{t('auditDialog.qualityDesc')}</Typography>
                  </div>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
              <MuiButton 
                variant="contained" 
                onClick={() => setAuditOpen(false)}
                sx={{ px: 3 }}
              >
                {t('auditDialog.ack')}
              </MuiButton>
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
