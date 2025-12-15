import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UserProfile, InterviewFeedback } from '../types';
import { generateInterviewQuestions, evaluateAnswer } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { BotIcon, UserIcon, MicIcon, StopIcon, RetryRecordIcon } from './icons';

interface InterviewProps {
  userProfile: UserProfile;
  onFinish: (feedback: InterviewFeedback[]) => void;
}

// FIX: Add types for the Web Speech API to resolve TypeScript errors.
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: any) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: { new(): SpeechRecognition };
    webkitSpeechRecognition: { new(): SpeechRecognition };
    // FIX: Add webkitAudioContext to the Window interface to support older browsers and resolve TypeScript error.
    webkitAudioContext: typeof AudioContext;
  }
}


// FIX: Rename SpeechRecognition to SpeechRecognitionAPI to avoid conflict with the SpeechRecognition type.
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
const isSpeechRecognitionSupported = !!SpeechRecognitionAPI;

const VoiceConsentModal: React.FC<{ onAccept: () => void, onDecline: () => void }> = ({ onAccept, onDecline }) => (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20 animate-fade-in">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">Microphone & Recording Consent</h3>
            <p className="text-gray-400 mb-6">
                To provide feedback on your spoken answers, this app needs to record your voice. The audio will be sent to our AI for analysis and transcription. By continuing, you consent to the recording and processing of your voice data.
            </p>
            <div className="flex justify-center gap-4">
                <button onClick={onDecline} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                    Decline
                </button>
                <button onClick={onAccept} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                    I Understand & Consent
                </button>
            </div>
        </div>
    </div>
);

const MicVisualizer: React.FC<{ volume: number }> = ({ volume }) => {
    const barCount = 20;
    const bars = Array.from({ length: barCount }, (_, i) => {
        const height = i < volume * barCount ? '100%' : '20%';
        const opacity = i < volume * barCount ? '1' : '0.3';
        return <div key={i} className="w-1 bg-blue-400 rounded-full transition-all duration-75" style={{ height, opacity }}></div>;
    });
    return <div className="flex items-end justify-center space-x-1 h-8">{bars}</div>;
};


const Interview: React.FC<InterviewProps> = ({ userProfile, onFinish }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [conversation, setConversation] = useState<{ type: 'bot' | 'user'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<InterviewFeedback[]>([]);
  const [voiceConsentGiven, setVoiceConsentGiven] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [micVolume, setMicVolume] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const retryRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const fetchedQuestions = await generateInterviewQuestions(userProfile);
      setQuestions(fetchedQuestions);
      if (fetchedQuestions.length > 0) {
        setConversation([{ type: 'bot', text: fetchedQuestions[0] }]);
      }
      setIsLoading(false);
    };
    fetchQuestions();
  }, [userProfile]);
  
  const cleanupAudio = useCallback(() => {
    if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
    }
    sourceRef.current?.disconnect();
    analyserRef.current?.disconnect();
    // Do not close the audio context, it can be reused.
    sourceRef.current = null;
    analyserRef.current = null;
    setMicVolume(0);
  }, []);
  
  useEffect(() => {
    if (userProfile.interviewMode === 'Voice' && isSpeechRecognitionSupported) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setCurrentAnswer(transcript);
      };
      
      recognitionRef.current.onend = () => {
        cleanupAudio();
        setIsRecording(false);
        if (retryRef.current) {
            retryRef.current = false;
            startRecording();
        }
      }
    }
    return () => {
        recognitionRef.current?.stop();
        streamRef.current?.getTracks().forEach(track => track.stop());
        cleanupAudio();
        if (audioContextRef.current?.state !== 'closed') {
          audioContextRef.current?.close();
        }
    }
  }, [userProfile.interviewMode, cleanupAudio]);

  const startRecording = useCallback(() => {
      if (!voiceConsentGiven) {
          setShowConsentModal(true);
          return;
      }
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          streamRef.current = stream;
          setCurrentAnswer('');

          if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
              audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          }
          analyserRef.current = audioContextRef.current.createAnalyser();
          sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
          
          analyserRef.current.fftSize = 256;
          const bufferLength = analyserRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          
          sourceRef.current.connect(analyserRef.current);
      
          const visualize = () => {
              if (!analyserRef.current) return;
              analyserRef.current.getByteTimeDomainData(dataArray);
              let sumSquares = 0.0;
              for (let i = 0; i < bufferLength; i++) {
                  const v = dataArray[i] / 128.0 - 1.0;
                  sumSquares += v * v;
              }
              const rms = Math.sqrt(sumSquares / bufferLength);
              setMicVolume(Math.min(1, rms * 4)); // Clamp volume and amplify
              animationFrameRef.current = requestAnimationFrame(visualize);
          };
          visualize();

          recognitionRef.current?.start();
          setIsRecording(true);
      }).catch(err => {
          console.error("Microphone access denied:", err);
          alert("Microphone access is required for voice interviews. Please allow access and try again.");
      });
  }, [voiceConsentGiven]);
  
  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
        recognitionRef.current.stop();
    }
  }, []);

  const handleToggleRecording = useCallback(() => {
    if(isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);
  
  const handleRetryRecording = useCallback(() => {
    if (isRecording) {
        retryRef.current = true;
        setCurrentAnswer('');
        stopRecording();
    }
  }, [isRecording, stopRecording]);

  const handleAcceptConsent = () => {
      setVoiceConsentGiven(true);
      setShowConsentModal(false);
      startRecording();
  }


  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isEvaluating]);

  const handleAnswerSubmit = useCallback(async () => {
    if (!currentAnswer.trim() || isEvaluating) return;

    if (isRecording) {
      stopRecording();
    }
    const question = questions[currentQuestionIndex];
    
    setConversation(prev => [...prev, { type: 'user', text: currentAnswer }]);
    setIsEvaluating(true);
    setCurrentAnswer('');

    const evaluation = await evaluateAnswer(question, currentAnswer);
    const newFeedback: InterviewFeedback = {
      question,
      answer: currentAnswer,
      feedback: evaluation
    };
    const updatedFeedback = [...feedback, newFeedback];
    setFeedback(updatedFeedback);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setConversation(prev => [...prev, { type: 'bot', text: questions[nextIndex] }]);
    } else {
      onFinish(updatedFeedback);
    }
    setIsEvaluating(false);
  }, [currentAnswer, isEvaluating, questions, currentQuestionIndex, feedback, onFinish, isRecording, stopRecording]);

  if (isLoading) {
    return <LoadingSpinner message="Preparing your interview..." />;
  }
  
  const renderInputControls = () => {
    const isVoiceMode = userProfile.interviewMode === 'Voice' && isSpeechRecognitionSupported;
    return (
        <div className="space-y-3">
             {isVoiceMode && (
                <div className="flex items-center justify-center space-x-4">
                    <button
                        onClick={handleRetryRecording}
                        disabled={!isRecording}
                        className="flex items-center justify-center p-3 rounded-full transition-colors bg-gray-600 hover:bg-gray-500 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Re-record answer"
                    >
                        <RetryRecordIcon className="h-6 w-6" />
                    </button>
                    <button
                        onClick={handleToggleRecording}
                        className={`p-4 rounded-full transition-transform transform hover:scale-110 ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                    >
                        {isRecording ? <StopIcon className="h-8 w-8" /> : <MicIcon className="h-8 w-8" />}
                    </button>
                    <div className="w-32 h-8">
                        {isRecording && <MicVisualizer volume={micVolume} />}
                    </div>
                </div>
            )}
            <div className="relative">
                 <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && !isVoiceMode) {
                            e.preventDefault();
                            handleAnswerSubmit();
                        }
                    }}
                    placeholder={isVoiceMode ? (isRecording ? "Listening..." : "Click the mic to record or type here...") : "Type your answer here..."}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-24 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    rows={3}
                    disabled={isEvaluating}
                />
                <button
                    onClick={handleAnswerSubmit}
                    disabled={!currentAnswer.trim() || isEvaluating}
                    className="absolute right-3 bottom-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 w-full flex flex-col h-[80vh] relative">
      {showConsentModal && <VoiceConsentModal onAccept={handleAcceptConsent} onDecline={() => setShowConsentModal(false)} />}
      <div className="flex-grow overflow-y-auto pr-4 space-y-4">
        {conversation.map((entry, index) => (
          <div key={index} className={`flex items-start gap-3 animate-fade-in ${entry.type === 'user' ? 'justify-end' : ''}`}>
            {entry.type === 'bot' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><BotIcon /></div>}
            <div className={`max-w-xl px-4 py-3 rounded-xl ${entry.type === 'bot' ? 'bg-gray-700' : 'bg-blue-600'}`}>
              <p className="text-white whitespace-pre-wrap">{entry.text}</p>
            </div>
             {entry.type === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center"><UserIcon /></div>}
          </div>
        ))}
        {isEvaluating && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><BotIcon /></div>
            <div className="max-w-xl px-4 py-3 rounded-xl bg-gray-700">
               <LoadingSpinner message="Evaluating..."/>
            </div>
          </div>
        )}
        <div ref={conversationEndRef} />
      </div>
      
      <div className="mt-6 border-t border-gray-700 pt-4">
        {renderInputControls()}
        <p className="text-xs text-gray-500 mt-2 text-center">
            {userProfile.interviewMode === 'Text' ? 'Press Enter to send, Shift+Enter for a new line.' : 'Click the microphone to record your answer.'}
            {' '}Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
};

export default Interview;
