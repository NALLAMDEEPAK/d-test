import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

interface Message {
  id: string;
  sender: 'user' | 'interviewer';
  text: string;
  timestamp: Date;
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  className?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  onSendMessage,
  className = '',
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chat</h3>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm break-words">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block text-right">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-600 p-3">
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow resize-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={2}
          />
          <Button
            variant="primary"
            onClick={handleSendMessage}
            className="self-end"
            icon={<Send size={16} />}
            aria-label="Send message"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;