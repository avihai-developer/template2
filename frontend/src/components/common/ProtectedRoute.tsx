import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Subtle ambient glows for visual consistency */}
        <div className="ambient-glow glow-1" style={{ width: '30vw', height: '30vw', opacity: 0.15 }}></div>
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            color: 'var(--primary)',
            filter: 'drop-shadow(0 0 10px var(--primary-glow))',
          }}
        />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
