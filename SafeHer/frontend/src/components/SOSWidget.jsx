import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import { AlertOctagon, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOSWidget = () => {
    const { user } = useContext(AuthContext);
    const [isActive, setIsActive] = useState(false);
    const [voiceMode, setVoiceMode] = useState(false);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);
    const watchIdRef = useRef(null);
    const recognitionRef = useRef(null);
    const navigate = useNavigate();

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                const spokenWords = currentTranscript.toLowerCase();
                
                if (spokenWords.includes("help") || spokenWords.includes("emergency")) {
                    console.log("VOICE SOS TRIGGERED!");
                    handleSOS();
                    // Stop listening after triggering to prevent infinite loops
                    setVoiceMode(false);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.log("Speech recognition error", event.error);
                if (event.error === 'not-allowed') setVoiceMode(false);
            };

            recognitionRef.current.onend = () => {
                // Auto-restart if voice mode is still supposed to be active
                if (voiceMode && recognitionRef.current) {
                    try { recognitionRef.current.start(); } catch (e) {}
                }
            };
        }
    }, [user, voiceMode]);

    // Handle Voice Mode Toggle
    useEffect(() => {
        if (voiceMode && recognitionRef.current) {
            try { recognitionRef.current.start(); } catch(e){}
        } else if (!voiceMode && recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }, [voiceMode]);

    useEffect(() => {
        if (user) {
            socketRef.current = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
            socketRef.current.emit("join_room", user._id);
        }
        return () => {
            if (socketRef.current) socketRef.current.disconnect();
            if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
        };
    }, [user]);

    const handleSOS = () => {
        if (!user) {
            alert("Please login to use the SOS feature.");
            navigate('/login');
            return;
        }

        if (isActive) {
            // Turn off SOS
            setIsActive(false);
            if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
            return;
        }

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setIsActive(true);
        setError(null);
        
        // Ensure we use the Vercel app link or fallback to localhost
        const appDomain = window.location.origin.includes('localhost') 
            ? 'https://safe-her-xi.vercel.app' 
            : window.location.origin;
        
        const trackingLink = `${appDomain}/track/${user._id}`;
        const message = `🚨 EMERGENCY SOS 🚨\nI am in danger and need help immediately! Track my LIVE moving location here:\n${trackingLink}`;
        
        let targetPhone = "";
        if (user && user.emergencyContact) {
            targetPhone = user.emergencyContact.replace(/\D/g, ''); // Extract only digits
        }
        
        const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        alert(`EMERGENCY SOS ACTIVATED.\n\nLive tracking link generated: ${trackingLink}\n\nPlease send the auto-generated WhatsApp message to your emergency contacts.`);

        watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                socketRef.current.emit("send_sos_location", {
                    userId: user._id,
                    lat: latitude,
                    lng: longitude,
                    timestamp: new Date().toISOString()
                });
            },
            (err) => {
                setError(err.message);
                setIsActive(false);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-xs font-bold">{error}</div>}
            {isActive && (
                <div className="bg-red-500 border-4 border-black text-black px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-4 animate-pulse flex items-center gap-3">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <span className="font-black text-sm tracking-widest uppercase">Broadcasting Live</span>
                </div>
            )}
            
            {/* Voice Watch Toggle */}
            <button 
                onClick={() => setVoiceMode(!voiceMode)}
                className={`mb-4 w-14 h-14 rounded-full flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 border-4 border-black ${voiceMode ? 'bg-green-400 text-black animate-pulse' : 'bg-white text-black'}`}
                title="Voice Watch Mode (Say 'Help' or 'Emergency')"
            >
                {voiceMode ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button 
                onClick={handleSOS}
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] transition-all duration-300 border-4 border-black ${isActive ? 'bg-red-600 scale-110 animate-pulse' : 'bg-red-500 hover:bg-red-400 hover:-translate-y-1'}`}
            >
                <AlertOctagon className="text-black w-10 h-10 mb-1" />
                <span className="text-black font-black text-sm tracking-widest uppercase">SOS</span>
            </button>
        </div>
    );
};

export default SOSWidget;
