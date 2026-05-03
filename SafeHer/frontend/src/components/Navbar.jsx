import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Settings, Scale, Activity, Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    return (
        <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="p-1 border-2 border-white/20 rounded-full group-hover:border-blue-500 transition-colors shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                <img src="/logo.jpg" alt="Raksha Logo" className="w-9 h-9 object-cover rounded-full" />
                            </div>
                            <span className="font-extrabold text-2xl tracking-widest uppercase font-cursive text-white group-hover:text-blue-400 transition-colors">
                                Raksha
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                        {user ? (
                            <>
                                <div className="hidden md:flex items-center gap-3 lg:gap-4 text-xs lg:text-sm">
                                    <Link to="/dashboard" className="text-slate-300 hover:text-blue-400 flex items-center gap-1.5 transition-colors" title="Action Center">
                                        <LayoutDashboard className="w-4 h-4" /> <span className="hidden xl:inline">Action Center</span>
                                    </Link>
                                    <Link to="/laws" className="text-slate-300 hover:text-blue-400 flex items-center gap-1.5 transition-colors" title="Cyber Laws">
                                        <Scale className="w-4 h-4" /> <span className="hidden xl:inline">Laws</span>
                                    </Link>
                                    <Link to="/track" className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1.5 transition-colors drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" title="Live Tracker">
                                        <Activity className="w-4 h-4 animate-pulse" /> <span className="hidden xl:inline">Tracker</span>
                                    </Link>
                                </div>
                                <div className="hidden md:flex items-center pl-4 border-l border-white/20 gap-4">
                                    <Link to="/account" className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                                        Hi, {user.name} <Settings className="w-4 h-4" />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/login" className="text-slate-300 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors">Log In</Link>
                                <Link to="/register" className="bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600 hover:text-white px-5 py-2 font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]">Create Account</Link>
                            </div>
                        )}
                        <button 
                            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            
            {isOpen && (
                <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {user ? (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-widest text-xs font-bold py-3 border-b border-white/5">
                                    <LayoutDashboard className="w-4 h-4" /> Action Center
                                </Link>
                                <Link to="/laws" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-widest text-xs font-bold py-3 border-b border-white/5">
                                    <Scale className="w-4 h-4" /> Laws
                                </Link>
                                <Link to="/track" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest text-xs font-bold py-3 border-b border-white/5 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                                    <Activity className="w-4 h-4 animate-pulse" /> Tracker
                                </Link>
                                <Link to="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold py-3 border-b border-white/5">
                                    <Settings className="w-4 h-4" /> Account Settings
                                </Link>
                                <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest text-xs font-bold py-3">
                                    <LogOut className="w-4 h-4" /> Log Out
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3 pt-4">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center bg-slate-800/50 text-white border border-white/10 hover:bg-slate-800 py-3 font-bold uppercase tracking-widest text-xs transition-colors">Log In</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="text-center bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600 hover:text-white py-3 font-bold uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]">Create Account</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
