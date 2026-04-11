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

    if (loading) return <div className="p-8 text-center text-gray-600 font-sans tracking-wide">Decrypting vault...</div>;

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
        <div className="max-w-7xl mx-auto px-4 py-12 w-full min-h-screen bg-white text-[#615e5f]">
            <header className="mb-10 border-b border-[#c4b7b1] pb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-black border border-[#c4b7b1] shadow-inner">
                        <FolderLock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-cursive font-bold text-[#615e5f] tracking-widest">Evidence Vault</h1>
                        <p className="text-gray-600 tracking-wide mt-2">Secure storage for your uploaded screenshots and files.</p>
                    </div>
                </div>
            </header>

            {reports.length === 0 ? (
                <div className="bg-white border border-[#c4b7b1] p-16 text-center">
                    <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold font-cursive tracking-wider text-[#615e5f] mb-2">Vault is Empty</h3>
                    <p className="text-[#615e5f] uppercase tracking-widest text-sm">You have no evidence files stored. Upload screenshots when creating a report to save them here.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-white border border-gray-700 overflow-hidden hover:border-[#615e5f] transition-all group rounded-none">
                            <div className="p-4 bg-[#ffffff]/90 border-b border-[#c4b7b1] flex justify-between items-center">
                                <span className="text-xs text-gray-600 tracking-widest uppercase">Report from {new Date(report.createdAt).toLocaleDateString()}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-[#615e5f] text-white hover:bg-[#4a4748] font-bold uppercase tracking-widest px-2 py-1">
                                        {report.platform || 'General'}
                                    </span>
                                    <button onClick={() => generatePDF(report)} className="flex items-center gap-1 text-xs text-[#615e5f] bg-red-600 hover:bg-red-700 px-2 py-1 font-bold tracking-wider transition-colors">
                                        <FileText className="w-3 h-3"/> PDF
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-4 flex flex-col gap-4">
                                {report.evidenceUrls.map((url, i) => (
                                    <div key={i} className="relative aspect-video overflow-hidden bg-white border border-gray-700 group/image">
                                        <img 
                                            src={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} 
                                            alt="Evidence" 
                                            className="w-full h-full object-cover opacity-80 group-hover/image:opacity-100 transition-opacity hover:-0"
                                        />
                                        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <a href={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} target="_blank" rel="noreferrer" className="p-3 border-2 border-[#615e5f] hover:bg-black hover:text-white transition-colors rounded-none text-[#615e5f]">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                            <a href={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`} download className="p-3 bg-[#615e5f] text-white hover:bg-[#4a4748] hover:bg-[#4a4748] transition-colors rounded-none">
                                                <Download className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 pb-4">
                                <p className="text-sm text-gray-600 line-clamp-2 italic tracking-wide">"{report.content}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EvidenceVault;
