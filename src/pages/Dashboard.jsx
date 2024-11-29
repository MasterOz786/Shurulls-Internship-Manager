import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Dashboard() {
  const { data: stats } = useQuery(['dashboard-stats'], async () => {
    const response = await axios.get('/api/dashboard/stats');
    return response.data;
  });

  const mockData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 3 },
    { name: 'Wed', tasks: 5 },
    { name: 'Thu', tasks: 2 },
    { name: 'Fri', tasks: 6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Tasks</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm opacity-80">Active tasks</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-3xl font-bold">92%</p>
          <p className="text-sm opacity-80">This month</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm opacity-80">In progress</p>
        </motion.div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Weekly Task Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;