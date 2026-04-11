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
        <div className="max-w-4xl mx-auto px-4 py-12 w-full bg-transparent min-h-screen text-[#615e5f]">
            <div className="text-center mb-12">
                <div className="inline-block p-4 bg-black rounded-2xl mb-4">
                    <Search className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-cursive font-bold mb-4 tracking-wider">AI Toxicity Analyzer</h1>
                <p className="text-gray-600 max-w-xl mx-auto font-sans">
                    Unsure if a message crosses the line? Paste it below. Our SafeHer AI will analyze it for toxicity, harassment, and threats.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white text-[#615e5f] border border-[#615e5f] text-sm uppercase tracking-widest font-bold font-sans">
                    <Shield className="w-4 h-4 text-[#615e5f]" /> AI is Watching Out for You.
                </div>
            </div>

            <div className="bg-white border border-gray-700 rounded-none p-6 mb-8 group hover:border-[#615e5f] transition-colors">
                <textarea 
                    className="w-full bg-transparent border border-gray-700 rounded-none p-6 text-xl text-[#615e5f] placeholder-gray-600 focus:outline-none focus:border-[#615e5f] resize-none transition-colors"
                    rows="4"
                    placeholder="Paste the suspicious message here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={handleAnalyze}
                        disabled={loading || !text}
                        className="bg-black hover:bg-[#4a4748] text-white px-8 py-3 rounded-none font-bold transition-colors disabled:opacity-50 uppercase tracking-widest text-sm border-2 border-[#615e5f]"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Message'}
                    </button>
                </div>
            </div>

            {result && (
                <div className="p-8 rounded-none border-2 bg-white border-[#615e5f] transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <AlertTriangle className="w-8 h-8 text-[#615e5f]" />
                        <h2 className="text-2xl font-bold font-cursive tracking-widest">Analysis Complete</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-1 uppercase tracking-widest text-sm font-bold">Toxicity Score</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-extrabold">{result.toxicityScore}%</span>
                                <span className="text-lg font-medium text-gray-600">
                                    ({result.severity} Severity)
                                </span>
                            </div>
                            
                            {/* Visual Progress Bar - B&W */}
                            <div className="w-full h-3 bg-[#ffffff]/90 rounded-none mt-4 overflow-hidden border border-gray-700">
                                <div 
                                    className="h-full bg-black"
                                    style={{ width: `${Math.max(result.toxicityScore, 5)}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-gray-600 mb-1 uppercase tracking-widest text-sm font-bold">Suggested Action</p>
                            <p className="text-xl font-medium text-[#615e5f] p-4 border border-[#c4b7b1] bg-[#ffffff]/90/50">{result.suggestedAction}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analyzer;
