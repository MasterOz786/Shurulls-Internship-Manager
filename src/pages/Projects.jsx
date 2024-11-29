import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  PlusIcon, 
  UserGroupIcon, 
  CalendarIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

function Projects() {
  const { data: projects } = useQuery(['projects'], async () => {
    const response = await axios.get('/api/projects');
    return response.data;
  });

  const mockProjects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      status: 'in-progress',
      progress: 65,
      team: 4,
      startDate: '2023-08-15',
      endDate: '2023-10-30',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Mobile App Development',
      status: 'planning',
      progress: 20,
      team: 3,
      startDate: '2023-09-01',
      endDate: '2023-11-15',
      technologies: ['React Native', 'Firebase']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          New Project
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                project.status === 'completed' ? 'bg-green-100 text-green-600' :
                project.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <UserGroupIcon className="h-4 w-4" />
                  Team: {project.team}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {project.startDate} - {project.endDate}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-primary-600 h-2 rounded-full"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;