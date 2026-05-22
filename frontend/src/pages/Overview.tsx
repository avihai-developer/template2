import { PlayCircle, Sliders, RefreshCw, FolderGit2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

interface DashboardContext {
  cpu: number;
  setPipelinesActive: React.Dispatch<React.SetStateAction<number>>;
  addLog: (textOrKey: string, type?: 'info' | 'success' | 'warning', params?: Record<string, any>) => void;
}

export default function Overview() {
  const { t } = useTranslation();
  const { cpu, setPipelinesActive, addLog } = useOutletContext<DashboardContext>();

  return (
    <div className="dashboard-content-grid">
      {/* Main Diagnostics Graph */}
      <div className="section-card glass">
        <div className="section-header">
          <span className="section-title">
            <PlayCircle size={20} style={{ color: 'var(--primary)' }} />
            {t('tabs.overview.computeTitle')}
          </span>
          <span className="tag tag-purple">{t('tabs.overview.realtime')}</span>
        </div>
        
        <div className="chart-container">
          <div className="chart-bars">
            <div className="chart-bar-wrapper">
              <div className="chart-bar" style={{ height: '40px' }}><span className="chart-bar-tooltip">{t('tabs.overview.monday', { percent: 20 })}</span></div>
              <span className="chart-label">{t('tabs.overview.mon')}</span>
            </div>
            <div className="chart-bar-wrapper">
              <div className="chart-bar" style={{ height: '70px' }}><span className="chart-bar-tooltip">{t('tabs.overview.tuesday', { percent: 35 })}</span></div>
              <span className="chart-label">{t('tabs.overview.tue')}</span>
            </div>
            <div className="chart-bar-wrapper">
              <div className="chart-bar" style={{ height: '110px' }}><span className="chart-bar-tooltip">{t('tabs.overview.wednesday', { percent: 55 })}</span></div>
              <span className="chart-label">{t('tabs.overview.wed')}</span>
            </div>
            <div className="chart-bar-wrapper">
              <div className="chart-bar" style={{ height: '160px' }}><span className="chart-bar-tooltip">{t('tabs.overview.thursday', { percent: 80 })}</span></div>
              <span className="chart-label">{t('tabs.overview.thu')}</span>
            </div>
            <div className="chart-bar-wrapper">
              <div className="chart-bar" style={{ height: `${cpu * 2}px` }}><span className="chart-bar-tooltip">{t('tabs.overview.today', { percent: cpu })}</span></div>
              <span className="chart-label" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{t('tabs.overview.live')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Orchestration Tools */}
      <div className="section-card glass">
        <div className="section-header">
          <span className="section-title">
            <Sliders size={20} style={{ color: 'var(--secondary)' }} />
            {t('tabs.overview.quickActions')}
          </span>
        </div>
        
        <div className="quick-actions-list">
          <button className="action-btn" onClick={() => addLog('logs.cacheFlushed', 'success')}>
            <RefreshCw className="action-btn-icon" />
            {t('tabs.overview.flushCache')}
          </button>
          <button className="action-btn" onClick={() => addLog('logs.reindexing', 'info')}>
            <FolderGit2 className="action-btn-icon" />
            {t('tabs.overview.indexFiles')}
          </button>
          <button className="action-btn" onClick={() => {
            setPipelinesActive(3);
            addLog('logs.nodesReset', 'warning');
          }}>
            <AlertTriangle className="action-btn-icon" style={{ color: 'var(--warning)' }} />
            {t('tabs.overview.resetNodes')}
          </button>
        </div>
      </div>
    </div>
  );
}
