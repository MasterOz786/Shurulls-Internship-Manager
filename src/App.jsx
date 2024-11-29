import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Attendance from './pages/Attendance';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Meetings from './pages/Meetings';
import Evaluations from './pages/Evaluations';
import Login from './pages/Login';
import Register from './pages/Register old.jsx';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>  
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;