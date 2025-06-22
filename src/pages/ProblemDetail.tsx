import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Youtube, Code2, FileText } from 'lucide-react';
import CodeEditor from '../components/dsa/CodeEditor';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { mockProblems } from '../data/mockData';

const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');
  const [problem, setProblem] = useState(mockProblems.find(p => p.id === id));

  useEffect(() => {
    setProblem(mockProblems.find(p => p.id === id));
  }, [id]);

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Problem not found</h2>
        <Link to="/">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const difficultyVariant = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  }[problem.difficulty] as 'success' | 'warning' | 'danger';

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="ghost" icon={<ArrowLeft size={16} />}>
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{problem.title}</h1>
        <Badge variant={difficultyVariant} className="ml-4">
          {problem.difficulty}
        </Badge>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 space-y-6">
          <Card>
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('problem')}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'problem'
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <FileText size={16} className="mr-2" />
                  Problem
                </button>
                <button
                  onClick={() => setActiveTab('solution')}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === 'solution'
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Code2 size={16} className="mr-2" />
                  Solution
                </button>
              </div>
            </div>
            <CardContent className="p-6">
              {activeTab === 'problem' ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {problem.topics.map((topic) => (
                      <Badge key={topic} variant="primary" size="sm">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-xl font-semibold mb-4">Problem Statement</h2>
                    <p>{problem.description}</p>
                    
                    {problem.examples && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Examples</h3>
                        <div className="space-y-4">
                          {problem.examples.map((example, index) => (
                            <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <div className="mb-2">
                                <strong>Input:</strong> {example.input}
                              </div>
                              <div className="mb-2">
                                <strong>Output:</strong> {example.output}
                              </div>
                              {example.explanation && (
                                <div>
                                  <strong>Explanation:</strong> {example.explanation}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {problem.constraints && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Constraints</h3>
                        <ul className="list-disc list-inside">
                          {problem.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {problem.youtubeUrl && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Video Explanation</h3>
                      <a
                        href={problem.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Youtube size={20} className="mr-2" />
                        Watch tutorial on YouTube
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Solution</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{problem.solutionExplanation || "Detailed explanation of the solution approach."}</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Solution Code</h3>
                    <div className="bg-gray-900 text-gray-50 font-mono text-sm p-4 rounded-lg overflow-auto">
                      <pre>{problem.solutionCode || "// Solution code will be shown here"}</pre>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Complexity Analysis</h3>
                    <div className="space-y-2">
                      <p><strong>Time Complexity:</strong> {problem.timeComplexity || "O(n)"}</p>
                      <p><strong>Space Complexity:</strong> {problem.spaceComplexity || "O(1)"}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/2">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Code Editor</h2>
            <CodeEditor 
              initialCode={problem.starterCode || `// Write your solution for ${problem.title} here\n\n`}
              language="javascript"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;