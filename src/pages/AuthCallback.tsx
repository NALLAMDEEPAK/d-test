import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Card, CardContent } from '../components/ui/Card';
import { CheckCircle, XCircle } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        if (!token || !userParam) {
          throw new Error('Missing authentication data');
        }

        const userData = JSON.parse(decodeURIComponent(userParam));
        
        // Store auth data
        login(token, userData);
        
        setStatus('success');
        setMessage('Successfully signed in! Redirecting...');
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
        
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
        
        // Redirect to login after error
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
      <Card className="max-w-md w-full shadow-xl border-0">
        <CardContent className="p-8 text-center">
          {status === 'loading' && (
            <>
              <LoadingSpinner size="lg" className="mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Completing Sign In...
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we set up your account
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to CodePro!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="h-16 w-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Authentication Failed
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to login page...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;