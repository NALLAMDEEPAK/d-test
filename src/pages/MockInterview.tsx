import React from 'react';
import CodeEditor from '../components/dsa/CodeEditor';
import ChatBox from '../components/mock/ChatBox';
import VideoCall from '../components/mock/VideoCall';

const MockInterview: React.FC = () => {
  const handleSendMessage = (message: string) => {
    // Handle sending messages
    console.log('Message sent:', message);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex-grow flex flex-col lg:flex-row gap-4 h-full overflow-hidden">
        <div className="lg:w-7/12 flex flex-col h-full">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Mock Interview Session
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Implement a function to find the longest substring without repeating characters.
            </p>
          </div>
          <div className="flex-grow">
            <CodeEditor 
              initialCode="// Write your solution here\nfunction lengthOfLongestSubstring(s) {\n  // Your code\n}"
              language="javascript"
            />
          </div>
        </div>
        
        <div className="lg:w-5/12 flex flex-col h-full gap-4">
          <VideoCall className="h-1/3" />
          <ChatBox 
            className="flex-grow" 
            messages={[]}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MockInterview;