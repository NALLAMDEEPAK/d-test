import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import CodeEditor from '../components/dsa/CodeEditor';
import ChatBox from '../components/mock/ChatBox';
import VideoCall from '../components/mock/VideoCall';
import { mockInterviews, mockChatMessages } from '../data/mockData';

const InterviewRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [interview, setInterview] = useState(mockInterviews.find((i) => i.id === id));
  const [messages, setMessages] = useState(mockChatMessages);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    // Start the timer
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    
    // Mock response from interviewer
    setTimeout(() => {
      const responseMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'interviewer' as const,
        text: "That's a good approach. Can you optimize it further?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!interview) {
    return <div className="text-center py-12">Interview not found</div>;
  }
  
  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {interview.title}
        </h1>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <Clock className="h-5 w-5 mr-2" />
          <span className="font-mono">{formatTime(elapsedTime)}</span>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col lg:flex-row gap-4 h-full overflow-hidden">
        <div className="lg:w-7/12 flex flex-col h-full">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Problem</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Implement a function to find the maximum sum of any contiguous subarray within an array of integers. 
              If the array contains all negative numbers, return the smallest negative number.
            </p>
          </div>
          <div className="flex-grow">
            <CodeEditor 
              initialCode="// Write your solution here\nfunction maxSubArray(nums) {\n  // Implement Kadane's algorithm\n}"
              language="javascript"
            />
          </div>
        </div>
        
        <div className="lg:w-5/12 flex flex-col h-full gap-4">
          <VideoCall className="h-1/3" />
          <ChatBox 
            className="flex-grow" 
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;