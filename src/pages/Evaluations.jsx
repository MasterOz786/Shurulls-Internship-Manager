import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  PlusIcon, 
  ChartBarIcon,
  StarIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

function Evaluations() {
  const { data: evaluations } = useQuery(['evaluations'], async () => {
    const response = await axios.get('/api/evaluations');
    return response.data;
  });

  const mockEvaluations = [
    {
      id: 1,
      period: 'September 2023',
      overallScore: 8.5,
      criteria: [
        { name: 'Technical Skills', score: 8 },
        { name: 'Communication', score: 9 },
        { name: 'Problem Solving', score: 8.5 }
      ],
      feedback: 'Excellent progress in technical skills and communication. Keep up the good work!'
    },
    {
      id: 2,
      period: 'August 2023',
      overallScore: 7.8,
      criteria: [
        { name: 'Technical Skills', score: 7 },
        { name: 'Communication', score: 8 },
        { name: 'Problem Solving', score: 8.5 }
      ],
      feedback: 'Good improvement in problem-solving abilities. Focus more on technical documentation.'
    }
  ];

  const renderStars = (score) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(score / 2)
            ? 'text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Evaluations</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          New Evaluation
        </motion.button>
      </div>

      <div className="space-y-6">
        {mockEvaluations.map((evaluation, index) => (
          <motion.div
            key={evaluation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary-500" />
                  {evaluation.period}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">Overall Score:</span>
                  <span className="text-lg font-semibold text-primary-600">
                    {evaluation.overallScore}/10
                  </span>
                </div>
              </div>
              <div className="flex">{renderStars(evaluation.overallScore)}</div>
            </div>

            <div className="space-y-4">
              {evaluation.criteria.map((criterion, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {criterion.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {criterion.score}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(criterion.score / 10) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-primary-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Feedback</h4>
              <p className="text-gray-600">{evaluation.feedback}</p>
            </div>

            <div className="mt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                View Full Report
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Evaluations;