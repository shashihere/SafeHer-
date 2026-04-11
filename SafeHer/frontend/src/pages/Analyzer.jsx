import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Search, Shield, AlertTriangle } from 'lucide-react';

const Analyzer = () => {
    const { user } = useContext(AuthContext);
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/analyze`, { text }, config);
            setResult(data);
        } catch (error) {
            console.error("Analysis error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 w-full min-h-screen text-slate-800">
            <div className="text-center mb-12">
                <div className="inline-flex justify-center items-center p-5 bg-purple-50 shadow-inner rounded-full mb-6 border border-purple-100">
                    <Search className="w-10 h-10 text-purple-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 tracking-wide text-purple-900">AI Toxicity Analyzer</h1>
                <p className="text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
                    Unsure if a message crosses the line? Paste it below. Our SafeHer AI will analyze it for toxicity, harassment, and threats. You are safe here.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 border border-pink-200 rounded-full text-xs uppercase tracking-widest font-bold shadow-sm">
                    <Shield className="w-4 h-4 text-pink-500" /> Private & Protected Analysis
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-purple-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 md:p-8 mb-8 transition-colors">
                <textarea 
                    className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl p-6 text-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 resize-none transition-all shadow-inner"
                    rows="4"
                    placeholder="Paste the suspicious message here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={handleAnalyze}
                        disabled={loading || !text}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3.5 rounded-full font-bold transition-all disabled:opacity-50 tracking-widest text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Message'}
                    </button>
                </div>
            </div>

            {result && (
                <div className="p-8 rounded-3xl border border-purple-200 bg-white/90 shadow-xl shadow-purple-900/5 transition-all animate-fadeIn">
                    <div className="flex items-center gap-4 mb-8 border-b border-purple-50 pb-6">
                        <div className="p-3 bg-red-50 text-red-500 rounded-full">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold font-playfair tracking-wide text-slate-800">Analysis Complete</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-purple-50/30 p-6 rounded-2xl border border-purple-50">
                            <p className="text-purple-400 mb-2 uppercase tracking-widest text-xs font-bold">Toxicity Score</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-extrabold text-purple-900">{result.toxicityScore}%</span>
                                <span className="text-base font-medium text-slate-500">
                                    ({result.severity} Severity)
                                </span>
                            </div>
                            
                            {/* Visual Progress Bar */}
                            <div className="w-full h-3 bg-purple-100 rounded-full mt-6 overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${result.toxicityScore > 70 ? 'bg-red-400' : result.toxicityScore > 40 ? 'bg-orange-400' : 'bg-green-400'}`}
                                    style={{ width: `${Math.max(result.toxicityScore, 5)}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div className="bg-purple-50/30 p-6 rounded-2xl border border-purple-50">
                            <p className="text-purple-400 mb-3 uppercase tracking-widest text-xs font-bold">Suggested Action</p>
                            <p className="text-lg font-medium text-slate-700 leading-relaxed">{result.suggestedAction}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analyzer;
