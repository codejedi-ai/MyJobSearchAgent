import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { createConversation, endConversation } from '../api';

const MockInterview: React.FC = () => {
  const navigate = useNavigate();
  const [conversationUrl, setConversationUrl] = useState<string>('');
  const [conversationId, setConversationId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isEnding, setIsEnding] = useState(false);

  const TAVUS_API_KEY = '516cc6e75da04dcab4793519fe26ee1f';

  useEffect(() => {
    initializeInterview();
    
    // Cleanup function to end conversation when component unmounts
    return () => {
      if (conversationId) {
        endConversation(TAVUS_API_KEY, conversationId).catch(console.error);
      }
    };
  }, []);

  const initializeInterview = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Creating Tavus conversation...');
      const conversation = await createConversation(TAVUS_API_KEY);
      
      console.log('Conversation created:', conversation);
      
      if (conversation.conversation_url) {
        setConversationUrl(conversation.conversation_url);
        setConversationId(conversation.conversation_id);
      } else {
        throw new Error('No conversation URL received from Tavus API');
      }
    } catch (err: any) {
      console.error('Error creating conversation:', err);
      setError(err.message || 'Failed to initialize interview');
    } finally {
      setLoading(false);
    }
  };

  const handleEndInterview = async () => {
    try {
      setIsEnding(true);
      
      if (conversationId) {
        console.log('Ending conversation:', conversationId);
        await endConversation(TAVUS_API_KEY, conversationId);
      }
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error ending conversation:', err);
      // Still navigate back even if ending fails
      navigate('/dashboard');
    }
  };

  const handleRetry = () => {
    initializeInterview();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 size={48} className="mx-auto mb-4 animate-spin text-blue-500" />
          <h2 className="text-2xl font-bold mb-2">Preparing Your Interview</h2>
          <p className="text-gray-300 mb-4">Connecting to Tavus AI...</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Setting up your personalized interview experience</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-auto px-6">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Interview Setup Failed</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Header Bar */}
      <div className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleEndInterview}
              disabled={isEnding}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-gray-600"></div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Mock Interview - Tavus AI</span>
            </div>
          </div>
          
          <button
            onClick={handleEndInterview}
            disabled={isEnding}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isEnding ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Ending...
              </>
            ) : (
              'End Interview'
            )}
          </button>
        </div>
      </div>

      {/* Tavus AI Interview iframe */}
      <div className="flex-1 relative">
        {conversationUrl ? (
          <iframe
            src={conversationUrl}
            allow="camera; microphone; fullscreen; display-capture"
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none',
              backgroundColor: '#1f2937'
            }}
            title="Tavus AI Mock Interview"
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <AlertCircle size={48} className="mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">No Interview URL Available</h3>
              <p className="text-gray-300">Please try refreshing or contact support.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <span>Powered by Tavus AI</span>
            <span>•</span>
            <span>Real-time AI Interview Coaching</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* Ending Overlay */}
      {isEnding && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 size={48} className="mx-auto mb-4 animate-spin text-blue-500" />
            <h2 className="text-2xl font-bold mb-2">Ending Interview</h2>
            <p className="text-gray-300">Saving your session...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;