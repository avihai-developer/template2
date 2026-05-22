import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  TextField,
  Link,
  Stack
} from '@mui/material';
import { LogIn } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder login action
    console.log('Login submitted');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 200px)',
        py: 4 
      }}
    >
      <Card 
        className="glass float-animation" 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 'var(--radius-lg)', 
          position: 'relative', 
          overflow: 'hidden',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          width: '100%',
          maxWidth: '480px'
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

        <CardContent sx={{ p: 0, zIndex: 1, position: 'relative' }}>
          <Stack spacing={3} sx={{ mb: 4, textAlign: 'center', alignItems: 'center' }}>
            <Box 
              className="metric-icon-wrapper" 
              sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: 'var(--radius-md)', 
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform var(--transition-normal)',
                '&:hover': {
                  transform: 'scale(1.08) rotate(5deg)'
                }
              }}
            >
              <LogIn size={28} />
            </Box>

            <Box>
              <Typography variant="h4" className="gradient-text" sx={{ fontWeight: 800, mb: 1 }}>
                {t('login.title')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                {t('login.subtitle')}
              </Typography>
            </Box>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label={t('login.email')}
                type="email"
                variant="outlined"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    transition: 'all var(--transition-fast)',
                    '& fieldset': {
                      borderColor: 'var(--border)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--border-hover)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--text-secondary)',
                    '&.Mui-focused': {
                      color: 'var(--primary)',
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    color: 'var(--text-primary)',
                  }
                }}
              />

              <TextField
                fullWidth
                label={t('login.password')}
                type="password"
                variant="outlined"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    transition: 'all var(--transition-fast)',
                    '& fieldset': {
                      borderColor: 'var(--border)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--border-hover)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--text-secondary)',
                    '&.Mui-focused': {
                      color: 'var(--primary)',
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    color: 'var(--text-primary)',
                  }
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 4px 15px var(--primary-glow)',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}
              >
                {t('login.submit')}
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              {t('login.noAccount')}{' '}
              <Link 
                component={RouterLink} 
                to="/register" 
                sx={{ 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'underline' 
                  } 
                }}
              >
                {t('login.registerLink')}
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
