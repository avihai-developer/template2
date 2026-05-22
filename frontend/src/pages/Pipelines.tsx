import { PlayCircle, Send } from 'lucide-react';
import { TextField, Button as MuiButton, CircularProgress, Box, Alert as MuiAlert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

interface DashboardContext {
  sandboxInput: string;
  setSandboxInput: React.Dispatch<React.SetStateAction<string>>;
  sandboxStatus: 'idle' | 'running' | 'success' | 'failed';
  handleRunPipeline: () => void;
}

export default function Pipelines() {
  const { t } = useTranslation();
  const { sandboxInput, setSandboxInput, sandboxStatus, handleRunPipeline } = useOutletContext<DashboardContext>();

  return (
    <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr' }}>
      <div className="section-card glass">
        <div className="section-header">
          <span className="section-title">
            <PlayCircle size={20} style={{ color: 'var(--primary)' }} />
            {t('tabs.pipelines.sandboxTitle')}
          </span>
          {sandboxStatus === 'running' && <span className="tag tag-cyan">{t('tabs.pipelines.statusRunning')}</span>}
          {sandboxStatus === 'success' && <span className="tag tag-success">{t('tabs.pipelines.statusPassed')}</span>}
          {sandboxStatus === 'failed' && <span className="tag tag-purple" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>{t('tabs.pipelines.statusFailed')}</span>}
          {sandboxStatus === 'idle' && <span className="tag tag-purple">{t('tabs.pipelines.statusReady')}</span>}
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          {t('tabs.pipelines.description')}
        </p>

        <div style={{ display: 'flex', gap: '12px', width: '100%', marginBottom: '1.5rem', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={sandboxInput}
            onChange={(e) => setSandboxInput(e.target.value)}
            placeholder={t('tabs.pipelines.placeholder')}
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
            {sandboxStatus === 'running' ? t('tabs.pipelines.executingBtn') : t('tabs.pipelines.runBtn')}
          </MuiButton>
        </div>

        {sandboxStatus !== 'idle' && (
          <Box sx={{ mt: 1, mb: 2 }}>
            {sandboxStatus === 'success' && (
              <MuiAlert severity="success">
                {t('tabs.pipelines.alertSuccess', { input: sandboxInput })}
              </MuiAlert>
            )}
            {sandboxStatus === 'failed' && (
              <MuiAlert severity="error">
                {t('tabs.pipelines.alertFailed')}
              </MuiAlert>
            )}
            {sandboxStatus === 'running' && (
              <MuiAlert severity="info">
                {t('tabs.pipelines.alertInfo')}
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
  );
}
