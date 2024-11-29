import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Attendance', href: '/attendance', icon: UserGroupIcon },
  { name: 'Projects', href: '/projects', icon: ChartBarIcon },
  { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
  { name: 'Meetings', href: '/meetings', icon: VideoCameraIcon },
  { name: 'Evaluations', href: '/evaluations', icon: CalendarIcon },
];

function Sidebar({ open, setOpen }) {
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      <motion.div
        initial={{ x: -280 }}
        animate={{ x: open ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white border-r border-gray-200 pt-5 pb-4 transform lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between px-4">
          <div className="flex-shrink-0 flex items-center px-4">
            <h1 className="text-xl font-bold text-primary-600">IMS</h1>
          </div>
          <button
            className="lg:hidden rounded-md p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
}

export default Sidebar;