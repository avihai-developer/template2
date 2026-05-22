import { Cpu, Layers } from 'lucide-react';
import { Typography, Box, CircularProgress, LinearProgress, Tooltip, Chip, Divider, Button as MuiButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

interface DashboardContext {
  cpu: number;
  latency: number;
  memory: number;
  hue: number;
  addLog: (textOrKey: string, type?: 'info' | 'success' | 'warning', params?: Record<string, any>) => void;
}

export default function MuiShowcase() {
  const { t } = useTranslation();
  const { cpu, latency, memory, hue, addLog } = useOutletContext<DashboardContext>();

  return (
    <div className="dashboard-content-grid" style={{ gridTemplateColumns: '2fr 1.2fr', gap: '24px' }}>
      {/* MUI Metrics & telemetry panel */}
      <div className="section-card glass" style={{ minHeight: 'auto' }}>
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <span className="section-title">
            <Cpu size={20} style={{ color: 'var(--primary)' }} />
            {t('tabs.mui.telemetryTitle')}
          </span>
          <span className="tag tag-purple">{t('tabs.mui.activeFeeds')}</span>
        </div>

        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
          {t('tabs.mui.description')}
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
              {t('tabs.mui.cpuUtil')}
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
              {t('tabs.mui.syncLatency')}
            </Typography>
          </Box>
        </Box>

        {/* Linear Metrics */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {t('tabs.mui.memoryLoad', { memory })}
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
            {t('tabs.mui.showcaseTitle')}
          </span>
        </div>

        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
          {t('tabs.mui.showcaseDesc')}
        </Typography>

        {/* Status Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          <Tooltip title={t('tabs.mui.tooltipStable')} arrow placement="top">
            <Chip 
              label={t('tabs.mui.chipStable')} 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                color: 'var(--success)',
                fontWeight: 600,
                border: '1px solid rgba(16, 185, 129, 0.15)'
              }} 
            />
          </Tooltip>
          <Tooltip title={t('tabs.mui.tooltipSync')} arrow placement="top">
            <Chip 
              label={t('tabs.mui.chipSync')} 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(6, 182, 212, 0.1)', 
                color: 'var(--secondary)',
                fontWeight: 600,
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }} 
            />
          </Tooltip>
          <Tooltip title={t('tabs.mui.tooltipTheme')} arrow placement="top">
            <Chip 
              label={t('tabs.mui.chipTheme')} 
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
          {t('tabs.mui.overridesTitle')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <MuiButton 
            variant="contained" 
            color="primary"
            onClick={() => addLog('logs.muiPrimary', 'success')}
          >
            {t('tabs.mui.primaryBtn')}
          </MuiButton>
          <MuiButton 
            variant="outlined" 
            onClick={() => addLog('logs.muiOutlined', 'info')}
            sx={{
              borderColor: 'var(--primary)',
              color: 'var(--primary)'
            }}
          >
            {t('tabs.mui.outlinedBtn')}
          </MuiButton>
        </Box>
      </div>
    </div>
  );
}
