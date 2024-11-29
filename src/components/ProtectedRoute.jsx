import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Validate token with backend
        const response = await axios.get('/api/validate-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // If validation successful
        setIsAuthenticated(true);
        setUserRole(response.data.user.role);
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-primary-500"></div>
      </div>
    );
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page or show error
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and role is allowed, render children or nested routes
  return children ? children : <Outlet />;
}

export default ProtectedRoute;