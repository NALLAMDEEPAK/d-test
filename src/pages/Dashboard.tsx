import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockProblems } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Extract unique topics from mock problems
  const topics = Array.from(new Set(mockProblems.flatMap(problem => problem.topics)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DSA Topics</h1>
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search topics..."
            className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => {
          const topicProblems = mockProblems.filter(p => p.topics.includes(topic));
          const easy = topicProblems.filter(p => p.difficulty === 'Easy').length;
          const medium = topicProblems.filter(p => p.difficulty === 'Medium').length;
          const hard = topicProblems.filter(p => p.difficulty === 'Hard').length;

          return (
            <Link key={topic} to={`/topic/${encodeURIComponent(topic)}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{topic}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">Easy: {easy}</span>
                      <span className="text-yellow-600 dark:text-yellow-400">Medium: {medium}</span>
                      <span className="text-red-600 dark:text-red-400">Hard: {hard}</span>
                    </div>
                    <div className="flex gap-1 h-1">
                      <div className="bg-green-500 rounded-l" style={{ width: `${(easy / topicProblems.length) * 100}%` }}></div>
                      <div className="bg-yellow-500" style={{ width: `${(medium / topicProblems.length) * 100}%` }}></div>
                      <div className="bg-red-500 rounded-r" style={{ width: `${(hard / topicProblems.length) * 100}%` }}></div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {topicProblems.length} problems
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;