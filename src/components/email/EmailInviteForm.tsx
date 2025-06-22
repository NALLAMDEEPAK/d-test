import React, { useState } from 'react';
import { Send, Calendar, Clock, User, BookOpen, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { emailAPI } from '../../services/api';

interface EmailInviteFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const EmailInviteForm: React.FC<EmailInviteFormProps> = ({ onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    subject: 'Mock Interview Invitation - CodePro Platform',
    body: 'I would like to invite you to a mock interview session on CodePro. This will be a great opportunity for both of us to practice our technical interview skills and improve our problem-solving abilities.',
    interviewDetails: {
      date: '',
      time: '',
      duration: 60,
      topics: '',
      description: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await emailAPI.sendInvite(formData);
      
      if (response.data.success) {
        onSuccess?.();
        // Reset form
        setFormData({
          to: '',
          subject: 'Mock Interview Invitation - CodePro Platform',
          body: 'I would like to invite you to a mock interview session on CodePro. This will be a great opportunity for both of us to practice our technical interview skills and improve our problem-solving abilities.',
          interviewDetails: {
            date: '',
            time: '',
            duration: 60,
            topics: '',
            description: '',
          },
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send invitation';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateInterviewDetail = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      interviewDetails: {
        ...prev.interviewDetails,
        [field]: value,
      },
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Mail className="mr-3 h-6 w-6" />
          Send Interview Invitation
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Invite someone to a mock interview session via email
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Email Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Recipient Email *
              </label>
              <input
                type="email"
                id="to"
                required
                placeholder="colleague@example.com"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
          </div>

          {/* Message Body */}
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              id="body"
              required
              rows={4}
              placeholder="Write your invitation message..."
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            />
          </div>

          {/* Interview Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Interview Details (Optional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.interviewDetails.date}
                  onChange={(e) => updateInterviewDetail('date', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.interviewDetails.time}
                  onChange={(e) => updateInterviewDetail('time', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (minutes)
                </label>
                <select
                  id="duration"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.interviewDetails.duration}
                  onChange={(e) => updateInterviewDetail('duration', parseInt(e.target.value))}
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="topics" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <BookOpen className="inline h-4 w-4 mr-1" />
                Topics
              </label>
              <input
                type="text"
                id="topics"
                placeholder="Arrays, Dynamic Programming, System Design"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.interviewDetails.topics}
                onChange={(e) => updateInterviewDetail('topics', e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Any additional information about the interview..."
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                value={formData.interviewDetails.description}
                onChange={(e) => updateInterviewDetail('description', e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              icon={<Send size={16} />}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8"
            >
              {isLoading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailInviteForm;