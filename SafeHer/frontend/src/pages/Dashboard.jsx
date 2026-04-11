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
        <div className="max-w-7xl mx-auto px-4 py-8 w-full bg-black min-h-screen text-white">
            <header className="mb-10">
                <h1 className="text-4xl font-cursive font-bold text-white tracking-widest mb-2">Welcome, {user.name}</h1>
                <p className="text-gray-400 uppercase tracking-widest text-sm">Your reports are secure and confidential.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-black border border-gray-700 p-6 rounded-none flex items-center gap-4">
                    <div className="p-4 bg-white text-black"><FileText /></div>
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total Reports</p>
                        <h3 className="text-3xl font-extrabold font-sans text-white mt-1">{reports.length}</h3>
                    </div>
                </div>
                <div className="bg-black border border-gray-700 p-6 rounded-none flex items-center gap-4">
                    <div className="p-4 bg-gray-800 text-white"><AlertTriangle /></div>
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">High Severity</p>
                        <h3 className="text-3xl font-extrabold font-sans text-white mt-1">{highSeverityCount}</h3>
                    </div>
                </div>
                <div className="bg-black border border-gray-700 p-6 rounded-none flex items-center gap-4">
                    <div className="p-4 bg-gray-900 border border-gray-800 text-gray-400"><CheckCircle /></div>
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Resolved (Mock)</p>
                        <h3 className="text-3xl font-extrabold font-sans text-gray-500 mt-1">0</h3>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                <h2 className="text-2xl font-bold font-cursive tracking-widest">Recent Reports</h2>
                <Link to="/report" className="text-sm bg-white text-black hover:bg-gray-200 border border-white px-4 py-2 rounded-none transition-colors font-bold uppercase tracking-widest">
                    + New Report
                </Link>
            </div>

            {reports.length === 0 ? (
                <div className="bg-black border border-gray-800 rounded-none p-12 text-center">
                    <img 
                        src="/images/first_image.jpg"
                        alt="No reports" 
                        className="w-32 h-32 object-cover mx-auto mb-6 opacity-80 grayscale mix-blend-lighten"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <h3 className="text-2xl font-bold text-white mb-2 font-cursive tracking-widest">No Reports Yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-6 text-sm uppercase tracking-widest">You haven't filed any reports. Your dashboard is clear.</p>
                    <Link to="/report" className="inline-block bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-none font-extrabold uppercase tracking-widest border-2 border-white transition-colors">
                        File a Report
                    </Link>
                </div>
            ) : (
                <div className="bg-black border border-gray-700 rounded-none overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="text-xs text-white uppercase tracking-widest bg-gray-900 border-b border-gray-700">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Platform</th>
                                    <th className="px-6 py-4">Severity</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report._id} className="border-t border-gray-800 hover:bg-gray-900/50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-2 text-gray-400">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            {new Date(report.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-bold uppercase tracking-widest">{report.platform || 'General'}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-none text-xs font-bold uppercase tracking-widest border border-gray-600 bg-gray-800 text-white">
                                                {report.severity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 uppercase tracking-widest text-xs font-bold">Under Review</td>
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
