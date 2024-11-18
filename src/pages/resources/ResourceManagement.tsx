import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Monitor, Laptop, CreditCard, Building2 } from 'lucide-react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Resource } from '../../types';

const resourceIcons = {
  workstation: Monitor,
  laptop: Laptop,
  id_card: CreditCard,
  auditorium: Building2,
};

export default function ResourceManagement() {
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['resources'],
    queryFn: () => api.get('/resources').then((res) => res.data),
  });

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Resources</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources?.map((resource) => {
          const Icon = resourceIcons[resource.type];
          return (
            <Card key={resource.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Icon className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{resource.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {resource.details.deskNumber && `Desk: ${resource.details.deskNumber}`}
                  {resource.details.boxNumber && ` Box: ${resource.details.boxNumber}`}
                </p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${resource.status === 'available' ? 'bg-green-100 text-green-800' :
                    resource.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                    {resource.status}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}