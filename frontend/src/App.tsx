import { useState, useEffect } from 'react';
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

interface ConsoleLog {
  time: string;
  type: 'info' | 'success' | 'warning';
  text: string;
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'pipelines' | 'config'>('overview');
  
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
    setTimeout(() => {
      addLog('Zero major vulnerabilities identified in workspace dependencies.', 'success');
      addLog('Standard code quality rules passed with 100% compliance.', 'success');
    }, 1200);
  };

  return (
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
            </h1>
            <p className="header-subtitle">
              {activeTab === 'overview' && 'Real-time telemetry diagnostics and active node statistics.'}
              {activeTab === 'pipelines' && 'Execute pipelines, write commands, and monitor terminal activities.'}
              {activeTab === 'config' && 'Configure custom workspace styling and real-time color tokens.'}
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

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Simulate task runners, code build workflows, or deployment sequences. Enter a command script below to run.
              </p>

              <div style={{ display: 'flex', gap: '12px', width: '100%', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ flexGrow: 1 }}>
                  <input 
                    type="text" 
                    value={sandboxInput}
                    onChange={(e) => setSandboxInput(e.target.value)}
                    placeholder="e.g. npm run build" 
                    className="form-input" 
                    disabled={sandboxStatus === 'running'}
                  />
                </div>
                <button 
                  className="btn btn-primary" 
                  onClick={handleRunPipeline}
                  disabled={sandboxStatus === 'running'}
                  style={{ height: '48px', padding: '0 24px' }}
                >
                  <Send size={15} />
                  Run Sequence
                </button>
              </div>

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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '2rem 0' }}>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    <span>Primary HSL Hue Offset</span>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>0° Red/Warm</span>
                    <span>120° Green</span>
                    <span>240° Blue/Purple</span>
                    <span>360° Wrap</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => setHue(258)}>Reset Theme to Purple Default</button>
                <button className="btn btn-secondary" onClick={() => setHue(195)}>Switch to Electric Cyan</button>
                <button className="btn btn-secondary" onClick={() => setHue(15)}>Switch to Crimson Neon</button>
              </div>
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
    </div>
  );
}
