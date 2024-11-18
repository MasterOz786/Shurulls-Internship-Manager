import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Clock, UserCheck, UserX } from 'lucide-react';
import api from '../../lib/axios';
import Card from '../../components/common/Card';
import { AttendanceStats } from '../../types';

export default function AttendanceStats() {
  const { data: stats, isLoading } = useQuery<AttendanceStats>({
    queryKey: ['attendance-stats'],
    queryFn: () => api.get('/attendance/stats').then((res) => res.data),
  });

  if (isLoading || !stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-green-50">
        <div className="flex items-center">
          <UserCheck className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-green-600">Present Days</p>
            <p className="text-2xl font-semibold text-green-900">{stats.presentDays}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-yellow-50">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-yellow-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-yellow-600">Late Days</p>
            <p className="text-2xl font-semibold text-yellow-900">{stats.lateDays}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-red-50">
        <div className="flex items-center">
          <UserX className="h-8 w-8 text-red-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-red-600">Absent Days</p>
            <p className="text-2xl font-semibold text-red-900">{stats.absentDays}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-50">
        <div className="flex items-center">
          <BarChart className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-blue-600">Punctuality Rate</p>
            <p className="text-2xl font-semibold text-blue-900">
              {stats.punctualityRate}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}