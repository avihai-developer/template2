import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Divider 
} from '@mui/material';
import { 
  Sparkles, 
  Globe, 
  Moon, 
  Code, 
  Compass, 
  ArrowRight, 
  Languages 
} from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  const features = [
    {
      title: t('app.features.i18n'),
      desc: t('app.features.i18nDesc'),
      icon: <Globe size={24} style={{ color: 'var(--primary)' }} />,
      tag: 'i18n'
    },
    {
      title: t('app.features.rtl'),
      desc: t('app.features.rtlDesc'),
      icon: <Languages size={24} style={{ color: 'var(--secondary)' }} />,
      tag: 'RTL'
    },
    {
      title: t('app.features.theme'),
      desc: t('app.features.themeDesc'),
      icon: <Moon size={24} style={{ color: 'var(--accent)' }} />,
      tag: 'MUI'
    },
    {
      title: t('app.features.routing'),
      desc: t('app.features.routingDesc'),
      icon: <Code size={24} style={{ color: 'var(--success)' }} />,
      tag: 'Router'
    }
  ];

  return (
    <Box className="home-container" sx={{ py: 2 }}>
      {/* Hero Welcome Card */}
      <Card className="glass float-animation" sx={{ p: { xs: 3, md: 5 }, borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden', mb: 5 }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2, display: 'flex', gap: 1 }}>
          <span className="tag tag-purple">{i18n.language.toUpperCase()}</span>
          <span className="tag tag-cyan">{isRtl ? 'RTL' : 'LTR'}</span>
        </Box>

        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Sparkles size={28} className="gradient-text" style={{ stroke: 'var(--primary)' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>
              {t('app.tagline')}
            </Typography>
          </Box>

          <Typography variant="h2" component="h1" className="gradient-text" sx={{ mb: 2, fontWeight: 800, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
            {t('app.welcome')}
          </Typography>

          <Typography variant="body1" sx={{ color: 'var(--text-secondary)', maxWidth: '800px', mb: 4, lineHeight: 1.7, fontSize: '1.1rem' }}>
            {t('app.description')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              endIcon={isRtl ? null : <ArrowRight size={18} />}
              startIcon={isRtl ? <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> : null}
            >
              {t('app.cta.start')}
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              startIcon={<Compass size={18} />}
            >
              {t('app.cta.docs')}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Features Grid Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          {t('app.features.title')}
        </Typography>
        <Divider sx={{ borderColor: 'var(--border)', width: '60px', borderWidth: '3px', borderRadius: 'var(--radius-full)' }} />
      </Box>

      {/* Interactive Features Grid */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 3 
        }}
      >
        {features.map((feature, idx) => (
          <Card key={idx} className="glass glass-interactive" sx={{ borderRadius: 'var(--radius-md)' }}>
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box className="metric-icon-wrapper" sx={{ p: 1, borderRadius: 'var(--radius-sm)' }}>
                  {feature.icon}
                </Box>
                <span className="tag tag-purple">{feature.tag}</span>
              </Box>
              <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 700 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {feature.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
