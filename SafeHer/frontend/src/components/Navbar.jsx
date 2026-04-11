import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, LogOut, LayoutDashboard, FileWarning, Search, FolderLock, Settings, AlertTriangle, Scale, MessageCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSOS = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const message = `🚨 EMERGENCY SOS 🚨\nI need help immediately. Here is my live location coordinates:\nhttps://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                    
                    window.open(whatsappUrl, '_blank');
                    alert(`🚨 SECURE ALERT TRIGGERED 🚨\n\nYour precise location (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) has been locked.\n\nPlease send the auto-generated WhatsApp message to your emergency contacts or local authorities.`);
                },
                (error) => {
                    alert("⚠️ SOS WARNING: Please enable Location Services in your browser to broadcast your coordinates.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center shrink-0">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="p-0.5 bg-white rounded-full overflow-hidden transition-all group-hover:scale-105 border border-purple-100 shadow-[0_0_15px_rgba(167,139,250,0.15)]">
                                <img src="/logo.jpg" alt="SafeHer Logo" className="w-9 h-9 object-cover rounded-full" />
                            </div>
                            <span className="font-cursive text-2xl tracking-wide text-purple-900 transition-colors">
                                SafeHer
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                        {user ? (
                            <>
                                <div className="hidden md:flex items-center gap-3 lg:gap-4 text-xs lg:text-sm font-medium">
                                    <Link to="/dashboard" className="text-slate-600 hover:text-purple-600 flex items-center gap-1.5 transition-colors" title="Dashboard">
                                        <LayoutDashboard className="w-4 h-4" /> <span className="hidden xl:inline">Dashboard</span>
                                    </Link>
                                    <Link to="/report" className="text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-1.5 transition-colors" title="Report Abuse">
                                        <FileWarning className="w-4 h-4" /> <span className="hidden xl:inline">Report Abuse</span>
                                    </Link>
                                    <Link to="/analyzer" className="text-slate-600 hover:text-purple-600 flex items-center gap-1.5 transition-colors" title="AI Analyzer">
                                        <Search className="w-4 h-4" /> <span className="hidden xl:inline">Analyzer</span>
                                    </Link>
                                    <Link to="/vault" className="text-slate-600 hover:text-purple-600 flex items-center gap-1.5 transition-colors" title="Evidence Vault">
                                        <FolderLock className="w-4 h-4" /> <span className="hidden xl:inline">Vault</span>
                                    </Link>
                                    <Link to="/forum" className="text-slate-600 hover:text-purple-600 flex items-center gap-1.5 transition-colors" title="Anonymous Forum">
                                        <MessageCircle className="w-4 h-4" /> <span className="hidden xl:inline">Forum</span>
                                    </Link>
                                    <Link to="/laws" className="text-slate-600 hover:text-purple-600 flex items-center gap-1.5 transition-colors" title="Cyber Laws">
                                        <Scale className="w-4 h-4" /> <span className="hidden xl:inline">Laws</span>
                                    </Link>
                                </div>
                                
                                <div className="h-6 w-px bg-purple-100 mx-1 hidden md:block"></div>
                                
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-500 hidden lg:inline font-medium">Hi, {user.name}</span>
                                    <Link to="/account" className="text-slate-400 hover:text-purple-500 transition-colors" title="Account Settings">
                                        <Settings className="w-4 h-4" />
                                    </Link>
                                    <button onClick={handleLogout} className="text-slate-400 hover:text-purple-500 transition-colors" title="Logout">
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>

                                <button onClick={handleSOS} className="ml-1 md:ml-2 bg-[#F87171] hover:bg-red-400 text-white px-4 py-1.5 font-bold tracking-widest text-xs flex items-center gap-1.5 animate-pulse rounded-full shadow-[0_0_15px_rgba(248,113,113,0.4)] whitespace-nowrap transition-colors">
                                    <AlertTriangle className="w-4 h-4" /> SOS
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-500 font-medium hover:text-purple-600 transition-colors text-sm">Login</Link>
                                <Link to="/register" className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-5 py-2 rounded-full font-bold transition-all uppercase tracking-widest text-xs shadow-md shadow-pink-200 whitespace-nowrap ml-2">
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
