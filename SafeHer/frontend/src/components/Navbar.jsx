import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Settings, Scale, Activity } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center shrink-0">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="p-0.5 bg-blue-600 rounded-full overflow-hidden transition-all group-hover:scale-105 border border-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                <img src="/logo.jpg" alt="Raksha Logo" className="w-9 h-9 object-cover rounded-full" />
                            </div>
                            <span className="font-cursive font-bold text-2xl tracking-wide text-slate-800 transition-colors">
                                Raksha
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                        {user ? (
                            <>
                                <div className="hidden md:flex items-center gap-3 lg:gap-4 text-xs lg:text-sm">
                                    <Link to="/dashboard" className="text-slate-800 hover:text-slate-800 flex items-center gap-1.5 transition-colors" title="Action Center">
                                        <LayoutDashboard className="w-4 h-4" /> <span className="hidden xl:inline">Action Center</span>
                                    </Link>
                                    <Link to="/laws" className="text-slate-800 hover:text-slate-800 flex items-center gap-1.5 transition-colors" title="Cyber Laws">
                                        <Scale className="w-4 h-4" /> <span className="hidden xl:inline">Laws</span>
                                    </Link>
                                    <Link to="/track" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1.5 transition-colors" title="Live SOS Radar">
                                        <Activity className="w-4 h-4 animate-pulse" /> <span className="hidden xl:inline">Tracker</span>
                                    </Link>
                                </div>
                                
                                <div className="h-6 w-px bg-gray-700 mx-1 hidden md:block"></div>
                                
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-800 hidden lg:inline">Hi, {user.name}</span>
                                    <Link to="/account" className="text-slate-800 hover:text-slate-800 transition-colors" title="Account Settings">
                                        <Settings className="w-4 h-4" />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-800 hover:text-slate-800 transition-colors text-sm">Login</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-none font-bold transition-colors uppercase tracking-widest text-xs border-2 border-blue-600 whitespace-nowrap">
                                    Sign Up Free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
