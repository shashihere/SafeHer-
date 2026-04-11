import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FolderLock, Image as ImageIcon, ExternalLink, Download } from 'lucide-react';

const EvidenceVault = () => {
    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reports`, config);
                setReports(data.filter(r => r.evidenceUrls && r.evidenceUrls.length > 0));
            } catch (error) {
                console.error("Error fetching reports", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, [user]);

    if (loading) return <div className="p-8 text-center text-gray-400 font-sans tracking-wide">Decrypting vault...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 w-full min-h-screen bg-black text-white">
            <header className="mb-10 border-b border-gray-800 pb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-white border border-gray-200 shadow-inner">
                        <FolderLock className="w-8 h-8 text-black" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-cursive font-bold text-white tracking-widest">Evidence Vault</h1>
                        <p className="text-gray-400 tracking-wide mt-2">Secure storage for your uploaded screenshots and files.</p>
                    </div>
                </div>
            </header>

            {reports.length === 0 ? (
                <div className="bg-black border border-gray-800 p-16 text-center">
                    <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold font-cursive tracking-wider text-white mb-2">Vault is Empty</h3>
                    <p className="text-gray-500 uppercase tracking-widest text-sm">You have no evidence files stored. Upload screenshots when creating a report to save them here.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-black border border-gray-700 overflow-hidden hover:border-white transition-all group rounded-none">
                            <div className="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                                <span className="text-xs text-gray-400 tracking-widest uppercase">Report from {new Date(report.createdAt).toLocaleDateString()}</span>
                                <span className="text-xs bg-white text-black font-bold uppercase tracking-widest px-2 py-1">
                                    {report.platform || 'General'}
                                </span>
                            </div>
                            
                            <div className="p-4 flex flex-col gap-4">
                                {report.evidenceUrls.map((url, i) => (
                                    <div key={i} className="relative aspect-video overflow-hidden bg-black border border-gray-700 group/image">
                                        <img 
                                            src={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} 
                                            alt="Evidence" 
                                            className="w-full h-full object-cover opacity-80 group-hover/image:opacity-100 transition-opacity grayscale hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <a href={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} target="_blank" rel="noreferrer" className="p-3 border-2 border-white hover:bg-white hover:text-black transition-colors rounded-none text-white">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                            <a href={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} download className="p-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-none">
                                                <Download className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 pb-4">
                                <p className="text-sm text-gray-400 line-clamp-2 italic tracking-wide">"{report.content}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EvidenceVault;
