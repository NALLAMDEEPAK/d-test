import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Problem } from '../../types';

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const difficultyVariant = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  }[problem.difficulty] as 'success' | 'warning' | 'danger';

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={difficultyVariant} size="sm">
            {problem.difficulty}
          </Badge>
          <div className="flex space-x-1">
            {problem.youtubeUrl && (
              <a
                href={problem.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                aria-label="YouTube tutorial"
              >
                <Youtube size={18} />
              </a>
            )}
            {problem.externalUrl && (
              <a
                href={problem.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="External resource"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {problem.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {problem.topics.map((topic) => (
            <Badge key={topic} variant="primary" size="sm">
              {topic}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {problem.description}
        </p>
      </CardContent>
      <CardFooter>
        <Link to={`/problem/${problem.id}`} className="w-full">
          <Button variant="primary" className="w-full">
            Solve Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;