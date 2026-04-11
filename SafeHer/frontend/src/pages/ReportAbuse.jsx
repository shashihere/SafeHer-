import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, UploadCloud } from 'lucide-react';

const ReportAbuse = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [platform, setPlatform] = useState('');
    const [evidence, setEvidence] = useState([]);
    
    // AI Analysis State
    const [analyzing, setAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleAnalyze = async () => {
        if (!content) return;
        setAnalyzing(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/analyze`, { text: content }, config);
            setAiResult(data);
        } catch (error) {
            console.error("Analysis error", error);
            alert(error.response?.data?.message || "Analysis failed. Please log out and log back in to refresh your session.");
        } finally {
            setAnalyzing(false);
        }
    };

    const handleFileChange = (e) => {
        setEvidence([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('content', content);
            formData.append('platform', platform);
            if (aiResult) {
                formData.append('aiScore', aiResult.toxicityScore);
                formData.append('severity', aiResult.severity);
            }
            evidence.forEach(file => {
                formData.append('evidence', file);
            });

            const config = { 
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                } 
            };
            
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reports`, formData, config);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to submit report. Please log out and log back in.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col lg:flex-row gap-8 min-h-screen text-slate-800">
            <div className="flex-grow w-full lg:max-w-3xl">
                <header className="mb-8 p-6 bg-purple-50/50 rounded-3xl border border-purple-100 shadow-sm mt-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-playfair tracking-wide mb-3 text-purple-900">Report Abuse</h1>
                    <p className="text-slate-500 font-medium tracking-wide text-sm md:text-base">Take action securely. Your identity is completely protected, and our system will guide you.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white/90 backdrop-blur-sm border border-purple-100 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(167,139,250,0.06)]">
                        <label className="block text-sm font-bold uppercase tracking-widest text-purple-600 mb-4">Describe the Incident (or paste text)</label>
                        <textarea 
                            rows="5" 
                            className="w-full bg-slate-50/50 border border-purple-100 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 mb-6 transition-all resize-none shadow-inner placeholder:text-slate-400"
                            value={content}
                            onChange={(e) => { setContent(e.target.value); setAiResult(null); }}
                            placeholder="Paste the abusive message, comment, or intimately describe what happened..."
                            required
                        ></textarea>
                        
                        <button 
                            type="button" 
                            onClick={handleAnalyze} 
                            disabled={!content || analyzing}
                            className="text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all disabled:opacity-50 shadow-sm hover:shadow"
                        >
                            {analyzing ? 'Analyzing with AI...' : 'Run Analysis Check'}
                        </button>

                        {aiResult && (
                            <div className="mt-8 p-5 bg-pink-50/50 rounded-2xl border border-pink-100 text-slate-800 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="bg-pink-100 p-2 rounded-full mt-0.5">
                                        <AlertCircle className="w-6 h-6 text-pink-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-purple-900 font-playfair tracking-wide">AI Severity: {aiResult.severity} <span className="text-pink-600 font-sans font-extrabold text-sm opacity-90 border border-pink-200 px-2 py-0.5 rounded-full ml-2 bg-white">({aiResult.toxicityScore}% Toxic)</span></p>
                                        <p className="text-sm font-medium mt-3 text-slate-600 leading-relaxed bg-white/60 p-3 rounded-xl border border-pink-50 drop-shadow-sm">{aiResult.suggestedAction}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm border border-purple-100 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(167,139,250,0.06)]">
                        <label className="block text-sm font-bold uppercase tracking-widest text-purple-600 mb-4">Platform (Optional)</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-50/50 border border-purple-100 rounded-xl px-5 py-3.5 text-slate-700 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 mb-8 transition-all shadow-inner placeholder:text-slate-400"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            placeholder="e.g., Instagram, SMS, Office Email..."
                        />

                        <label className="block text-sm font-bold uppercase tracking-widest text-purple-600 mb-4">Upload Evidence (Screenshots/Images)</label>
                        <div className="relative border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-2xl p-10 hover:border-purple-400 hover:bg-purple-50 transition-all text-center group">
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                <UploadCloud className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-sm text-purple-700 font-bold uppercase tracking-widest">Click or drag files to upload</p>
                            <p className="text-xs text-slate-400 mt-2">Maximum file size: 5MB</p>
                            {evidence.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-purple-100">
                                    <p className="text-sm text-purple-900 font-bold bg-white inline-block px-4 py-1.5 rounded-full shadow-sm"><span className="text-lg text-pink-500">{evidence.length}</span> file(s) selected securely</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 pb-12">
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4.5 rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-75 uppercase tracking-widest text-sm hover:-translate-y-0.5"
                        >
                            {submitting ? 'Submitting Securely...' : 'Submit Final Report'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-full lg:w-[380px] lg:flex-shrink-0">
                <div className="sticky top-24 bg-white/80 backdrop-blur-md border border-purple-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(167,139,250,0.06)] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/50 rounded-full blur-2xl -z-10 -mr-10 -mt-10"></div>
                    
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-sm border border-purple-50">
                        <img 
                            src="/images/landing.png"
                            alt="Support" 
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                    
                    <h3 className="font-bold text-2xl font-playfair tracking-wide mb-4 text-purple-900 drop-shadow-sm">Always Here.</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">Your report will be completely encrypted and saved locally as evidence in your vault. We prioritize your privacy and do not automatically notify the abuser before you are ready.</p>
                    
                    <button className="w-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-bold uppercase tracking-widest text-xs py-4 rounded-full transition-all border border-red-100 shadow-sm hover:shadow flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Trigger Emergency Alert
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportAbuse;
