import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, BookOpen, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const InviteAccept: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  // Mock interview data - in real app, this would be fetched from API
  const mockInvite = {
    id: id,
    title: 'Mock Interview - Arrays & Dynamic Programming',
    interviewer: 'John Doe',
    interviewerEmail: 'john.doe@example.com',
    scheduledAt: '2025-01-15T14:00:00',
    durationMinutes: 60,
    topics: ['Arrays', 'Dynamic Programming', 'Problem Solving'],
    description: 'Mock interview focusing on array manipulation and dynamic programming concepts.',
    inviteMessage: 'I would like to practice coding interviews with you. This will be a great opportunity for both of us to improve our technical interview skills.'
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const handleAccept = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setAccepted(true);
      setLoading(false);
      
      // In real app, this would create interview records for both parties
      console.log('Interview accepted - creating records for both interviewer and interviewee');
      
      // Redirect to mock arena after 2 seconds
      setTimeout(() => {
        navigate('/mock-arena');
      }, 2000);
    }, 1000);
  };

  const handleDecline = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setDeclined(true);
      setLoading(false);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1000);
  };

  if (accepted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Interview Accepted!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You've successfully accepted the interview invitation. Both you and the interviewer will receive confirmation emails.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting to Mock Arena...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (declined) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="h-16 w-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Interview Declined</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You've declined the interview invitation. The interviewer will be notified.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting to home page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { date, time } = formatDateTime(mockInvite.scheduledAt);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Interview Invitation</h1>
          <p className="text-gray-600 dark:text-gray-400">You've been invited to a mock interview session</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{mockInvite.title}</h2>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Message from Interviewer:</h3>
                <p className="text-gray-700 dark:text-gray-300 italic">"{mockInvite.inviteMessage}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <User className="h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="font-medium">Interviewer</p>
                      <p className="text-sm">{mockInvite.interviewer}</p>
                      <p className="text-xs text-gray-500">{mockInvite.interviewerEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Calendar className="h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm">{date}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Clock className="h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="font-medium">Time & Duration</p>
                      <p className="text-sm">{time}</p>
                      <p className="text-xs text-gray-500">{mockInvite.durationMinutes} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start text-gray-700 dark:text-gray-300">
                    <BookOpen className="h-5 w-5 mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="font-medium mb-2">Topics</p>
                      <div className="flex flex-wrap gap-1">
                        {mockInvite.topics.map((topic, index) => (
                          <Badge key={index} variant="primary" size="sm">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {mockInvite.description && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300">{mockInvite.description}</p>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="success"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={handleAccept}
                    isLoading={loading}
                    icon={<Check size={16} />}
                  >
                    Accept Invitation
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                    onClick={handleDecline}
                    isLoading={loading}
                    icon={<X size={16} />}
                  >
                    Decline
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• If you accept, both parties will receive confirmation emails</li>
                  <li>• You'll be able to join the interview room 15 minutes before the scheduled time</li>
                  <li>• The session will include video chat, code editor, and real-time collaboration</li>
                  <li>• You can cancel the interview up to 2 hours before the scheduled time</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InviteAccept;