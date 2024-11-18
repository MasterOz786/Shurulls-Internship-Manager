import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Resource } from '../types';
import api from '../lib/axios';
import { useToastStore } from './useToast';

export function useResourceManagement() {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const assignResource = useMutation({
    mutationFn: async ({ resourceId, userId }: { resourceId: string; userId: string }) => {
      const response = await api.post(`/resources/${resourceId}/assign`, { userId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      addToast({ type: 'success', message: 'Resource assigned successfully' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to assign resource' });
    },
  });

  const releaseResource = useMutation({
    mutationFn: async (resourceId: string) => {
      const response = await api.post(`/resources/${resourceId}/release`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      addToast({ type: 'success', message: 'Resource released successfully' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to release resource' });
    },
  });

  return {
    assignResource,
    releaseResource,
  };
}