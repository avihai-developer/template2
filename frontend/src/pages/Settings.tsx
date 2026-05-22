import { Sliders } from 'lucide-react';
import { Box, Typography, Slider as MuiSlider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

interface DashboardContext {
  hue: number;
  setHue: React.Dispatch<React.SetStateAction<number>>;
}

export default function Settings() {
  const { t } = useTranslation();
  const { hue, setHue } = useOutletContext<DashboardContext>();

  return (
    <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr' }}>
      <div className="section-card glass">
        <div className="section-header">
          <span className="section-title">
            <Sliders size={20} style={{ color: 'var(--primary)' }} />
            {t('tabs.config.customizerTitle')}
          </span>
        </div>
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {t('tabs.config.description')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', margin: '2rem 0' }}>
          {/* Native HTML Slider */}
          <div className="form-group" style={{ borderInlineEnd: '1px solid var(--border)', paddingInlineEnd: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-primary)' }}>{t('tabs.config.nativeControl')}</span>
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
              <span>{t('tabs.config.red')}</span>
              <span>{t('tabs.config.green')}</span>
              <span>{t('tabs.config.blue')}</span>
              <span>{t('tabs.config.wrap')}</span>
            </div>
          </div>

          {/* MUI Slider Counterpart */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', mb: 1.5, color: 'var(--text-primary)' }}>
              <span>{t('tabs.config.muiControl')}</span>
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
              <span>{t('tabs.config.red')}</span>
              <span>{t('tabs.config.green')}</span>
              <span>{t('tabs.config.blue')}</span>
              <span>{t('tabs.config.wrap')}</span>
            </div>
          </Box>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => setHue(258)}>{t('tabs.config.resetBtn')}</button>
          <button className="btn btn-secondary" onClick={() => setHue(195)}>{t('tabs.config.cyanBtn')}</button>
          <button className="btn btn-secondary" onClick={() => setHue(15)}>{t('tabs.config.crimsonBtn')}</button>
        </div>
      </div>
    </div>
  );
}
