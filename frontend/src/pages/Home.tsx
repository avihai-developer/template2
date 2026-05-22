import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Grid
} from '@mui/material';
import { 
  Plus,
  Sparkles,
  Layout,
  Layers,
  Terminal
} from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  return (
    <Box className="home-container" sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Premium Empty Canvas Hero Section */}
      <Card 
        className="glass float-animation" 
        sx={{ 
          p: { xs: 4, md: 6 }, 
          borderRadius: 'var(--radius-lg)', 
          position: 'relative', 
          overflow: 'hidden',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          minHeight: '380px'
        }}
      >
        {/* Subtle decorative background patterns inside the card */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', 
            backgroundSize: '20px 20px', 
            opacity: 0.25, 
            pointerEvents: 'none' 
          }} 
        />
        
        {/* Glowing badge */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            px: 2, 
            py: 0.5, 
            borderRadius: 'var(--radius-full)', 
            background: 'var(--primary-glow)', 
            border: '1px solid var(--border-hover)',
            mb: 3,
            zIndex: 1
          }}
        >
          <Sparkles size={14} className="gradient-text" style={{ stroke: 'var(--primary)' }} />
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--primary)' }}>
            {t('app.tagline')}
          </Typography>
        </Box>

        <CardContent sx={{ p: 0, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '640px' }}>
          {/* Main layout empty state icon */}
          <Box 
            className="metric-icon-wrapper" 
            sx={{ 
              width: 72, 
              height: 72, 
              borderRadius: 'var(--radius-md)', 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              transition: 'transform var(--transition-normal)',
              '&:hover': {
                transform: 'scale(1.08) rotate(5deg)'
              }
            }}
          >
            <Layout size={36} />
          </Box>

          <Typography variant="h3" component="h1" className="gradient-text" sx={{ mb: 2, fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' } }}>
            {t('app.welcome')}
          </Typography>

          <Typography variant="body1" sx={{ color: 'var(--text-secondary)', mb: 4, lineHeight: 1.7, fontSize: '1.05rem' }}>
            {t('app.description')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<Plus size={18} />}
              sx={{ boxShadow: '0 4px 15px var(--primary-glow)' }}
            >
              {t('app.cta.start')}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Grid of Empty Layout Sections (Dash-border styling placeholders for building sections) */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            className="glass glass-interactive" 
            sx={{ 
              borderRadius: 'var(--radius-md)', 
              border: '2px dashed var(--border)',
              background: 'transparent',
              '&:hover': {
                borderStyle: 'solid',
                borderColor: 'var(--primary)'
              }
            }}
          >
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', minHeight: '200px' }}>
              <Box sx={{ p: 1.5, borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-muted)', mb: 2 }}>
                <Layers size={24} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {isRtl ? 'קטע רכיב חדש' : 'New Component Section'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-muted)', maxWidth: '280px' }}>
                {isRtl ? 'שחרר את הרכיב המותאם אישית שלך כאן' : 'Drop your custom UI component or widget directly here.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            className="glass glass-interactive" 
            sx={{ 
              borderRadius: 'var(--radius-md)', 
              border: '2px dashed var(--border)',
              background: 'transparent',
              '&:hover': {
                borderStyle: 'solid',
                borderColor: 'var(--secondary)'
              }
            }}
          >
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', minHeight: '200px' }}>
              <Box sx={{ p: 1.5, borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-muted)', mb: 2 }}>
                <Terminal size={24} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {isRtl ? 'אינטגרציית API' : 'API Integration'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-muted)', maxWidth: '280px' }}>
                {isRtl ? 'חבר את ערוצי הנתונים או הבקשות שלך מהשרת' : 'Connect your backend data streams or server requests here.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

