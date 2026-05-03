import { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { AlertOctagon, Mic, Camera, FileText, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import io from 'socket.io-client';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [recording, setRecording] = useState(false);
    const [uploading, setUploading] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSOS = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                // Initialize Socket
                const socket = io(API_URL);
                socket.emit('sos_alert', {
                    userId: user.userId,
                    location: { latitude, longitude }
                });

                // Trigger WhatsApp / DB SOS
                try {
                    await axios.post(`${API_URL}/api/sos/trigger`, {
                        latitude, longitude
                    }, {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    alert('SOS Broadcasted Successfully! Live tracking activated.');
                } catch (error) {
                    alert('Failed to broadcast SOS. Try again.');
                }
            },
            (error) => {
                alert('Could not get location: ' + error.message);
            }
        );
    };

    const toggleRecording = async () => {
        if (!recording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                audioChunksRef.current = [];

                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                mediaRecorderRef.current.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    const formData = new FormData();
                    formData.append('evidence', audioBlob, 'stealth-audio.webm');
                    formData.append('type', 'audio');

                    setUploading(true);
                    try {
                        await axios.post(`${API_URL}/api/evidence/upload`, formData, {
                            headers: { Authorization: `Bearer ${user.token}` }
                        });
                        alert('Audio secured in vault.');
                    } catch (err) {
                        alert('Failed to secure audio.');
                    } finally {
                        setUploading(false);
                    }
                };

                mediaRecorderRef.current.start();
                setRecording(true);
            } catch (err) {
                alert('Microphone access denied or unavailable.');
            }
        } else {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setRecording(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('evidence', file);
        formData.append('type', file.type.startsWith('image/') ? 'photo' : 'video');

        setUploading(true);
        try {
            await axios.post(`${API_URL}/api/evidence/upload`, formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('File secured in vault.');
        } catch (err) {
            alert('Failed to secure file.');
        } finally {
            setUploading(false);
        }
    };

    const generateMasterPDF = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/evidence/my-evidence`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.text('RAKSHA MASTER EVIDENCE REPORT', 20, 20);
            
            doc.setFontSize(12);
            doc.text(`Generated For: ${user.name}`, 20, 30);
            doc.text(`Account ID: ${user.userId}`, 20, 35);
            doc.text(`Timestamp: ${new Date().toLocaleString()}`, 20, 40);

            doc.line(20, 45, 190, 45);

            let yPos = 55;
            if (data.length === 0) {
                doc.text('No evidence logged in the secure vault.', 20, yPos);
            } else {
                data.forEach((ev, index) => {
                    doc.text(`${index + 1}. [${ev.type.toUpperCase()}] Logged at: ${new Date(ev.createdAt).toLocaleString()}`, 20, yPos);
                    doc.setTextColor(17, 109, 255); // Royal Blue
                    doc.textWithLink('View Secure Asset', 20, yPos + 5, { url: ev.fileUrl });
                    doc.setTextColor(0, 0, 0);
                    yPos += 15;

                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                });
            }

            doc.save('Raksha_FIR_Evidence_Report.pdf');
        } catch (error) {
            alert('Could not generate report.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 w-full flex-grow">
            
            <header className="mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-bold text-sm mb-6">
                    <ShieldAlert className="w-4 h-4" /> Quick Response
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1d1d1d] mb-4">Action Center</h1>
                <p className="text-gray-500 font-medium text-lg">One-tap emergency responses & evidence collection</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                
                {/* 1. SOS */}
                <button onClick={handleSOS} className="group bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-3xl transition-all soft-shadow hover:soft-shadow-lg flex flex-col items-center justify-center p-8 sm:p-12 h-64 sm:h-72 relative overflow-hidden">
                    <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                        <AlertOctagon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-[#1d1d1d] font-extrabold text-2xl sm:text-3xl mb-2">Trigger SOS</h3>
                    <p className="text-rose-600 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm">Live Track & Alert</p>
                </button>

                {/* 2. Secret Record */}
                <button onClick={toggleRecording} className={`group ${recording ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-100 hover:bg-amber-100'} border rounded-3xl transition-all soft-shadow hover:soft-shadow-lg flex flex-col items-center justify-center p-8 sm:p-12 h-64 sm:h-72 relative overflow-hidden`}>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md transition-transform ${recording ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 group-hover:scale-110'}`}>
                        <Mic className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-[#1d1d1d] font-extrabold text-2xl sm:text-3xl mb-2">
                        {recording ? 'Recording...' : 'Secret Audio'}
                    </h3>
                    <p className={`${recording ? 'text-emerald-700' : 'text-amber-700'} font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm`}>
                        {recording ? 'Tap to save to vault' : 'One-tap mic access'}
                    </p>
                </button>

                {/* 3. Quick Snap */}
                <div className="relative group bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-3xl transition-all soft-shadow hover:soft-shadow-lg flex flex-col items-center justify-center p-8 sm:p-12 h-64 sm:h-72 cursor-pointer overflow-hidden">
                    <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                        {uploading ? <Loader2 className="w-10 h-10 text-white animate-spin" /> : <Camera className="w-10 h-10 text-white" />}
                    </div>
                    <h3 className="text-[#1d1d1d] font-extrabold text-2xl sm:text-3xl mb-2">
                        {uploading ? 'Uploading...' : 'Quick Snap'}
                    </h3>
                    <p className="text-blue-700 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm">Direct Camera Upload</p>
                </div>

                {/* 4. Auto-FIR */}
                <button onClick={generateMasterPDF} className="group bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-3xl transition-all soft-shadow hover:soft-shadow-lg flex flex-col items-center justify-center p-8 sm:p-12 h-64 sm:h-72 relative overflow-hidden">
                    <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform shadow-md">
                        <FileText className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-[#1d1d1d] font-extrabold text-2xl sm:text-3xl mb-2">Auto-FIR</h3>
                    <p className="text-indigo-700 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm">Compile Evidence PDF</p>
                </button>

            </div>

            <div className="bg-[#1b1b25] text-white rounded-3xl p-8 md:p-12 soft-shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Secure your devices</h3>
                    <p className="text-gray-400 font-medium">Add physical panic buttons and GPS trackers for extra peace of mind.</p>
                </div>
                <Link to="/premium" className="shrink-0 bg-white text-[#1d1d1d] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
                    View Devices <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
