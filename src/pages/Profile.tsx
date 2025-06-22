import React from 'react';
import { User, Mail, Calendar, Award, Clock, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                  <User className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Jane Smith</h2>
                <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-1" />
                  jane.smith@example.com
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Member since April 2023
                </p>
                <Button variant="outline" className="mt-6 w-full">
                  Edit Profile
                </Button>
              </div>
              
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Algorithm Master</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Solved 50 problems</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Consistent Coder</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">7-day streak</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3">
                      <BarChart2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Rising Star</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed 5 mock interviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Progress</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Problems Solved</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">42/200</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mock Interviews</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">5/10</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
                    <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">Easy</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">25/75</p>
                    <div className="w-full bg-indigo-200 dark:bg-indigo-700 rounded-full h-1.5 mt-2">
                      <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
                    <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">Medium</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">15/85</p>
                    <div className="w-full bg-amber-200 dark:bg-amber-700 rounded-full h-1.5 mt-2">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">Hard</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2/40</p>
                    <div className="w-full bg-red-200 dark:bg-red-700 rounded-full h-1.5 mt-2">
                      <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-indigo-500 pl-4 py-1">
                  <p className="text-gray-900 dark:text-white font-medium">Solved "Two Sum" Problem</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">2 hours ago</p>
                </div>
                <div className="border-l-2 border-emerald-500 pl-4 py-1">
                  <p className="text-gray-900 dark:text-white font-medium">Completed Mock Interview with Alex</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Yesterday</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-4 py-1">
                  <p className="text-gray-900 dark:text-white font-medium">Started "Binary Search Tree" Challenge</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">2 days ago</p>
                </div>
                <div className="border-l-2 border-indigo-500 pl-4 py-1">
                  <p className="text-gray-900 dark:text-white font-medium">Solved "Valid Parentheses" Problem</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;