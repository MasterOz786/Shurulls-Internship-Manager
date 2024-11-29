import React from 'react';
import { motion } from 'framer-motion';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="card w-full max-w-md text-center space-y-8"
      >
        <div className="flex justify-center">
          <ShieldExclamationIcon className="h-24 w-24 text-red-500" />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 mb-6">
            You do not have permission to access this page. 
            Please contact your administrator if you believe this is an error.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-full btn btn-primary"
          >
            Return to Dashboard
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.removeItem('authToken');
              navigate('/login');
            }}
            className="w-full btn btn-secondary"
          >
            Log Out
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Unauthorized;