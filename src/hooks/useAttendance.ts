import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import { useToastStore } from './useToast';

export function useAttendance() {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const checkIn = useMutation({
    mutationFn: async () => {
      const response = await api.post('/attendance/check-in');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      addToast({ type: 'success', message: 'Checked in successfully' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to check in' });
    },
  });

  const checkOut = useMutation({
    mutationFn: async () => {
      const response = await api.post('/attendance/check-out');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      addToast({ type: 'success', message: 'Checked out successfully' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to check out' });
    },
  });

  return {
    checkIn,
    checkOut,
  };
}