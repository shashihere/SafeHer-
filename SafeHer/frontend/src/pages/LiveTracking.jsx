import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { MapPin, Activity } from 'lucide-react';

const LiveTracking = () => {
    const { userId } = useParams();
    const [locationData, setLocationData] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

        socket.on("connect", () => {
            setConnected(true);
            socket.emit("join_room", userId);
        });

        socket.on("receive_sos_location", (data) => {
            setLocationData(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 w-full min-h-screen text-slate-800">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-widest text-red-600 mb-2 flex justify-center items-center gap-3">
                    <Activity className="w-10 h-10 animate-pulse" />
                    EMERGENCY LIVE TRACKING
                </h1>
                <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">Target ID: {userId}</p>
            </header>

            <div className="max-w-3xl mx-auto bg-white border-2 border-red-600 shadow-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-600 animate-pulse"></div>
                
                {connected ? (
                    <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
                        Socket Connected: Listening for signal...
                    </div>
                ) : (
                    <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
                        Connecting to secure socket...
                    </div>
                )}

                {locationData ? (
                    <div className="space-y-8">
                        <div className="flex justify-center">
                            <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-200">
                                <MapPin className="w-16 h-16 text-red-600 animate-bounce" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 border border-slate-200">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Latitude</p>
                                <p className="text-2xl font-mono text-slate-800 font-bold">{locationData.lat.toFixed(6)}</p>
                            </div>
                            <div className="bg-slate-50 p-4 border border-slate-200">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Longitude</p>
                                <p className="text-2xl font-mono text-slate-800 font-bold">{locationData.lng.toFixed(6)}</p>
                            </div>
                        </div>

                        <div className="bg-slate-800 text-white p-4">
                            <p className="text-sm font-mono flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                LAST UPDATED: {new Date(locationData.timestamp).toLocaleTimeString()}
                            </p>
                        </div>

                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${locationData.lat},${locationData.lng}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="block w-full bg-blue-600 text-white font-bold uppercase tracking-widest py-4 hover:bg-blue-700 transition-colors"
                        >
                            Open in Google Maps
                        </a>
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center opacity-50">
                        <MapPin className="w-20 h-20 text-slate-400 mb-4" />
                        <p className="text-xl font-bold text-slate-500 uppercase tracking-widest">Waiting for SOS Signal...</p>
                        <p className="text-sm text-slate-400 mt-2">No active broadcast detected from this device.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveTracking;
