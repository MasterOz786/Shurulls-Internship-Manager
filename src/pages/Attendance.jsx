import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const { data: attendance } = useQuery(['attendance'], async () => {
    const response = await axios.get('/api/attendance');
    return response.data;
  });

  const mockAttendance = [
    { date: '2023-09-01', status: 'present', checkIn: '09:00', checkOut: '17:00' },
    { date: '2023-09-02', status: 'present', checkIn: '08:55', checkOut: '17:30' },
    { date: '2023-09-03', status: 'absent' },
    { date: '2023-09-04', status: 'present', checkIn: '09:15', checkOut: '17:00' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="btn bg-gray-100 hover:bg-gray-200">
              Previous
            </button>
            <h2 className="text-lg font-semibold">September 2023</h2>
            <button className="btn bg-gray-100 hover:bg-gray-200">
              Next
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Mark Attendance
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAttendance.map((record, index) => (
                <motion.tr
                  key={record.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      {record.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.status === 'present' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.checkIn && (
                      <div className="flex items-center text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {record.checkIn}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.checkOut && (
                      <div className="flex items-center text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {record.checkOut}
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;