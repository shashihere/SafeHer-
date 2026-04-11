import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FolderLock, Image as ImageIcon, ExternalLink, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

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

    const generatePDF = (report) => {
        const doc = new jsPDF();
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(220, 38, 38);
        doc.text('SAFEHER CYBER REPORT', 20, 20);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        doc.text(`Incident ID: ${report._id}`, 20, 35);
        doc.text(`Date & Time: ${new Date(report.createdAt).toLocaleString()}`, 20, 45);
        doc.text(`Platform: ${report.platform || 'General'}`, 20, 55);
        doc.text(`AI Toxicity Score: ${report.aiScore || report.toxicityScore || 'N/A'}%`, 20, 65);
        doc.text(`Assigned Severity: ${report.severity}`, 20, 75);

        doc.setFont('helvetica', 'bold');
        doc.text('Incident Description / Evidence Text:', 20, 95);
        
        doc.setFont('helvetica', 'normal');
        const splitText = doc.splitTextToSize(`"${report.content}"`, 170);
        doc.text(splitText, 20, 105);

        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(10);
        doc.text('* This is an auto-generated formal report by the SafeHer Platform *', 20, 280);
        doc.text('* Please attach any external image/video media alongside this document. *', 20, 285);

        doc.save(`SafeHer_Report_${report._id.substring(0,6)}.pdf`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 w-full min-h-screen text-slate-800">
            <header className="mb-10 border-b border-purple-100 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-purple-50 border border-purple-100 shadow-sm rounded-2xl">
                        <FolderLock className="w-8 h-8 text-purple-500" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-purple-900 tracking-wide mb-2">Evidence Vault</h1>
                        <p className="text-slate-500 tracking-wide font-sans text-sm md:text-base">Secure storage for your uploaded screenshots and files.</p>
                    </div>
                </div>
            </header>

            {/* Women Hero Banner */}
            <div className="mb-12 w-full rounded-3xl overflow-hidden border border-purple-100 shadow-md relative bg-white transition-all hover:shadow-lg">
                <img src="/vault-hero.jpg" alt="Women Empowerment" className="w-full object-contain md:object-cover md:h-72 opacity-95 transition-all duration-700" />
            </div>

            {reports.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-md border border-purple-100 p-16 text-center rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-10 h-10 text-purple-300" />
                    </div>
                    <h3 className="text-2xl font-bold font-playfair tracking-wide text-purple-900 mb-3">Vault is Empty</h3>
                    <p className="text-slate-500 tracking-wide text-sm max-w-lg mx-auto">You have no evidence files stored. Upload screenshots when creating a report to save them securely here. You are safe.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-white/90 backdrop-blur-sm border border-purple-100 hover:border-pink-200 hover:shadow-xl hover:-translate-y-1 overflow-hidden transition-all duration-300 group rounded-3xl flex flex-col">
                            <div className="p-5 bg-purple-50/50 border-b border-purple-100 flex justify-between items-center">
                                <span className="text-xs text-purple-600 tracking-widest uppercase font-semibold">Dec {new Date(report.createdAt).toLocaleDateString()}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-white text-purple-700 border border-purple-100 font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                                        {report.platform || 'General'}
                                    </span>
                                    <button onClick={() => generatePDF(report)} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 px-3 py-1.5 font-bold tracking-wider transition-all rounded-full shadow-sm hover:shadow-md">
                                        <FileText className="w-3.5 h-3.5"/> PDF
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-5 flex flex-col gap-4 flex-grow">
                                {report.evidenceUrls.map((url, i) => (
                                    <div key={i} className="relative aspect-video overflow-hidden bg-slate-100 border border-slate-200 rounded-2xl group/image">
                                        <img 
                                            src={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} 
                                            alt="Evidence" 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                                            <a href={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} target="_blank" rel="noreferrer" className="p-3 bg-white/20 hover:bg-white text-white hover:text-purple-600 transition-colors rounded-full shadow-lg backdrop-blur-md">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                            <a href={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} download className="p-3 bg-white/20 hover:bg-white text-white hover:text-purple-600 transition-colors rounded-full shadow-lg backdrop-blur-md">
                                                <Download className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-auto pt-2">
                                    <p className="text-sm text-slate-600 line-clamp-3 italic tracking-wide leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">"{report.content}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EvidenceVault;
