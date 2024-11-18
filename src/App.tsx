import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './components/Layout/DashboardLayout';
import Login from './pages/Login';
import DepartmentList from './pages/departments/DepartmentList';
import ResourceManagement from './pages/resources/ResourceManagement';
import TaskList from './pages/tasks/TaskList';
import AttendanceTracker from './pages/attendance/AttendanceTracker';
import Toast from './components/common/Toast';
import { ROUTES } from './config/constants';
import { useAuth } from './hooks/useAuth';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path={ROUTES.DASHBOARD} element={<DepartmentList />} />
            <Route path={ROUTES.TASKS} element={<TaskList />} />
            <Route path={ROUTES.RESOURCES} element={<ResourceManagement />} />
            <Route path={ROUTES.ATTENDANCE} element={<AttendanceTracker />} />
          </Route>
          
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;