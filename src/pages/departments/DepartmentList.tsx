import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Department } from '../../types';

export default function DepartmentList() {
  const { data: departments, isLoading } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: () => api.get('/departments').then((res) => res.data),
  });

  if (isLoading) {
    return <div>Loading departments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments?.map((department) => (
          <Card key={department.id}>
            <h3 className="text-lg font-medium text-gray-900">{department.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{department.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}