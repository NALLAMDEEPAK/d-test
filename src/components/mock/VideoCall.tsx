import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Phone } from 'lucide-react';
import Button from '../ui/Button';

interface VideoCallProps {
  className?: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ className = '' }) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden flex flex-col ${className}`}>
      <div className="relative h-full min-h-[12rem]">
        {isVideoOn ? (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="User video"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-semibold text-white">
              JD
            </div>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-gray-900 bg-opacity-70 p-1 rounded-lg">
          {isVideoOn ? (
            <div className="h-16 w-24 bg-gray-700 rounded overflow-hidden">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Your video"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-16 w-24 bg-gray-700 rounded overflow-hidden flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-semibold text-white">
                You
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-800 p-3 flex justify-center space-x-2">
        <Button
          variant="ghost"
          className="text-white bg-gray-700 hover:bg-gray-600"
          onClick={() => setIsMicOn(!isMicOn)}
          icon={isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
          aria-label={isMicOn ? "Mute microphone" : "Unmute microphone"}
        />
        <Button
          variant="ghost"
          className="text-white bg-gray-700 hover:bg-gray-600"
          onClick={() => setIsVideoOn(!isVideoOn)}
          icon={isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
          aria-label={isVideoOn ? "Turn off camera" : "Turn on camera"}
        />
        <Button
          variant="danger"
          icon={<Phone size={18} />}
          aria-label="End call"
        />
      </div>
    </div>
  );
};

export default VideoCall;