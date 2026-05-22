import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import type { Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MenuMui from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Sun, 
  Moon, 
  Globe, 
  Sparkles, 
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Users
} from 'lucide-react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background: 'var(--surface)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRight: '1px solid var(--border)',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: 'var(--surface)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRight: '1px solid var(--border)',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: 'var(--surface) !important',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid var(--border)',
  boxShadow: 'var(--glass-shadow)',
  color: 'var(--text-primary)',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

interface MainLayoutProps {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export default function MainLayout({ theme, setTheme }: MainLayoutProps) {
  const { t, i18n } = useTranslation();
  const muiTheme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Profile dropdown menu state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Build menu list dynamically based on authentication state
  const menuItems = [
    { key: 'home', label: t('menu.home'), path: '/', icon: <Home size={20} /> },
    ...(!isAuthenticated ? [
      { key: 'login', label: t('menu.login'), path: '/login', icon: <LogIn size={20} /> },
      { key: 'register', label: t('menu.register'), path: '/register', icon: <UserPlus size={20} /> },
    ] : [
      { key: 'users', label: t('menu.users', 'Users'), path: '/users', icon: <Users size={20} /> },
    ])
  ];

  // Helper to extract initials for user avatar
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', position: 'relative' }}>
      {/* Ambient glowing background orbs */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginInlineEnd: 2,
                },
                open && { display: 'none' },
              ]}
            >
              <Menu size={20} />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box className="logo-icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} fill="currentColor" />
              </Box>
              <Typography variant="h6" className="logo-text" noWrap component="div" sx={{ fontWeight: 800 }}>
                {t('app.title')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Language Switch Button */}
            <Button 
              variant="outlined" 
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'he' : 'en')}
              title={t('app.toggleLang')}
              aria-label={t('app.toggleLang')}
              startIcon={<Globe size={15} />}
              sx={{
                borderRadius: 'var(--radius-md)',
                px: 2,
                py: 0.75,
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
                backdropFilter: 'blur(10px)',
                background: 'var(--surface)',
                textTransform: 'none',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '0.85rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'var(--border-hover)',
                  background: 'var(--surface-hover)',
                }
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {t('app.toggleLang')}
              </Box>
            </Button>

            {/* Theme Mode Toggle Button */}
            <IconButton 
              className="theme-toggle" 
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
              title={t('app.toggleTheme')}
              aria-label={t('app.toggleTheme')}
              sx={{
                width: 38,
                height: 38,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                '&:hover': {
                  background: 'var(--surface-hover)',
                  color: 'var(--primary)',
                  transform: 'rotate(15deg)',
                }
              }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </IconButton>

            {/* Premium User Avatar & Profile Dropdown (Only shown if logged in) */}
            {isAuthenticated && user && (
              <>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  size="small"
                  aria-controls={isMenuOpen ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen ? 'true' : undefined}
                  sx={{ 
                    p: 0.5,
                    border: '2px solid var(--border)',
                    transition: 'all var(--transition-fast)',
                    '&:hover': {
                      borderColor: 'var(--primary)',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                      color: '#fff'
                    }}
                  >
                    {getInitials(user.fullName)}
                  </Avatar>
                </IconButton>
                
                <MenuMui
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  disableScrollLock
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.15))',
                        mt: 1.5,
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: 'var(--surface)',
                        backdropFilter: 'blur(20px)',
                        color: 'var(--text-primary)',
                        width: '240px',
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: muiTheme.direction === 'rtl' ? 'auto' : 14,
                          left: muiTheme.direction === 'rtl' ? 14 : 'auto',
                          width: 10,
                          height: 10,
                          bgcolor: 'var(--surface)',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                          borderLeft: '1px solid var(--border)',
                          borderTop: '1px solid var(--border)',
                        },
                      },
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {/* Non-clickable user info header */}
                  <Box sx={{ px: 2.5, py: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      {user.fullName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', mb: 0.5 }}>
                      {user.email}
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'inline-block',
                        px: 1, 
                        py: 0.25, 
                        borderRadius: '10px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        background: 'rgba(124, 58, 237, 0.15)',
                        color: 'var(--primary)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {user.role}
                    </Box>
                  </Box>
                  
                  <Divider sx={{ borderColor: 'var(--border)' }} />
                  
                  <MenuItem onClick={handleMenuClose} sx={{ py: 1.25, fontSize: '0.9rem', color: 'var(--text-primary)', '&:hover': { background: 'var(--surface-hover)' } }}>
                    <ListItemIcon sx={{ color: 'var(--text-secondary)' }}>
                      <User size={18} />
                    </ListItemIcon>
                    {t('menu.profile', 'My Profile')}
                  </MenuItem>
                  
                  <Divider sx={{ borderColor: 'var(--border)' }} />
                  
                  <MenuItem onClick={handleLogout} sx={{ py: 1.25, fontSize: '0.9rem', color: '#ef4444', '&:hover': { background: 'rgba(239, 68, 68, 0.08)' } }}>
                    <ListItemIcon sx={{ color: '#ef4444' }}>
                      <LogOut size={18} />
                    </ListItemIcon>
                    {t('menu.logout', 'Sign Out')}
                  </MenuItem>
                </MenuMui>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: 'var(--text-secondary)' }}>
            {muiTheme.direction === 'rtl' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: 'var(--border)' }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <List>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                        borderRadius: 'var(--radius-sm)',
                        mx: 1,
                        my: 0.5,
                        transition: 'all var(--transition-fast)',
                        color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                        background: isActive ? 'var(--primary-glow)' : 'transparent',
                        borderLeft: isActive && muiTheme.direction !== 'rtl' ? '3px solid var(--primary)' : 'none',
                        borderRight: isActive && muiTheme.direction === 'rtl' ? '3px solid var(--primary)' : 'none',
                        '&:hover': {
                          background: isActive ? 'var(--primary-glow)' : 'var(--surface-hover)',
                          color: 'var(--primary)',
                          '& .MuiListItemIcon-root': {
                            color: 'var(--primary)',
                            transform: 'scale(1.08)',
                          }
                        }
                      },
                      open
                        ? {
                            justifyContent: 'initial',
                          }
                        : {
                            justifyContent: 'center',
                          },
                    ]}
                  >
                    <ListItemIcon
                      className="MuiListItemIcon-root"
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: 'center',
                          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                          transition: 'all var(--transition-fast)',
                        },
                        open
                          ? {
                              marginInlineEnd: 3,
                            }
                          : {
                              marginInlineEnd: 'auto',
                            },
                      ]}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={[
                        open
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            },
                      ]}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* Log Out button at the bottom of the sidebar drawer, shown if user is authenticated */}
          {isAuthenticated && (
            <List>
              <Divider sx={{ borderColor: 'var(--border)', mb: 1 }} />
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={handleLogout}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                      borderRadius: 'var(--radius-sm)',
                      mx: 1,
                      my: 0.5,
                      transition: 'all var(--transition-fast)',
                      color: '#ef4444',
                      '&:hover': {
                        background: 'rgba(239, 68, 68, 0.08)',
                        color: '#ef4444',
                        '& .MuiListItemIcon-root': {
                          color: '#ef4444',
                          transform: 'scale(1.08)',
                        }
                      }
                    },
                    open
                      ? {
                          justifyContent: 'initial',
                        }
                      : {
                          justifyContent: 'center',
                        },
                  ]}
                >
                  <ListItemIcon
                    className="MuiListItemIcon-root"
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                        color: '#ef4444',
                        transition: 'all var(--transition-fast)',
                      },
                      open
                        ? {
                            marginInlineEnd: 3,
                          }
                        : {
                            marginInlineEnd: 'auto',
                          },
                    ]}
                  >
                    <LogOut size={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('menu.logout', 'Sign Out')}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 4 }, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          minWidth: 0,
          zIndex: 1
        }}
      >
        <DrawerHeader />
        <Box sx={{ flexGrow: 1, mb: 4 }}>
          <Outlet />
        </Box>
        <Box 
          component="footer" 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            py: 3, 
            borderTop: '1px solid var(--border)' 
          }}
        >
          <Typography variant="body2" sx={{ color: 'var(--text-muted)', textAlign: 'center' }}>
            {t('app.footer')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
