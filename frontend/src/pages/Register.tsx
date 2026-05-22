import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  TextField,
  Link,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';
import { UserPlus } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { t } = useTranslation();
  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Local state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear global auth errors on mount/unmount
  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);
    clearError();

    // Client-side validations
    if (!fullName || !email || !password || !confirmPassword) {
      setLocalError(t('Please fill in all fields'));
      return;
    }

    if (password.length < 6) {
      setLocalError(t('Password must be at least 6 characters long'));
      return;
    }

    if (password !== confirmPassword) {
      setLocalError(t('Passwords do not match'));
      return;
    }

    setIsSubmitting(true);
    try {
      await register(fullName, email, password);
      // Success redirect is handled by useEffect watching isAuthenticated
    } catch (err: any) {
      setLocalError(err.message || t('registration.failed'));
    } finally {
      setIsSubmitting(false);
    }
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
              <UserPlus size={28} />
            </Box>

            <Box>
              <Typography variant="h4" className="gradient-text" sx={{ fontWeight: 800, mb: 1 }}>
                {t('register.title')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                {t('register.subtitle')}
              </Typography>
            </Box>
          </Stack>

          {/* Error Message Alert */}
          {(localError || error) && (
            <Alert 
              severity="error" 
              variant="outlined"
              onClose={() => {
                setLocalError(null);
                clearError();
              }}
              sx={{ 
                mb: 3, 
                borderRadius: 'var(--radius-md)',
                color: '#ef4444',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                '& .MuiAlert-icon': {
                  color: '#ef4444'
                }
              }}
            >
              {localError || error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label={t('register.fullName')}
                type="text"
                variant="outlined"
                required
                disabled={isSubmitting}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (localError) setLocalError(null);
                }}
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
                label={t('register.email')}
                type="email"
                variant="outlined"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (localError) setLocalError(null);
                }}
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
                label={t('register.password')}
                type="password"
                variant="outlined"
                required
                disabled={isSubmitting}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (localError) setLocalError(null);
                }}
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
                label={t('register.confirmPassword')}
                type="password"
                variant="outlined"
                required
                disabled={isSubmitting}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (localError) setLocalError(null);
                }}
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
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 4px 15px var(--primary-glow)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  t('register.submit')
                )}
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              {t('register.hasAccount')}{' '}
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{ 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'underline' 
                  } 
                }}
              >
                {t('register.loginLink')}
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
