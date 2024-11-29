import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PlusIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

function Tasks() {
  const [filter, setFilter] = useState('all');

  const { data: tasks, isLoading } = useQuery(['tasks'], async () => {
    const response = await axios.get('/api/tasks');
    return response.data;
  });

  const mockTasks = [
    { id: 1, title: 'Complete Project Documentation', status: 'pending', priority: 'high', dueDate: '2023-09-20' },
    { id: 2, title: 'Review Code Changes', status: 'in-progress', priority: 'medium', dueDate: '2023-09-22' },
    { id: 3, title: 'Update Test Cases', status: 'completed', priority: 'low', dueDate: '2023-09-25' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          New Task
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6">
        {['all', 'pending', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full capitalize ${
              filter === status
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {mockTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      Due: {task.dueDate}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.priority === 'high' ? 'bg-red-100 text-red-600' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    task.status === 'completed' ? 'bg-green-100 text-green-600' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {task.status}
                  </span>
                  {task.status !== 'completed' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-green-500 hover:text-green-600"
                    >
                      <CheckCircleIcon className="h-6 w-6" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Tasks;