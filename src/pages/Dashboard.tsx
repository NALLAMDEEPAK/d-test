import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { problemsAPI } from '../services/api';

const Dashboard: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsResponse, problemsResponse] = await Promise.all([
          problemsAPI.getTopics(),
          problemsAPI.getAll()
        ]);

        if (topicsResponse.data.success) {
          setTopics(topicsResponse.data.topics);
        }

        if (problemsResponse.data.success) {
          setProblems(problemsResponse.data.problems);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTopics = topics.filter(topic =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner className="h-64" />;
  }

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const topicProblems = problems.filter(p => p.topics.includes(topic));
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

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No topics found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search term
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;