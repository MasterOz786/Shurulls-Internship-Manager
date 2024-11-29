import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ProjectSuggestions({ onSelectProject }) {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentInterest, setCurrentInterest] = useState('');

  const suggestionsMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/ai/project-suggestions', {
        skills,
        interests
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Project suggestions generated!');
    },
    onError: (error) => {
      toast.error('Failed to generate suggestions');
    }
  });

  const handleAddSkill = () => {
    if (currentSkill.trim()) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleAddInterest = () => {
    if (currentInterest.trim()) {
      setInterests([...interests, currentInterest.trim()]);
      setCurrentInterest('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                className="ml-2 text-primary-500 hover:text-primary-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            className="input flex-1"
            placeholder="Add a skill"
          />
          <button
            onClick={handleAddSkill}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Interests</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
            >
              {interest}
              <button
                onClick={() => setInterests(interests.filter((_, i) => i !== index))}
                className="ml-2 text-primary-500 hover:text-primary-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={currentInterest}
            onChange={(e) => setCurrentInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
            className="input flex-1"
            placeholder="Add an interest"
          />
          <button
            onClick={handleAddInterest}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => suggestionsMutation.mutate()}
        disabled={suggestionsMutation.isLoading || skills.length === 0}
        className="w-full btn btn-primary"
      >
        {suggestionsMutation.isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          'Generate Project Suggestions'
        )}
      </motion.button>

      {suggestionsMutation.data && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Suggested Projects</h3>
          <div className="prose prose-sm max-w-none">
            {suggestionsMutation.data.data}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectSuggestions;