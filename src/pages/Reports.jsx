import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  PlusIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

function Reports() {
  const [filter, setFilter] = useState('all');

  const { data: reports } = useQuery(['reports'], async () => {
    const response = await axios.get('/api/reports');
    return response.data;
  });

  const mockReports = [
    {
      id: 1,
      type: 'daily',
      date: '2023-09-15',
      status: 'submitted',
      activities: [
        { description: 'Implemented user authentication', hoursSpent: 4 },
        { description: 'Fixed UI bugs', hoursSpent: 2 }
      ]
    },
    {
      id: 2,
      type: 'weekly',
      date: '2023-09-10',
      status: 'reviewed',
      activities: [
        { description: 'Database optimization', hoursSpent: 8 },
        { description: 'Code review', hoursSpent: 4 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          New Report
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6">
        {['all', 'daily', 'weekly', 'monthly'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full capitalize ${
              filter === type
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DocumentTextIcon className="h-5 w-5 text-primary-500" />
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <ClockIcon className="h-4 w-4 inline mr-1" />
                  {report.date}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                report.status === 'reviewed' ? 'bg-green-100 text-green-600' :
                report.status === 'submitted' ? 'bg-blue-100 text-blue-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {report.status}
              </span>
            </div>

            <div className="space-y-3">
              {report.activities.map((activity, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{activity.description}</span>
                  <span className="text-gray-500">{activity.hoursSpent}h</span>
                </div>
              ))}
            </div>

            {report.status === 'draft' && (
              <div className="mt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                >
                  Submit Report
                </motion.button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Reports;