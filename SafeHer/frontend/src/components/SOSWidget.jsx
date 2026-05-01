import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import { AlertOctagon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOSWidget = () => {
    const { user } = useContext(AuthContext);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);
    const watchIdRef = useRef(null);
    const navigate = useNavigate();

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
        alert(`EMERGENCY SOS ACTIVATED. Live location is being broadcasted to tracking room: ${user._id}`);

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
                <div className="bg-red-600 text-white px-4 py-2 rounded shadow-lg mb-4 animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-bold text-sm tracking-widest">BROADCASTING LIVE LOCATION</span>
                </div>
            )}
            <button 
                onClick={handleSOS}
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 border-4 border-white ${isActive ? 'bg-red-600 scale-110 animate-bounce' : 'bg-red-500 hover:bg-red-600 hover:scale-105'}`}
            >
                <AlertOctagon className="text-white w-8 h-8 mb-1" />
                <span className="text-white font-extrabold text-xs tracking-widest">SOS</span>
            </button>
        </div>
    );
};

export default SOSWidget;
