import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Avatar,
  Stack,
  Alert,
  Skeleton,
  IconButton,
  Grid,
  Tooltip
} from '@mui/material';
import { 
  Users as UsersIcon, 
  RefreshCw, 
  Mail, 
  Calendar, 
  Shield, 
  ShieldAlert,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import type { User } from '../context/AuthContext';

export default function Users() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  // State Management
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination State
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users');
      if (response && response.success && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message || t('users.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination Handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Helper to extract initials for user avatar
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Format creation date nicely
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // Calculate quick stats
  const totalCount = users.length;
  const adminCount = users.filter(u => u.role?.toLowerCase() === 'admin').length;
  const standardCount = users.filter(u => u.role?.toLowerCase() !== 'admin').length;

  return (
    <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      {/* Premium Header Title Block */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" component="h1" className="gradient-text" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1 }}>
            {t('users.title')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            {t('users.subtitle')}
          </Typography>
        </Box>
        <Tooltip title={isRtl ? 'רענן רשימה' : 'Refresh List'}>
          <IconButton 
            onClick={fetchUsers} 
            disabled={loading}
            sx={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-secondary)',
              transition: 'all var(--transition-fast)',
              '&:hover': {
                background: 'var(--surface-hover)',
                color: 'var(--primary)',
                transform: 'rotate(180deg)'
              }
            }}
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Error State Banner */}
      {error && (
        <Alert 
          severity="error" 
          variant="outlined"
          sx={{ 
            borderRadius: 'var(--radius-md)',
            color: '#ef4444',
            borderColor: 'rgba(239, 68, 68, 0.4)',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            '& .MuiAlert-icon': {
              color: '#ef4444'
            }
          }}
        >
          {error}
        </Alert>
      )}

      {/* Dashboard Quick Metrics Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card 
            className="glass glass-interactive" 
            sx={{ 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box 
                className="metric-icon-wrapper" 
                sx={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px var(--primary-glow)'
                }}
              >
                <UsersIcon size={24} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>
                  {t('users.total')}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {loading ? <Skeleton width={40} /> : totalCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card 
            className="glass glass-interactive" 
            sx={{ 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border)',
              background: 'var(--surface)'
            }}
          >
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box 
                className="metric-icon-wrapper" 
                sx={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShieldAlert size={24} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>
                  {isRtl ? 'מנהלי מערכת' : 'Administrators'}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ef4444' }}>
                  {loading ? <Skeleton width={40} /> : adminCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card 
            className="glass glass-interactive" 
            sx={{ 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border)',
              background: 'var(--surface)'
            }}
          >
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box 
                className="metric-icon-wrapper" 
                sx={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'var(--primary-glow)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Shield size={24} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>
                  {isRtl ? 'משתמשים רגילים' : 'Standard Users'}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--primary)' }}>
                  {loading ? <Skeleton width={40} /> : standardCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Table Content Block */}
      <Paper 
        className="glass" 
        sx={{ 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          overflow: 'hidden',
          width: '100%',
          boxShadow: 'var(--glass-shadow)'
        }}
      >
        <TableContainer sx={{ maxHeight: 600, overflowX: 'auto' }}>
          <Table stickyHeader aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  borderBottom: '1px solid var(--border)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {t('users.table.name')}
                </TableCell>
                <TableCell sx={{ 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  borderBottom: '1px solid var(--border)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {t('users.table.email')}
                </TableCell>
                <TableCell sx={{ 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  borderBottom: '1px solid var(--border)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {t('users.table.role')}
                </TableCell>
                <TableCell sx={{ 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  borderBottom: '1px solid var(--border)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {t('users.table.status')}
                </TableCell>
                <TableCell sx={{ 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  borderBottom: '1px solid var(--border)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {t('users.table.created')}
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {loading ? (
                // Beautiful Skeleton Loading State rows to prevent UI layout shift
                Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width={120} height={20} />
                      </Stack>
                    </TableCell>
                    <TableCell><Skeleton variant="text" width={180} height={20} /></TableCell>
                    <TableCell><Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: 'var(--radius-full)' }} /></TableCell>
                    <TableCell><Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 'var(--radius-full)' }} /></TableCell>
                    <TableCell><Skeleton variant="text" width={100} height={20} /></TableCell>
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                // Elegant empty state row
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ p: 2, borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                        <UsersIcon size={40} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {t('users.noUsers')}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : (
                // Main paginated users list
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    const isAdmin = user.role?.toLowerCase() === 'admin';
                    const isActive = user.status?.toLowerCase() !== 'inactive';
                    
                    return (
                      <TableRow 
                        key={user._id}
                        className="glass-interactive"
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          transition: 'all var(--transition-fast)',
                          borderBottom: '1px solid var(--border)',
                          '&:hover': {
                            backgroundColor: 'var(--surface-hover)'
                          }
                        }}
                      >
                        {/* Name Cell with initials Avatar */}
                        <TableCell sx={{ color: 'var(--text-primary)' }}>
                          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Avatar
                              sx={{ 
                                width: 36, 
                                height: 36, 
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                background: isAdmin 
                                  ? 'linear-gradient(135deg, #ef4444 0%, #db2777 100%)' 
                                  : 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                                color: '#fff',
                                boxShadow: isAdmin 
                                  ? '0 2px 10px rgba(239, 68, 68, 0.2)'
                                  : '0 2px 10px var(--primary-glow)'
                              }}
                            >
                              {getInitials(user.fullName)}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {user.fullName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* Email Cell with Icon */}
                        <TableCell sx={{ color: 'var(--text-secondary)' }}>
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <Mail size={14} className="text-muted" style={{ opacity: 0.6 }} />
                            <Typography variant="body2">{user.email}</Typography>
                          </Stack>
                        </TableCell>

                        {/* Role Cell with Custom Tag */}
                        <TableCell>
                          <Box 
                            className="tag"
                            sx={{ 
                              px: 1.5, 
                              py: 0.5, 
                              borderRadius: '10px',
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.75,
                              background: isAdmin ? 'rgba(239, 68, 68, 0.1)' : 'rgba(124, 58, 237, 0.1)',
                              color: isAdmin ? '#ef4444' : 'var(--primary)',
                              border: isAdmin ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(124, 58, 237, 0.2)',
                              boxShadow: isAdmin ? '0 0 8px rgba(239, 68, 68, 0.05)' : '0 0 8px var(--primary-glow)'
                            }}
                          >
                            {isAdmin ? <ShieldAlert size={10} /> : <Shield size={10} />}
                            {user.role || 'user'}
                          </Box>
                        </TableCell>

                        {/* Status Cell */}
                        <TableCell>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.75,
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textTransform: 'capitalize',
                              color: isActive ? 'var(--success)' : 'var(--text-muted)',
                              background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'var(--border)',
                              border: isActive ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border)'
                            }}
                          >
                            {isActive ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                            {user.status || 'active'}
                          </Box>
                        </TableCell>

                        {/* Created At Cell */}
                        <TableCell sx={{ color: 'var(--text-secondary)' }}>
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <Calendar size={14} style={{ opacity: 0.6 }} />
                            <Typography variant="body2">{formatDate(user.createdAt)}</Typography>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Elegant Pagination Footer */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={isRtl ? 'שורות לעמוד:' : 'Rows per page:'}
          sx={{
            borderTop: '1px solid var(--border)',
            color: 'var(--text-primary)',
            background: 'var(--bg-secondary)',
            '& .MuiTablePagination-actions': {
              color: 'var(--primary)'
            },
            '& .MuiTablePagination-select': {
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              px: 1
            }
          }}
        />
      </Paper>
    </Box>
  );
}
