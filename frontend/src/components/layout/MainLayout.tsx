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
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Globe, 
  Sparkles, 
  Inbox, 
  Star, 
  Send, 
  FileText, 
  Mail, 
  Trash2, 
  AlertTriangle,
  Menu,
  ChevronLeft,
  ChevronRight
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
  borderRight: theme.direction === 'rtl' ? 'none' : '1px solid var(--border)',
  borderLeft: theme.direction === 'rtl' ? '1px solid var(--border)' : 'none',
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
  borderRight: theme.direction === 'rtl' ? 'none' : '1px solid var(--border)',
  borderLeft: theme.direction === 'rtl' ? '1px solid var(--border)' : 'none',
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
        ...(theme.direction === 'rtl' ? {
          marginRight: drawerWidth,
          marginLeft: 0,
        } : {
          marginLeft: drawerWidth,
          marginRight: 0,
        }),
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const section1Items = [
    { key: 'inbox', label: t('menu.inbox'), icon: <Inbox size={20} /> },
    { key: 'starred', label: t('menu.starred'), icon: <Star size={20} /> },
    { key: 'sendEmail', label: t('menu.sendEmail'), icon: <Send size={20} /> },
    { key: 'drafts', label: t('menu.drafts'), icon: <FileText size={20} /> },
  ];

  const section2Items = [
    { key: 'allMail', label: t('menu.allMail'), icon: <Mail size={20} /> },
    { key: 'trash', label: t('menu.trash'), icon: <Trash2 size={20} /> },
    { key: 'spam', label: t('menu.spam'), icon: <AlertTriangle size={20} /> },
  ];

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
        <List>
          {section1Items.map((item) => (
            <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    borderRadius: 'var(--radius-sm)',
                    mx: 1,
                    my: 0.5,
                    transition: 'all var(--transition-fast)',
                    color: 'var(--text-secondary)',
                    '&:hover': {
                      background: 'var(--surface-hover)',
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
                      color: 'var(--text-muted)',
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
          ))}
        </List>
        <Divider sx={{ borderColor: 'var(--border)' }} />
        <List>
          {section2Items.map((item) => (
            <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    borderRadius: 'var(--radius-sm)',
                    mx: 1,
                    my: 0.5,
                    transition: 'all var(--transition-fast)',
                    color: 'var(--text-secondary)',
                    '&:hover': {
                      background: 'var(--surface-hover)',
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
                      color: 'var(--text-muted)',
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
          ))}
        </List>
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 4 }, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          width: `calc(100% - ${drawerWidth}px)`,
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
