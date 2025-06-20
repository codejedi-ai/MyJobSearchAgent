import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Settings, MessageSquare } from 'lucide-react';

const MockInterview: React.FC = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [interviewTime, setInterviewTime] = useState(0);

  // Timer for interview duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setInterviewTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoToggle = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    // Add a small delay before navigation for better UX
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Video Section - Full Screen */}
      <div className="flex-1 relative overflow-hidden">
        {/* Main Video Area */}
        <div className="w-full h-full relative">
          {/* Placeholder Video Background */}
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
            <img 
              src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
              alt="AI Interviewer"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Interview Status Overlay */}
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center gap-3 text-white">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Mock Interview in Progress</span>
                <span className="text-sm opacity-75">{formatTime(interviewTime)}</span>
              </div>
            </div>

            {/* AI Interviewer Info */}
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Sarah - AI Interviewer</div>
                  <div className="text-xs opacity-75">Senior Technical Recruiter</div>
                </div>
              </div>
            </div>

            {/* User Video (Picture-in-Picture) */}
            <div className="absolute bottom-24 right-6 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
              {isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-white/60 text-center">
                    <Video size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Your Video</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-white/60 text-center">
                    <VideoOff size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Video Off</span>
                  </div>
                </div>
              )}
            </div>

            {/* Current Question Display */}
            <div className="absolute bottom-24 left-6 right-64 bg-black/70 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <div className="text-white">
                  <div className="text-sm font-medium text-blue-400 mb-1">Current Question:</div>
                  <p className="text-sm leading-relaxed">
                    "Tell me about a challenging project you worked on and how you overcame the obstacles you faced. 
                    What was your approach to problem-solving?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-20 right-6 w-80 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
            <h3 className="font-semibold mb-4">Interview Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Camera Quality</span>
                <select className="bg-gray-700 rounded px-2 py-1 text-xs">
                  <option>HD (720p)</option>
                  <option>Full HD (1080p)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Microphone</span>
                <select className="bg-gray-700 rounded px-2 py-1 text-xs">
                  <option>Default Microphone</option>
                  <option>External Microphone</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Interview Type</span>
                <select className="bg-gray-700 rounded px-2 py-1 text-xs">
                  <option>Technical Interview</option>
                  <option>Behavioral Interview</option>
                  <option>General Interview</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-6">
          {/* Mute Button */}
          <button
            onClick={handleMuteToggle}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
              isMuted 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <MicOff className="text-white" size={24} />
            ) : (
              <Mic className="text-white" size={24} />
            )}
          </button>

          {/* Video Button */}
          <button
            onClick={handleVideoToggle}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
              !isVideoOn 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
          >
            {isVideoOn ? (
              <Video className="text-white" size={24} />
            ) : (
              <VideoOff className="text-white" size={24} />
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={handleSettingsToggle}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
              showSettings 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            title="Settings"
          >
            <Settings className="text-white" size={24} />
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
            title="End Interview"
          >
            {isCallActive ? (
              <PhoneOff className="text-white" size={28} />
            ) : (
              <Phone className="text-white" size={28} />
            )}
          </button>
        </div>

        {/* Additional Info Bar */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <span>Interview Duration: {formatTime(interviewTime)}</span>
            <span>•</span>
            <span>Questions Answered: 3/10</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Connection: Excellent</span>
          </div>
        </div>
      </div>

      {/* End Call Overlay */}
      {!isCallActive && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center text-white">
            <PhoneOff size={48} className="mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2">Interview Ended</h2>
            <p className="text-gray-300 mb-4">Returning to dashboard...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;