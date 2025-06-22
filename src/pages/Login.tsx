import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Code2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import GoogleSignIn from '../components/auth/GoogleSignIn';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Handle OAuth callback errors
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const errorMessage = urlParams.get('message');
    if (errorMessage) {
      setError(decodeURIComponent(errorMessage));
    }
  }, [location]);

  const handleGoogleSuccess = () => {
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  const handleGoogleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full shadow-xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full">
                <Code2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to CodePro</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in to access your coding interview platform
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <GoogleSignIn
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Secure OAuth Authentication
                </span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                🚀 What you'll get access to:
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Interactive code editor with multiple languages</li>
                <li>• Mock interview sessions with video chat</li>
                <li>• Send email invitations to practice partners</li>
                <li>• Track your progress and interview history</li>
              </ul>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            By signing in, you agree to our{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;