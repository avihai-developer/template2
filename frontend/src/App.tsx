import { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  PlayCircle, 
  Settings, 
  Terminal, 
  Sun, 
  Moon, 
  RefreshCw, 
  Cpu, 
  Layers, 
  Zap, 
  FolderGit2, 
  CheckCircle2, 
  AlertTriangle,
  Sliders,
  Send
} from 'lucide-react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Slider as MuiSlider,
  TextField,
  Button as MuiButton,
  Chip,
  CircularProgress,
  LinearProgress,
  Tooltip,
  Alert as MuiAlert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';

interface ConsoleLog {
  time: string;
  type: 'info' | 'success' | 'warning';
  text: string;
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'pipelines' | 'config' | 'mui'>('overview');
  
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
    { time: '14:10:02', type: 'info', text: 'Nexus Orchestration Hub initialized.' },
    { time: '14:10:15', type: 'success', text: 'Secure TLS tunnel linked with remote dev environment.' },
    { time: '14:10:39', type: 'info', text: 'Ready for client inputs.' }
  ]);

  // Dialog State
  const [auditOpen, setAuditOpen] = useState(false);

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
  }, [theme, hue]);

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

  const addLog = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [{ time: timestamp, type, text }, ...prev.slice(0, 15)]);
  };

  const handleRunPipeline = () => {
    if (!sandboxInput.trim()) return;
    setSandboxStatus('running');
    addLog(`Initiating user command pipeline: "${sandboxInput}"`, 'info');
    
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15;
      if (isSuccess) {
        setSandboxStatus('success');
        setPipelinesActive(prev => Math.min(prev + 1, 9));
        addLog(`Pipeline successful for target: "${sandboxInput}"`, 'success');
      } else {
        setSandboxStatus('failed');
        addLog(`Pipeline execution aborted. Code 127 in step 'Linting Audit'`, 'warning');
      }
    }, 2000);
  };

  const handleSystemAudit = () => {
    addLog('Executing comprehensive cluster and linting audit...', 'info');
    setAuditOpen(true);
    setTimeout(() => {
      addLog('Zero major vulnerabilities identified in workspace dependencies.', 'success');
      addLog('Standard code quality rules passed with 100% compliance.', 'success');
    }, 1200);
  };

  return (
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
            <span className="logo-text">Nexus Template</span>
          </div>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <button 
                onClick={() => setActiveTab('overview')} 
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}
              >
                <LayoutDashboard size={18} />
                Overview Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('pipelines')} 
                className={`nav-item ${activeTab === 'pipelines' ? 'active' : ''}`}
                style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}
              >
                <PlayCircle size={18} />
                Pipeline Control
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('config')} 
                className={`nav-item ${activeTab === 'config' ? 'active' : ''}`}
                style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}
              >
                <Settings size={18} />
                Workspace Settings
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('mui')} 
                className={`nav-item ${activeTab === 'mui' ? 'active' : ''}`}
                style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}
              >
                <Layers size={18} />
                MUI Playground
              </button>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">AG</div>
            <div className="user-info">
              <span className="user-name">Developer Mode</span>
              <span className="user-role">Workspace Admin</span>
            </div>
          </div>
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="main-workspace">
        
        {/* Dynamic Header */}
        <header className="dashboard-header">
          <div className="header-title-sec">
            <h1>
              {activeTab === 'overview' && 'System Analytics Overview'}
              {activeTab === 'pipelines' && 'Pipeline Orchestration & Sandbox'}
              {activeTab === 'config' && 'Custom Theme Engine'}
              {activeTab === 'mui' && 'Material-UI Dashboard Showcase'}
            </h1>
            <p className="header-subtitle">
              {activeTab === 'overview' && 'Real-time telemetry diagnostics and active node statistics.'}
              {activeTab === 'pipelines' && 'Execute pipelines, write commands, and monitor terminal activities.'}
              {activeTab === 'config' && 'Configure custom workspace styling and real-time color tokens.'}
              {activeTab === 'mui' && 'Interactive playground showing premium custom-themed MUI components.'}
            </p>
          </div>
          
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => addLog('System configuration settings synced.', 'info')}>
              <RefreshCw size={15} />
              Sync Setup
            </button>
            <button className="btn btn-primary" onClick={handleSystemAudit}>
              <CheckCircle2 size={15} />
              Audit Cluster
            </button>
          </div>
        </header>

        {/* Real-time Telemetry Grid */}
        <section className="metrics-grid">
          <div className="metric-card glass glass-interactive">
            <div className="metric-header">
              <span className="metric-title">CPU Compute Capacity</span>
              <div className="metric-icon-wrapper" style={{ background: 'rgba(140, 120, 240, 0.1)', color: 'var(--primary)' }}>
                <Cpu size={18} />
              </div>
            </div>
            <span className="metric-value">{cpu}%</span>
            <div className={`metric-trend ${cpu > 50 ? 'down' : 'up'}`}>
              <Zap size={12} fill="currentColor" /> {cpu > 50 ? 'High compute spike' : 'Nominal load'}
            </div>
          </div>

          <div className="metric-card glass glass-interactive">
            <div className="metric-header">
              <span className="metric-title">Active Node Channels</span>
              <div className="metric-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary)' }}>
                <Layers size={18} />
              </div>
            </div>
            <span className="metric-value">{pipelinesActive} Channels</span>
            <div className="metric-trend up">
              <CheckCircle2 size={12} fill="currentColor" /> Stable orchestration
            </div>
          </div>

          <div className="metric-card glass glass-interactive">
            <div className="metric-header">
              <span className="metric-title">Websocket Sync Latency</span>
              <div className="metric-icon-wrapper" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--accent)' }}>
                <Terminal size={18} />
              </div>
            </div>
            <span className="metric-value">{latency}ms</span>
            <div className="metric-trend up">
              <Zap size={12} fill="currentColor" /> Ultra-low ping
            </div>
          </div>

          <div className="metric-card glass glass-interactive">
            <div className="metric-header">
              <span className="metric-title">System Memory Load</span>
              <div className="metric-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--success)' }}>
                <Layers size={18} />
              </div>
            </div>
            <span className="metric-value">{memory} GB</span>
            <div className="metric-trend up">
              <CheckCircle2 size={12} fill="currentColor" /> System optimal
            </div>
          </div>
        </section>

        {/* Core Layout Panels */}
        {activeTab === 'overview' && (
          <div className="dashboard-content-grid">
            {/* Main Diagnostics Graph */}
            <div className="section-card glass">
              <div className="section-header">
                <span className="section-title">
                  <PlayCircle size={20} style={{ color: 'var(--primary)' }} />
                  Weekly Compute Distribution
                </span>
                <span className="tag tag-purple">Real-time Stream</span>
              </div>
              
              <div className="chart-container">
                <div className="chart-bars">
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: '40px' }}><span className="chart-bar-tooltip">Monday: 20%</span></div>
                    <span className="chart-label">Mon</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: '70px' }}><span className="chart-bar-tooltip">Tuesday: 35%</span></div>
                    <span className="chart-label">Tue</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: '110px' }}><span className="chart-bar-tooltip">Wednesday: 55%</span></div>
                    <span className="chart-label">Wed</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: '160px' }}><span className="chart-bar-tooltip">Thursday: 80%</span></div>
                    <span className="chart-label">Thu</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: `${cpu * 2}px` }}><span className="chart-bar-tooltip">Today (Live): {cpu}%</span></div>
                    <span className="chart-label" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Orchestration Tools */}
            <div className="section-card glass">
              <div className="section-header">
                <span className="section-title">
                  <Sliders size={20} style={{ color: 'var(--secondary)' }} />
                  Quick Actions
                </span>
              </div>
              
              <div className="quick-actions-list">
                <button className="action-btn" onClick={() => addLog('Flushed dev environment caches.', 'success')}>
                  <RefreshCw className="action-btn-icon" />
                  Flush Cache
                </button>
                <button className="action-btn" onClick={() => addLog('Re-indexing local workspace directories.', 'info')}>
                  <FolderGit2 className="action-btn-icon" />
                  Index Files
                </button>
                <button className="action-btn" onClick={() => {
                  setPipelinesActive(3);
                  addLog('Orchestration nodes safely reset to default baseline.', 'warning');
                }}>
                  <AlertTriangle className="action-btn-icon" style={{ color: 'var(--warning)' }} />
                  Reset Nodes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pipelines' && (
          <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="section-card glass">
              <div className="section-header">
                <span className="section-title">
                  <PlayCircle size={20} style={{ color: 'var(--primary)' }} />
                  Interactive Pipeline Sandbox
                </span>
                {sandboxStatus === 'running' && <span className="tag tag-cyan">Running...</span>}
                {sandboxStatus === 'success' && <span className="tag tag-success">Pipeline Passed</span>}
                {sandboxStatus === 'failed' && <span className="tag tag-purple" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>Pipeline Failed</span>}
                {sandboxStatus === 'idle' && <span className="tag tag-purple">Ready</span>}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Simulate task runners, code build workflows, or deployment sequences. Enter a command script below to run.
              </p>

              <div style={{ display: 'flex', gap: '12px', width: '100%', marginBottom: '1.5rem', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={sandboxInput}
                  onChange={(e) => setSandboxInput(e.target.value)}
                  placeholder="e.g. npm run build"
                  disabled={sandboxStatus === 'running'}
                  sx={{
                    flexGrow: 1,
                    '& .MuiInputBase-input': {
                      color: 'var(--text-primary)',
                      padding: '12px 16px',
                      fontSize: '0.95rem'
                    }
                  }}
                />
                <MuiButton 
                  variant="contained" 
                  color="primary"
                  onClick={handleRunPipeline}
                  disabled={sandboxStatus === 'running'}
                  startIcon={sandboxStatus === 'running' ? <CircularProgress size={16} color="inherit" /> : <Send size={15} />}
                  sx={{ height: '48px', px: 3 }}
                >
                  {sandboxStatus === 'running' ? 'Executing...' : 'Run Sequence'}
                </MuiButton>
              </div>

              {sandboxStatus !== 'idle' && (
                <Box sx={{ mt: 1, mb: 2 }}>
                  {sandboxStatus === 'success' && (
                    <MuiAlert severity="success">
                      Pipeline succeeded! Executed target: "{sandboxInput}"
                    </MuiAlert>
                  )}
                  {sandboxStatus === 'failed' && (
                    <MuiAlert severity="error">
                      Pipeline execution aborted. Code 127 in step 'Linting Audit'.
                    </MuiAlert>
                  )}
                  {sandboxStatus === 'running' && (
                    <MuiAlert severity="info">
                      Sequence initiated. Connecting to dev environment...
                    </MuiAlert>
                  )}
                </Box>
              )}

              {sandboxStatus === 'running' && (
                <div style={{ 
                  height: '4px', 
                  background: 'var(--border)', 
                  borderRadius: 'var(--radius-full)', 
                  overflow: 'hidden',
                  marginBottom: '1rem' 
                }}>
                  <div style={{ 
                    height: '100%', 
                    width: '60%', 
                    background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                    borderRadius: 'var(--radius-full)',
                    animation: 'float 2s ease-in-out infinite' 
                  }}></div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="section-card glass">
              <div className="section-header">
                <span className="section-title">
                  <Sliders size={20} style={{ color: 'var(--primary)' }} />
                  Dynamic Real-Time Theme customizer
                </span>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Slide the hue controller to dynamically change the primary core color values across the template.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', margin: '2rem 0' }}>
                {/* Native HTML Slider */}
                <div className="form-group" style={{ borderRight: '1px solid var(--border)', paddingRight: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-primary)' }}>Native Range Control</span>
                    <span style={{ color: 'var(--primary)' }}>{hue}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={hue} 
                    onChange={(e) => setHue(parseInt(e.target.value))}
                    style={{ 
                      width: '100%', 
                      height: '8px', 
                      borderRadius: 'var(--radius-full)', 
                      outline: 'none',
                      accentColor: 'var(--primary)',
                      cursor: 'pointer'
                    }} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>0° Red</span>
                    <span>120° Green</span>
                    <span>240° Blue</span>
                    <span>360° Wrap</span>
                  </div>
                </div>

                {/* MUI Slider Counterpart */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', mb: 1.5, color: 'var(--text-primary)' }}>
                    <span>Material-UI Slider Control</span>
                    <span style={{ color: 'var(--primary)' }}>{hue}°</span>
                  </Typography>
                  <MuiSlider
                    min={0}
                    max={360}
                    value={hue}
                    onChange={(_, val) => setHue(val as number)}
                    aria-label="MUI HSL Hue Slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <span>0° Red</span>
                    <span>120° Green</span>
                    <span>240° Blue</span>
                    <span>360° Wrap</span>
                  </div>
                </Box>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => setHue(258)}>Reset Theme to Purple Default</button>
                <button className="btn btn-secondary" onClick={() => setHue(195)}>Switch to Electric Cyan</button>
                <button className="btn btn-secondary" onClick={() => setHue(15)}>Switch to Crimson Neon</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mui' && (
          <div className="dashboard-content-grid" style={{ gridTemplateColumns: '2fr 1.2fr', gap: '24px' }}>
            {/* MUI Metrics & telemetry panel */}
            <div className="section-card glass" style={{ minHeight: 'auto' }}>
              <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <span className="section-title">
                  <Cpu size={20} style={{ color: 'var(--primary)' }} />
                  Telemetry Visualization (MUI Progress)
                </span>
                <span className="tag tag-purple">Active Feeds</span>
              </div>

              <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
                Real-time metrics rendered using customized Material-UI indicators. Notice how they smoothly adapt to color hue changes and system load updates.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4, justifyContent: 'space-around', alignItems: 'center' }}>
                {/* Circular Telemetry */}
                <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={100} 
                      size={100} 
                      thickness={4} 
                      sx={{ color: 'rgba(255,255,255,0.05)' }} 
                    />
                    <CircularProgress 
                      variant="determinate" 
                      value={cpu} 
                      size={100} 
                      thickness={4} 
                      sx={{ 
                        position: 'absolute', 
                        left: 0, 
                        color: 'var(--primary)',
                        transition: 'all 0.3s ease'
                      }} 
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" component="div" sx={{ color: 'var(--text-primary)', fontWeight: 800 }}>
                        {cpu}%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                    CPU UTILIZATION
                  </Typography>
                </Box>

                {/* Circular Latency */}
                <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={100} 
                      size={100} 
                      thickness={4} 
                      sx={{ color: 'rgba(255,255,255,0.05)' }} 
                    />
                    <CircularProgress 
                      variant="determinate" 
                      value={Math.min(latency * 2, 100)} 
                      size={100} 
                      thickness={4} 
                      sx={{ 
                        position: 'absolute', 
                        left: 0, 
                        color: 'var(--secondary)',
                        transition: 'all 0.3s ease'
                      }} 
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" component="div" sx={{ color: 'var(--text-primary)', fontWeight: 800 }}>
                        {latency}ms
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                    SYNC LATENCY
                  </Typography>
                </Box>
              </Box>

              {/* Linear Metrics */}
              <Box sx={{ width: '100%', mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    Memory Load ({memory} GB / 8.0 GB)
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--success)' }}>
                    {Math.round((memory / 8) * 100)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(memory / 8) * 100} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'var(--success)',
                      borderRadius: 4
                    }
                  }} 
                />
              </Box>
            </div>

            {/* Interactive Components Showcase */}
            <div className="section-card glass" style={{ minHeight: 'auto' }}>
              <div className="section-header" style={{ marginBottom: '1rem' }}>
                <span className="section-title">
                  <Layers size={20} style={{ color: 'var(--primary)' }} />
                  UI Components Showcase
                </span>
              </div>

              <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
                Premium custom components highlighting state control, tooltips, and badges.
              </Typography>

              {/* Status Chips */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                <Tooltip title="Orchestrator online and operating within specifications" arrow placement="top">
                  <Chip 
                    label="Orchestrator Stable" 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                      color: 'var(--success)',
                      fontWeight: 600,
                      border: '1px solid rgba(16, 185, 129, 0.15)'
                    }} 
                  />
                </Tooltip>
                <Tooltip title="Real-time web socket latency is nominal" arrow placement="top">
                  <Chip 
                    label="WebSocket Sync" 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(6, 182, 212, 0.1)', 
                      color: 'var(--secondary)',
                      fontWeight: 600,
                      border: '1px solid rgba(6, 182, 212, 0.15)'
                    }} 
                  />
                </Tooltip>
                <Tooltip title="Dynamic palette customizer is active" arrow placement="top">
                  <Chip 
                    label="Dynamic Theme Active" 
                    size="small" 
                    sx={{ 
                      backgroundColor: `hsla(${hue}, 85%, 58%, 0.12)`, 
                      color: 'var(--primary)',
                      fontWeight: 600,
                      border: `1px solid hsla(${hue}, 85%, 58%, 0.2)`
                    }} 
                  />
                </Tooltip>
              </Box>

              <Divider sx={{ my: 2.5, borderColor: 'var(--border)' }} />

              {/* Action Buttons */}
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                Dynamic MUI Action Overrides
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <MuiButton 
                  variant="contained" 
                  color="primary"
                  onClick={() => addLog('Material-UI primary button action triggered.', 'success')}
                >
                  Dynamic Primary Button
                </MuiButton>
                <MuiButton 
                  variant="outlined" 
                  onClick={() => addLog('Material-UI outlined button action triggered.', 'info')}
                  sx={{
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)'
                  }}
                >
                  Dynamic Outlined Button
                </MuiButton>
              </Box>
            </div>
          </div>
        )}

        {/* Dedicated Live Log Terminal */}
        <section style={{ marginTop: '2.5rem' }}>
          <div className="glass" style={{ padding: '1.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 700 }}>
                <Terminal size={18} style={{ color: 'var(--primary)' }} />
                Real-time System Orchestrator Console
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
                Clear Output
              </button>
            </div>
            
            <div className="console-panel">
              {logs.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', padding: '10px 0' }}>[Terminal empty - awaiting activities]</div>
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
                      {log.text}
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
          Cluster Security Audit Complete
        </DialogTitle>
        <DialogContent sx={{ color: 'var(--text-secondary)' }}>
          <Typography variant="body2" sx={{ mb: 2, color: 'var(--text-muted)', mt: 1 }}>
            System environment scanned thoroughly.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
              <div style={{ color: 'var(--success)', marginTop: '2px' }}>✔</div>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>Package Dependencies Secured</Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>Analyzed all npm node_modules packages. Zero high or critical alerts flagged.</Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
              <div style={{ color: 'var(--success)', marginTop: '2px' }}>✔</div>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>React 19 & MUI Integration Verified</Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>Peer dependencies fully compiled and optimized in sandbox memory node.</Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
              <div style={{ color: 'var(--success)', marginTop: '2px' }}>✔</div>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>Standard Quality Score: 100%</Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>ESLint rules complied. Safe module bounds checked successfully.</Typography>
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
            Acknowledge Audit
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
    </ThemeProvider>
  );
}
