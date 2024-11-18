import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, TrendingUp, Star } from 'lucide-react';
import { format } from 'date-fns';
import api from '../../lib/axios';
import Card from '../../components/common/Card';
import { PerformanceMetric } from '../../types';
import PerformanceChart from './PerformanceChart';

export default function PerformanceEvaluation() {
  const { data: metrics, isLoading } = useQuery<PerformanceMetric[]>({
    queryKey: ['performance-metrics'],
    queryFn: () => api.get('/performance').then((res) => res.data),
  });

  if (isLoading) {
    return <div>Loading performance metrics...</div>;
  }

  const latestMetric = metrics?.[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Performance Evaluation</h1>
      </div>

      {latestMetric && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-indigo-50">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-indigo-600">Overall Score</p>
                  <p className="text-2xl font-semibold text-indigo-900">
                    {latestMetric.overallScore}/5
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-green-50">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Productivity</p>
                  <p className="text-2xl font-semibold text-green-900">
                    {latestMetric.metrics.productivity}/5
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-blue-50">
              <div className="flex items-center">
                <BarChart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600">Latest Evaluation</p>
                  <p className="text-sm font-medium text-blue-900">
                    {format(new Date(latestMetric.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Trends</h2>
            <PerformanceChart metrics={metrics} />
          </Card>

          <div className="space-y-4">
            {metrics?.map((metric) => (
              <Card key={metric.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Evaluation for {format(new Date(metric.date), 'MMMM d, yyyy')}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{metric.feedback}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Score: {metric.overallScore}/5
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(metric.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-medium text-gray-500 capitalize">
                        {key}
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {value}/5
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}