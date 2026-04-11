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
            const { data } = await axios.post('http://localhost:5000/api/analyze', { text: content }, config);
            setAiResult(data);
        } catch (error) {
            console.error("Analysis error", error);
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
            
            await axios.post('http://localhost:5000/api/reports', formData, config);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 w-full flex gap-8 bg-black min-h-screen text-white">
            <div className="flex-grow max-w-2xl">
                <header className="mb-8">
                    <h1 className="text-5xl font-bold font-cursive tracking-widest mb-2">Report Abuse.</h1>
                    <p className="text-gray-400 uppercase tracking-widest text-sm">Take action securely. Your identity is protected.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-black border border-gray-700 p-6 rounded-none shadow-none">
                        <label className="block text-sm font-bold uppercase tracking-widest text-white mb-4">Describe the Incident (or paste text)</label>
                        <textarea 
                            rows="4" 
                            className="w-full bg-black border border-gray-700 rounded-none px-4 py-3 text-white focus:outline-none focus:border-white mb-4 transition-colors"
                            value={content}
                            onChange={(e) => { setContent(e.target.value); setAiResult(null); }}
                            placeholder="Paste the abusive message, comment, or describe what happened..."
                            required
                        ></textarea>
                        
                        <button 
                            type="button" 
                            onClick={handleAnalyze} 
                            disabled={!content || analyzing}
                            className="text-sm border-2 border-white hover:bg-white hover:text-black px-4 py-2 rounded-none font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                        >
                            {analyzing ? 'Analyzing with AI...' : 'Run Analysis Check'}
                        </button>

                        {aiResult && (
                            <div className="mt-6 p-4 rounded-none border border-white text-white">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-lg">AI Severity: {aiResult.severity} ({aiResult.toxicityScore}% Toxic)</p>
                                        <p className="text-sm opacity-90 mt-1 uppercase tracking-widest text-xs mt-2 text-gray-400">{aiResult.suggestedAction}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-black border border-gray-700 p-6 rounded-none shadow-none">
                        <label className="block text-sm font-bold uppercase tracking-widest text-white mb-4">Platform (Optional)</label>
                        <input 
                            type="text" 
                            className="w-full bg-black border border-gray-700 rounded-none px-4 py-3 text-white focus:outline-none focus:border-white mb-8 transition-colors"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            placeholder="e.g., Instagram, Twitter, SMS"
                        />

                        <label className="block text-sm font-bold uppercase tracking-widest text-white mb-4">Upload Evidence (Screenshots/Images)</label>
                        <div className="relative border-2 border-dashed border-gray-600 rounded-none p-8 hover:border-white hover:bg-gray-900 transition-all text-center">
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <UploadCloud className="w-8 h-8 text-white mx-auto mb-2" />
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Click or drag files to upload</p>
                            {evidence.length > 0 && <p className="text-sm text-white mt-4 font-bold border-t border-gray-700 pt-4"><span className="text-lg">{evidence.length}</span> file(s) selected</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="flex-1 bg-white text-black font-extrabold py-4 rounded-none transition-all hover:bg-gray-200 disabled:opacity-75 uppercase tracking-widest"
                        >
                            {submitting ? 'Submitting Securely...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="hidden lg:block w-[400px]">
                <div className="sticky top-24 bg-black border border-gray-800 rounded-none p-6">
                    <img 
                        src="/images/first_image.jpg"
                        alt="Support" 
                        className="w-full h-48 object-cover rounded-none mb-6 grayscale opacity-80"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <h3 className="font-bold text-2xl font-cursive tracking-widest mb-4">Support</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">Your report will be completely encrypted and saved locally as evidence. We prioritize your privacy and do not automatically notify the abuser.</p>
                    <button className="w-full bg-black border-2 border-white text-white font-bold uppercase tracking-widest text-xs py-4 rounded-none hover:bg-white hover:text-black transition-colors">
                        Alert Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportAbuse;
