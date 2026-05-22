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
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
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
  Users,
  Palette
} from 'lucide-react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background: 'var(--primary) !important',
  backgroundImage: 'none !important',
  borderRight: '1px solid rgba(255, 255, 255, 0.15) !important',
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
  background: 'var(--primary) !important',
  backgroundImage: 'none !important',
  borderRight: '1px solid rgba(255, 255, 255, 0.15) !important',
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
  backgroundImage: 'none !important',
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

const colorPresets = [
  { name: 'Purple (Default)', hue: 258, color: 'hsl(258, 85%, 58%)' },
  { name: 'Indigo Blue', hue: 225, color: 'hsl(225, 85%, 58%)' },
  { name: 'Ocean Teal', hue: 195, color: 'hsl(195, 85%, 58%)' },
  { name: 'Emerald Green', hue: 142, color: 'hsl(142, 85%, 58%)' },
  { name: 'Amber Gold', hue: 45, color: 'hsl(45, 85%, 58%)' },
  { name: 'Sunset Orange', hue: 24, color: 'hsl(24, 85%, 58%)' },
  { name: 'Rose Pink', hue: 330, color: 'hsl(330, 85%, 58%)' },
];

interface MainLayoutProps {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  primaryHue: number;
  setPrimaryHue: React.Dispatch<React.SetStateAction<number>>;
  secondaryHue: number;
  setSecondaryHue: React.Dispatch<React.SetStateAction<number>>;
}

export default function MainLayout({ 
  theme, 
  setTheme,
  primaryHue,
  setPrimaryHue,
  secondaryHue,
  setSecondaryHue
}: MainLayoutProps) {
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

  // Palette customizer menu state
  const [paletteAnchorEl, setPaletteAnchorEl] = React.useState<null | HTMLElement>(null);
  const isPaletteMenuOpen = Boolean(paletteAnchorEl);

  const handlePaletteMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPaletteAnchorEl(event.currentTarget);
  };

  const handlePaletteMenuClose = () => {
    setPaletteAnchorEl(null);
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

      <AppBar 
        position="fixed" 
        open={open}
        sx={{
          background: 'var(--primary) !important',
          backgroundColor: 'var(--primary) !important',
          backgroundImage: 'none !important',
          backdropFilter: 'none !important',
          WebkitBackdropFilter: 'none !important',
          opacity: '1 !important',
          color: '#ffffff !important',
        }}
      >
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
              <Box 
                className="logo-icon" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.2) !important',
                  color: '#ffffff !important',
                }}
              >
                <Sparkles size={18} fill="currentColor" />
              </Box>
              <Typography 
                variant="h6" 
                className="logo-text" 
                noWrap 
                component="div" 
                sx={{ 
                  fontWeight: 800,
                  background: 'none !important',
                  WebkitTextFillColor: '#ffffff !important',
                  color: '#ffffff !important',
                }}
              >
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
                borderColor: 'rgba(255, 255, 255, 0.4) !important',
                color: '#ffffff !important',
                background: 'rgba(255, 255, 255, 0.1) !important',
                textTransform: 'none',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '0.85rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#ffffff !important',
                  background: 'rgba(255, 255, 255, 0.2) !important',
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
                border: '1px solid rgba(255, 255, 255, 0.3) !important',
                background: 'rgba(255, 255, 255, 0.1) !important',
                color: '#ffffff !important',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2) !important',
                  color: '#ffffff !important',
                  transform: 'rotate(15deg)',
                }
              }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </IconButton>

            {/* Dynamic Palette Customizer Button */}
            <IconButton 
              onClick={handlePaletteMenuOpen}
              title={t('app.customizeTheme', 'Customize Theme Colors')}
              aria-label={t('app.customizeTheme', 'Customize Theme Colors')}
              aria-controls={isPaletteMenuOpen ? 'palette-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isPaletteMenuOpen ? 'true' : undefined}
              sx={{
                width: 38,
                height: 38,
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.3) !important',
                background: 'rgba(255, 255, 255, 0.1) !important',
                color: '#ffffff !important',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2) !important',
                  color: '#ffffff !important',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Palette size={18} />
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
                    border: '2px solid rgba(255, 255, 255, 0.4) !important',
                    transition: 'all var(--transition-fast)',
                    '&:hover': {
                      borderColor: '#ffffff !important',
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

            {/* Dynamic Palette Customizer Dropdown Menu */}
            <MenuMui
              anchorEl={paletteAnchorEl}
              id="palette-menu"
              open={isPaletteMenuOpen}
              onClose={handlePaletteMenuClose}
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
                    color: 'var(--text-primary)',
                    width: '260px',
                    p: 2.5,
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: muiTheme.direction === 'rtl' ? 'auto' : 50,
                      left: muiTheme.direction === 'rtl' ? 50 : 'auto',
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
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 800, 
                  color: 'var(--text-primary)',
                  mb: 1.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Palette size={14} style={{ color: 'var(--primary)' }} />
                {t('theme.customizer', 'Theme Customizer')}
              </Typography>
              
              <Divider sx={{ borderColor: 'var(--border)', mb: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* Primary Color Selector */}
                <FormControl size="small" fullWidth>
                  <InputLabel id="primary-color-label" sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {t('theme.primaryColor', 'Primary Color')}
                  </InputLabel>
                  <Select
                    labelId="primary-color-label"
                    id="primary-color-select"
                    value={primaryHue}
                    label={t('theme.primaryColor', 'Primary Color')}
                    onChange={(e) => setPrimaryHue(Number(e.target.value))}
                    sx={{
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--border-hover)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--primary)',
                      },
                      fontSize: '0.9rem',
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                      slotProps: {
                        paper: {
                          sx: {
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                          }
                        }
                      }
                    }}
                  >
                    {colorPresets.map((preset) => (
                      <MenuItem 
                        key={`primary-${preset.hue}`} 
                        value={preset.hue}
                        sx={{
                          fontSize: '0.9rem',
                          py: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: 'var(--text-primary)',
                          '&:hover': {
                            background: 'var(--surface-hover)',
                          },
                          '&.Mui-selected': {
                            background: 'var(--primary-glow)',
                            color: 'var(--primary)',
                            fontWeight: 600,
                          }
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            background: preset.color,
                            flexShrink: 0
                          }} 
                        />
                        {preset.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Secondary Color Selector */}
                <FormControl size="small" fullWidth>
                  <InputLabel id="secondary-color-label" sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {t('theme.secondaryColor', 'Secondary Color')}
                  </InputLabel>
                  <Select
                    labelId="secondary-color-label"
                    id="secondary-color-select"
                    value={secondaryHue}
                    label={t('theme.secondaryColor', 'Secondary Color')}
                    onChange={(e) => setSecondaryHue(Number(e.target.value))}
                    sx={{
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--border-hover)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--primary)',
                      },
                      fontSize: '0.9rem',
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                      slotProps: {
                        paper: {
                          sx: {
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                          }
                        }
                      }
                    }}
                  >
                    {colorPresets.map((preset) => (
                      <MenuItem 
                        key={`secondary-${preset.hue}`} 
                        value={preset.hue}
                        sx={{
                          fontSize: '0.9rem',
                          py: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: 'var(--text-primary)',
                          '&:hover': {
                            background: 'var(--surface-hover)',
                          },
                          '&.Mui-selected': {
                            background: 'var(--primary-glow)',
                            color: 'var(--primary)',
                            fontWeight: 600,
                          }
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            background: preset.color,
                            flexShrink: 0
                          }} 
                        />
                        {preset.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </MenuMui>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton 
            onClick={handleDrawerClose} 
            sx={{ 
              color: '#ffffff !important',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1) !important',
              }
            }}
          >
            {muiTheme.direction === 'rtl' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.15) !important' }} />
        
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
                        color: isActive ? '#ffffff !important' : 'rgba(255, 255, 255, 0.7) !important',
                        background: isActive ? 'rgba(255, 255, 255, 0.18) !important' : 'transparent !important',
                        borderLeft: isActive && muiTheme.direction !== 'rtl' ? '3px solid #ffffff !important' : 'none',
                        borderRight: isActive && muiTheme.direction === 'rtl' ? '3px solid #ffffff !important' : 'none',
                        '&:hover': {
                          background: isActive ? 'rgba(255, 255, 255, 0.25) !important' : 'rgba(255, 255, 255, 0.1) !important',
                          color: '#ffffff !important',
                          '& .MuiListItemIcon-root': {
                            color: '#ffffff !important',
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
                          color: isActive ? '#ffffff !important' : 'rgba(255, 255, 255, 0.6) !important',
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
                        {
                          '& .MuiTypography-root': {
                            fontWeight: isActive ? 700 : 500,
                            fontFamily: 'var(--font-body), sans-serif',
                          }
                        }
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
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.15) !important', mb: 1 }} />
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
                      color: '#ff8888 !important',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1) !important',
                        color: '#ffaaaa !important',
                        '& .MuiListItemIcon-root': {
                          color: '#ffaaaa !important',
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
                        color: '#ff8888 !important',
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
                      {
                        '& .MuiTypography-root': {
                          fontWeight: 600,
                          fontFamily: 'var(--font-body), sans-serif',
                        }
                      }
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
