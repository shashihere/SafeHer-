import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, Mic, Camera, FileText, Loader2, Activity } from 'lucide-react';
import axios from 'axios';
import { jsPDF } from "jspdf";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Auth URL Base
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const [uploading, setUploading] = useState(false);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Audio Recording States
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchReports();
    }, [user, navigate]);

    const fetchReports = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_URL}/api/reports`, config);
            setReports(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // --- Action 1: TRIGGER SOS (Routes to WhatsApp) ---
    const handleSOS = () => {
        const targetPhone = user?.emergencyContact ? user.emergencyContact.replace(/\D/g, '') : '';
        const appDomain = window.location.origin.includes('localhost') 
            ? 'https://safe-her-xi.vercel.app' 
            : window.location.origin;
        const trackingLink = `${appDomain}/track/${user._id}`;
        const message = `🚨 EMERGENCY SOS 🚨\nI am in danger and need help immediately! Track my LIVE moving location here:\n${trackingLink}`;
        const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
        
        alert("🚨 INITIATING EMERGENCY SOS 🚨\n\nRouting you to WhatsApp. Please hit SEND immediately.");
        window.open(whatsappUrl, '_blank');
    };

    // --- Action 2: SECRET AUDIO (Mic Access & Auto-Upload) ---
    const toggleRecording = async () => {
        if (!recording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                
                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data.size > 0) audioChunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    audioChunksRef.current = [];
                    stream.getTracks().forEach(track => track.stop()); // stop mic
                    await uploadEvidence(audioBlob, 'Secret Audio Recording', 'audio.webm');
                };

                audioChunksRef.current = [];
                mediaRecorderRef.current.start();
                setRecording(true);
            } catch (err) {
                alert("Microphone access denied. Please allow mic permissions.");
            }
        } else {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    // --- Action 3: QUICK SNAP (Camera Upload) ---
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadEvidence(file, 'Quick Photo Evidence', file.name);
        }
    };

    const uploadEvidence = async (fileBlob, contentText, filename) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('content', contentText);
            formData.append('platform', 'Direct Action');
            formData.append('severity', 'High');
            formData.append('aiScore', 95);
            formData.append('evidence', fileBlob, filename);

            const config = { 
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                } 
            };
            await axios.post(`${API_URL}/api/reports`, formData, config);
            await fetchReports(); // refresh timeline
            alert("✅ Evidence Secured in Vault.");
        } catch (error) {
            console.error("Upload error details:", error.response || error);
            alert(`Upload failed: ${error.response?.data?.message || error.message || "Unknown error"}`);
        } finally {
            setUploading(false);
        }
    };

    // --- Action 4: AUTO-FIR (Generate Master PDF) ---
    const generateMasterPDF = () => {
        if (reports.length === 0) {
            alert("Your evidence vault is empty. Nothing to compile.");
            return;
        }

        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.setTextColor(220, 38, 38); // Red
        doc.text("MASTER EVIDENCE REPORT (AUTO-FIR)", 20, 20);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Generated by: Raksha System`, 20, 30);
        doc.text(`User Identity: ${user.name} (${user.email})`, 20, 38);
        doc.text(`Timestamp: ${new Date().toLocaleString()}`, 20, 46);
        
        doc.line(20, 50, 190, 50);

        let yPos = 60;
        
        reports.forEach((report, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text(`Incident #${index + 1} - ${new Date(report.createdAt).toLocaleString()}`, 20, yPos);
            yPos += 8;

            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`Platform: ${report.platform}`, 20, yPos);
            yPos += 7;
            
            doc.text(`Severity: ${report.severity} (AI Confidence: ${report.aiScore}%)`, 20, yPos);
            yPos += 7;

            // Handle multi-line content
            const splitContent = doc.splitTextToSize(`Content: ${report.content}`, 170);
            doc.text(splitContent, 20, yPos);
            yPos += (splitContent.length * 7) + 5;

            if (report.evidenceFiles && report.evidenceFiles.length > 0) {
                doc.setFont("helvetica", "bold");
                doc.text(`Attached Evidence:`, 20, yPos);
                yPos += 7;
                doc.setFont("helvetica", "normal");
                doc.setTextColor(37, 99, 235); // Blue links
                report.evidenceFiles.forEach(file => {
                    const splitUrl = doc.splitTextToSize(file, 170);
                    doc.text(splitUrl, 20, yPos);
                    yPos += (splitUrl.length * 7);
                });
                doc.setTextColor(0, 0, 0);
            }

            yPos += 10;
            doc.line(20, yPos, 190, yPos);
            yPos += 10;
        });

        doc.save(`Raksha_Master_FIR_${user.name.replace(/\s+/g, '_')}.pdf`);
    };

    if (loading) return <div className="p-8 text-center text-black flex justify-center items-center h-screen"><Loader2 className="animate-spin w-12 h-12" /></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 w-full bg-transparent min-h-[calc(100vh-80px)] text-black">
            <header className="mb-16 text-center border-b-8 border-black pb-8">
                <div className="inline-block bg-black text-white px-6 py-2 font-extrabold uppercase tracking-widest mb-6 -rotate-1 shadow-[4px_4px_0px_rgba(255,0,0,1)]">
                    CRITICAL OPERATIONS
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-cursive font-black text-black tracking-tighter mb-4 uppercase">Action Center</h1>
                <p className="text-black uppercase tracking-widest text-lg font-bold">One-Tap Emergency Responses & Evidence Collection</p>
            </header>

            {/* The 4 Massive Action Cards - NEOBRUTALIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                
                {/* 1. SOS */}
                <button onClick={handleSOS} className="group bg-red-500 border-8 border-black hover:-translate-y-2 hover:-translate-x-2 transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-8 sm:p-12 h-64 sm:h-80 relative overflow-hidden">
                    <AlertOctagon className="w-16 h-16 sm:w-24 sm:h-24 text-black mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-black font-black text-3xl sm:text-4xl uppercase tracking-tighter">Trigger SOS</h3>
                    <p className="text-black font-bold text-sm sm:text-lg mt-2 sm:mt-4 text-center uppercase tracking-widest bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">Live Track & Alert</p>
                </button>

                {/* 2. Secret Record */}
                <button onClick={toggleRecording} className={`group ${recording ? 'bg-green-400' : 'bg-yellow-400'} border-8 border-black hover:-translate-y-2 hover:-translate-x-2 transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-8 sm:p-12 h-64 sm:h-80 relative overflow-hidden`}>
                    <Mic className={`w-16 h-16 sm:w-24 sm:h-24 text-black mb-4 sm:mb-6 ${recording ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                    <h3 className="text-black font-black text-3xl sm:text-4xl uppercase tracking-tighter">
                        {recording ? 'RECORDING...' : 'SECRET AUDIO'}
                    </h3>
                    <p className="text-black font-bold text-sm sm:text-lg mt-2 sm:mt-4 text-center uppercase tracking-widest bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        {recording ? 'TAP TO SAVE TO VAULT' : 'ONE-TAP MIC ACCESS'}
                    </p>
                </button>

                {/* 3. Quick Snap */}
                <div className="relative group bg-blue-500 border-8 border-black hover:-translate-y-2 hover:-translate-x-2 transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-8 sm:p-12 h-64 sm:h-80 cursor-pointer overflow-hidden">
                    <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    {uploading ? <Loader2 className="w-16 h-16 sm:w-24 sm:h-24 text-black mb-4 sm:mb-6 animate-spin" /> : <Camera className="w-16 h-16 sm:w-24 sm:h-24 text-black mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />}
                    <h3 className="text-black font-black text-3xl sm:text-4xl uppercase tracking-tighter">
                        {uploading ? 'UPLOADING...' : 'QUICK SNAP'}
                    </h3>
                    <p className="text-black font-bold text-sm sm:text-lg mt-2 sm:mt-4 text-center uppercase tracking-widest bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">DIRECT CAMERA UPLOAD</p>
                </div>

                {/* 4. Auto-FIR */}
                <button onClick={generateMasterPDF} className="group bg-purple-400 border-8 border-black hover:-translate-y-2 hover:-translate-x-2 transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-8 sm:p-12 h-64 sm:h-80 relative overflow-hidden">
                    <FileText className="w-16 h-16 sm:w-24 sm:h-24 text-black mb-4 sm:mb-6 group-hover:-translate-y-2 transition-transform" />
                    <h3 className="text-black font-black text-3xl sm:text-4xl uppercase tracking-tighter">AUTO-FIR</h3>
                    <p className="text-black font-bold text-sm sm:text-lg mt-2 sm:mt-4 text-center uppercase tracking-widest bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">COMPILE EVIDENCE PDF</p>
                </button>

            </div>
        </div>
    );
};

export default Dashboard;
