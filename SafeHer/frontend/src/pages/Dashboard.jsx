import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reports`, config);
                setReports(data);
            } catch (error) {
                console.error("Error fetching reports", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, [user]);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading your secure dashboard...</div>;

    const highSeverityCount = reports.filter(r => r.severity === 'High').length;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 w-full min-h-screen text-slate-800 flex flex-col gap-8">
            <header className="mb-4">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-purple-900 tracking-wide mb-3">Welcome, {user.name}</h1>
                <p className="text-slate-500 uppercase tracking-widest text-sm font-medium">Your reports are secure, encrypted, and confidential.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6 mb-4">
                <div className="bg-white/80 backdrop-blur-md border border-purple-100 shadow-[0_8px_30px_rgba(167,139,250,0.1)] p-6 rounded-3xl flex items-center gap-5 hover:-translate-y-1 transition-all">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl shadow-inner"><FileText className="w-8 h-8" /></div>
                    <div>
                        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Total Reports</p>
                        <h3 className="text-4xl font-extrabold text-purple-900">{reports.length}</h3>
                    </div>
                </div>
                <div className="bg-white/80 backdrop-blur-md border border-pink-100 shadow-[0_8px_30px_rgba(244,114,182,0.1)] p-6 rounded-3xl flex items-center gap-5 hover:-translate-y-1 transition-all">
                    <div className="p-4 bg-pink-50 text-pink-500 rounded-2xl shadow-inner"><AlertTriangle className="w-8 h-8" /></div>
                    <div>
                        <p className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-1">High Severity</p>
                        <h3 className="text-4xl font-extrabold text-pink-600">{highSeverityCount}</h3>
                    </div>
                </div>
                <div className="bg-white/80 backdrop-blur-md border border-emerald-100 shadow-[0_8px_30px_rgba(16,185,129,0.1)] p-6 rounded-3xl flex items-center gap-5 opacity-70 cursor-not-allowed">
                    <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl shadow-inner"><CheckCircle className="w-8 h-8" /></div>
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Resolved</p>
                        <h3 className="text-4xl font-extrabold text-slate-500">0</h3>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-2 border-b border-purple-100 pb-4">
                <h2 className="text-2xl font-bold font-playfair tracking-wide text-purple-900">Recent Reports</h2>
                <Link to="/report" className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md px-5 py-2.5 rounded-full transition-all font-bold uppercase tracking-widest hover:shadow-lg">
                    + New Report
                </Link>
            </div>

            {reports.length === 0 ? (
                <div className="bg-white border border-purple-100 shadow-[0_8px_30px_rgba(167,139,250,0.05)] rounded-3xl p-16 text-center">
                    <img 
                        src="/images/landing.png"
                        alt="No reports" 
                        className="w-40 h-40 object-cover mx-auto mb-6 opacity-60"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <h3 className="text-2xl font-bold text-purple-900 mb-3 font-playfair tracking-wide">No Reports Yet</h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-8 text-sm leading-relaxed">You haven't filed any reports. Your dashboard is clear. If you ever feel unsafe, you know where to go.</p>
                    <Link to="/report" className="inline-block bg-purple-50 text-purple-600 hover:bg-purple-100 px-8 py-3 rounded-full font-bold uppercase tracking-widest shadow-sm transition-colors border border-purple-100">
                        File a Report
                    </Link>
                </div>
            ) : (
                <div className="bg-white border border-purple-100 shadow-[0_8px_30px_rgba(167,139,250,0.05)] rounded-3xl overflow-hidden mb-12">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="text-xs text-purple-700 uppercase tracking-widest bg-purple-50/50 border-b border-purple-100">
                                <tr>
                                    <th className="px-6 py-5 font-bold">Date</th>
                                    <th className="px-6 py-5 font-bold">Platform</th>
                                    <th className="px-6 py-5 font-bold">Severity</th>
                                    <th className="px-6 py-5 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report._id} className="border-t border-purple-50 hover:bg-purple-50/30 transition-colors">
                                        <td className="px-6 py-5 flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap">
                                            <div className="p-2 bg-slate-50 rounded-full"><Clock className="w-4 h-4 text-slate-400" /></div>
                                            {new Date(report.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-5 font-bold uppercase tracking-widest text-slate-700">{report.platform || 'General'}</td>
                                        <td className="px-6 py-5">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm
                                                ${report.severity === 'High' ? 'bg-red-100 text-red-600 border border-red-200' : 
                                                  report.severity === 'Medium' ? 'bg-orange-100 text-orange-600 border border-orange-200' : 
                                                  'bg-green-100 text-green-600 border border-green-200'}
                                            `}>
                                                {report.severity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-purple-500 uppercase tracking-widest text-xs font-bold">
                                            <span className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span> Under Review
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
