import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Clock, UserCheck } from 'lucide-react';
import api from '../../lib/axios';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Attendance } from '../../types';
import { useAttendance } from '../../hooks/useAttendance';
import AttendanceStats from './AttendanceStats';

const statusColors = {
  present: 'bg-green-100 text-green-800',
  late: 'bg-yellow-100 text-yellow-800',
  absent: 'bg-red-100 text-red-800',
  half_day: 'bg-orange-100 text-orange-800',
};

export default function AttendanceTracker() {
  const { data: attendance, isLoading } = useQuery<Attendance[]>({
    queryKey: ['attendance'],
    queryFn: () => api.get('/attendance').then((res) => res.data),
  });

  const { checkIn, checkOut } = useAttendance();
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance?.find(record => record.date === today);

  if (isLoading) {
    return <div>Loading attendance records...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Attendance</h1>
        {!todayAttendance?.checkIn ? (
          <Button onClick={() => checkIn.mutate()}>
            <Clock className="h-4 w-4 mr-2" />
            Check In
          </Button>
        ) : !todayAttendance?.checkOut ? (
          <Button onClick={() => checkOut.mutate()} variant="secondary">
            <Clock className="h-4 w-4 mr-2" />
            Check Out
          </Button>
        ) : null}
      </div>

      <AttendanceStats />

      <div className="space-y-4">
        {attendance?.map((record) => (
          <Card key={record.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UserCheck className="h-6 w-6 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {format(new Date(record.date), 'MMMM d, yyyy')}
                </div>
                <div className="text-sm text-gray-500">
                  Check in: {format(new Date(`${record.date}T${record.checkIn}`), 'h:mm a')}
                  {record.checkOut && ` - Check out: ${format(new Date(`${record.date}T${record.checkOut}`), 'h:mm a')}`}
                </div>
                {record.notes && (
                  <div className="text-sm text-gray-500 mt-1">
                    Note: {record.notes}
                  </div>
                )}
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
              {record.status.replace('_', ' ')}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}