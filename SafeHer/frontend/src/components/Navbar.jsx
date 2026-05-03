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
        <nav className="bg-[#fdfdfd] border-b-4 border-black sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="p-1 border-2 border-black rounded-full bg-yellow-300 group-hover:bg-blue-400 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                <img src="/logo.jpg" alt="Raksha Logo" className="w-9 h-9 object-cover rounded-full border-2 border-black" />
                            </div>
                            <span className="font-extrabold text-3xl tracking-widest uppercase font-cursive text-black">
                                Raksha
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                        {user ? (
                            <>
                                <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-bold">
                                    <Link to="/dashboard" className="text-black hover:text-blue-600 hover:-translate-y-1 transition-transform flex items-center gap-1.5" title="Action Center">
                                        <LayoutDashboard className="w-5 h-5" /> <span className="hidden xl:inline uppercase tracking-widest border-b-2 border-transparent hover:border-black">Action Center</span>
                                    </Link>
                                    <Link to="/laws" className="text-black hover:text-green-600 hover:-translate-y-1 transition-transform flex items-center gap-1.5" title="Cyber Laws">
                                        <Scale className="w-5 h-5" /> <span className="hidden xl:inline uppercase tracking-widest border-b-2 border-transparent hover:border-black">Laws</span>
                                    </Link>
                                    <a href="/#about" className="text-black hover:text-yellow-600 hover:-translate-y-1 transition-transform flex items-center gap-1.5" title="About Us">
                                        <span className="uppercase tracking-widest border-b-2 border-transparent hover:border-black">About</span>
                                    </a>
                                    <Link to="/track" className="bg-red-500 text-black border-2 border-black px-4 py-1.5 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1.5" title="Live Tracker">
                                        <Activity className="w-4 h-4 animate-pulse" /> <span className="hidden xl:inline uppercase tracking-widest">Tracker</span>
                                    </Link>
                                </div>
                                <div className="hidden md:flex items-center pl-6 border-l-2 border-black gap-4">
                                    <Link to="/account" className="text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white px-3 py-2 border-2 border-transparent hover:border-black transition-colors flex items-center gap-2 font-bold">
                                        Hi, {user.name} <Settings className="w-4 h-4" />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="hidden md:flex items-center gap-4">
                                <a href="/#about" className="text-black font-extrabold uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-4 transition-all">About</a>
                                <Link to="/login" className="text-black font-extrabold uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-4 transition-all">Log In</Link>
                                <Link to="/register" className="bg-yellow-400 text-black border-2 border-black px-6 py-2.5 font-extrabold uppercase tracking-widest text-sm hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">Create Account</Link>
                            </div>
                        )}
                        <button 
                            className="md:hidden p-2 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            
            {isOpen && (
                <div className="md:hidden border-t-4 border-black bg-white animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 pt-4 pb-8 space-y-4 font-bold text-lg">
                        {user ? (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-black hover:pl-4 transition-all uppercase tracking-widest border-b-2 border-black pb-4">
                                    <LayoutDashboard className="w-5 h-5" /> Action Center
                                </Link>
                                <Link to="/laws" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-black hover:pl-4 transition-all uppercase tracking-widest border-b-2 border-black pb-4">
                                    <Scale className="w-5 h-5" /> Laws
                                </Link>
                                <a href="/#about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-yellow-600 hover:pl-4 transition-all uppercase tracking-widest border-b-2 border-black pb-4">
                                    About Us
                                </a>
                                <Link to="/track" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-red-600 hover:pl-4 transition-all uppercase tracking-widest border-b-2 border-black pb-4">
                                    <Activity className="w-5 h-5 animate-pulse" /> Tracker
                                </Link>
                                <Link to="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-blue-600 hover:pl-4 transition-all uppercase tracking-widest border-b-2 border-black pb-4">
                                    <Settings className="w-5 h-5" /> Account Settings
                                </Link>
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 text-black hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest p-4 border-2 border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] mt-4">
                                    <LogOut className="w-5 h-5" /> Log Out
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-4 pt-4">
                                <a href="/#about" onClick={() => setIsOpen(false)} className="text-center bg-white text-black border-2 border-black py-4 font-extrabold uppercase tracking-widest hover:bg-gray-100 transition-colors">About Us</a>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center bg-white text-black border-2 border-black py-4 font-extrabold uppercase tracking-widest hover:bg-gray-100 transition-colors">Log In</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="text-center bg-yellow-400 text-black border-2 border-black py-4 font-extrabold uppercase tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">Create Account</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
