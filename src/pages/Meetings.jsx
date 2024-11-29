import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  PlusIcon, 
  VideoCameraIcon,
  UserGroupIcon,
  ClockIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

function Meetings() {
  const { data: meetings } = useQuery(['meetings'], async () => {
    const response = await axios.get('/api/meetings');
    return response.data;
  });

  const mockMeetings = [
    {
      id: 1,
      title: 'Weekly Progress Review',
      date: '2023-09-20T10:00:00',
      duration: 60,
      participants: 5,
      status: 'scheduled',
      meetingLink: 'https://meet.example.com/abc123'
    },
    {
      id: 2,
      title: 'Project Planning Session',
      date: '2023-09-22T14:30:00',
      duration: 90,
      participants: 4,
      status: 'scheduled',
      meetingLink: 'https://meet.example.com/xyz789'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Schedule Meeting
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockMeetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <VideoCameraIcon className="h-5 w-5 text-primary-500" />
                  {meeting.title}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(meeting.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {meeting.duration} minutes
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <UserGroupIcon className="h-4 w-4" />
                    {meeting.participants} participants
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                meeting.status === 'completed' ? 'bg-green-100 text-green-600' :
                meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                'bg-red-100 text-red-600'
              }`}>
                {meeting.status}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <motion.a
                href={meeting.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary flex items-center gap-2"
              >
                <VideoCameraIcon className="h-5 w-5" />
                Join Meeting
              </motion.a>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Meetings;