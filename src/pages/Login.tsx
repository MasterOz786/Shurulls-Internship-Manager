import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Card from '../components/common/Card';
import { ClipboardList } from 'lucide-react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ClipboardList className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Internship Manager
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default Login;