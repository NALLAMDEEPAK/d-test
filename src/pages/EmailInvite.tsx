import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import EmailInviteForm from '../components/email/EmailInviteForm';

const EmailInvite: React.FC = () => {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSuccess = () => {
    setNotification({
      type: 'success',
      message: 'Interview invitation sent successfully! The recipient will receive an email with all the details.',
    });
    
    // Clear notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  const handleError = (error: string) => {
    setNotification({
      type: 'error',
      message: error,
    });
    
    // Clear notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div
          className={`p-4 rounded-lg border ${
            notification.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            )}
            <p
              className={`text-sm ${
                notification.type === 'success'
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-red-700 dark:text-red-300'
              }`}
            >
              {notification.message}
            </p>
          </div>
        </div>
      )}

      {/* Email Form */}
      <EmailInviteForm onSuccess={handleSuccess} onError={handleError} />

      {/* Info Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
          📧 How Email Invitations Work
        </h3>
        <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <p>• Emails are sent using your Google account's SMTP access</p>
          <p>• Recipients will receive a beautifully formatted invitation</p>
          <p>• Interview details are automatically included in the email</p>
          <p>• The email includes a link back to the CodePro platform</p>
          <p>• All emails are sent securely through Google's servers</p>
        </div>
      </div>
    </div>
  );
};

export default EmailInvite;