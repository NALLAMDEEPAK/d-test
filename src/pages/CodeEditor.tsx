import React from 'react';
import { Code2 } from 'lucide-react';
import CodeEditorComponent from '../components/dsa/CodeEditor';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

const CodeEditor: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Code2 className="mr-3 h-8 w-8" />
            Code Editor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Practice coding with our interactive editor
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Problem Description */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Practice Problem
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Two Sum
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Example:</h4>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm">
                  <div className="mb-1">
                    <strong>Input:</strong> nums = [2,7,11,15], target = 9
                  </div>
                  <div className="mb-1">
                    <strong>Output:</strong> [0,1]
                  </div>
                  <div>
                    <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Constraints:</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• 2 ≤ nums.length ≤ 10⁴</li>
                  <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                  <li>• -10⁹ ≤ target ≤ 10⁹</li>
                  <li>• Only one valid answer exists</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Code Editor */}
        <div className="lg:col-span-2">
          <CodeEditorComponent
            initialCode={`function twoSum(nums, target) {
    // Write your solution here
    // Hint: Consider using a hash map for O(n) solution
    
    return [];
}`}
            language="javascript"
            className="h-full"
          />
        </div>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            💡 Coding Tips
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Approach 1: Brute Force</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Use nested loops to check all pairs. Time complexity: O(n²), Space complexity: O(1)
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Approach 2: Hash Map</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Use a hash map to store complements. Time complexity: O(n), Space complexity: O(n)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeEditor;