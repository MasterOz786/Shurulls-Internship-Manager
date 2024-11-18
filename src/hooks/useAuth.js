import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../config/constants';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, setAuth, logout } = useAuthStore();

  const handleLogin = (userData, authToken) => {
    setAuth(userData, authToken);
    navigate(ROUTES.DASHBOARD);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';
  const isSupervisor = user?.role === 'supervisor';
  const isInternee = user?.role === 'internee';

  return {
    user,
    isAuthenticated,
    isAdmin,
    isSupervisor,
    isInternee,
    login: handleLogin,
    logout: handleLogout
  };
};