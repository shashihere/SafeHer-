import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, Menu, X, Activity, Scale, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-extrabold text-2xl tracking-tight text-[#1d1d1d]">
                                Raksha
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {user ? (
                            <>
                                <div className="flex items-center gap-6">
                                    <Link to="/dashboard" className="text-gray-600 font-semibold hover:text-blue-600 transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link to="/laws" className="text-gray-600 font-semibold hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                        Laws
                                    </Link>
                                    <a href="/#about" className="text-gray-600 font-semibold hover:text-blue-600 transition-colors">
                                        About
                                    </a>
                                    <Link to="/track" className="bg-rose-50 text-rose-600 px-4 py-2 rounded-full font-bold hover:bg-rose-100 transition-colors flex items-center gap-2">
                                        <Activity className="w-4 h-4 animate-pulse" /> Tracker
                                    </Link>
                                </div>
                                <div className="h-6 w-px bg-gray-200"></div>
                                <div className="flex items-center gap-4">
                                    <Link to="/account" className="flex items-center gap-2 text-[#1d1d1d] hover:text-blue-600 font-bold transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <User className="w-4 h-4" />
                                        </div>
                                        {user.name?.split(' ')[0] || 'User'}
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="hidden md:flex items-center gap-6">
                                <a href="/#about" className="text-gray-600 font-semibold hover:text-blue-600 transition-colors">About</a>
                                <Link to="/login" className="text-gray-600 font-semibold hover:text-blue-600 transition-colors">Log In</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                    Get the App
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-[#1d1d1d] focus:outline-none p-2"
                        >
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
                    <div className="px-4 py-8 space-y-8">
                        {user ? (
                            <>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <User className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-[#1d1d1d]">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block p-4 font-bold text-gray-700 bg-gray-50 rounded-2xl hover:bg-gray-100">
                                        Dashboard
                                    </Link>
                                    <Link to="/laws" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 font-bold text-gray-700 bg-gray-50 rounded-2xl hover:bg-gray-100">
                                        <Scale className="w-5 h-5" /> Cyber Laws
                                    </Link>
                                    <a href="/#about" onClick={() => setIsOpen(false)} className="block p-4 font-bold text-gray-700 bg-gray-50 rounded-2xl hover:bg-gray-100">
                                        About Us
                                    </a>
                                    <Link to="/track" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 font-bold text-rose-600 bg-rose-50 rounded-2xl hover:bg-rose-100">
                                        <Activity className="w-5 h-5 animate-pulse" /> Live Tracker
                                    </Link>
                                </div>
                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <Link to="/account" onClick={() => setIsOpen(false)} className="block p-4 font-bold text-gray-700 bg-gray-50 rounded-2xl hover:bg-gray-100">
                                        Account Settings
                                    </Link>
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full flex items-center justify-center gap-2 p-4 font-bold text-red-600 bg-red-50 rounded-2xl hover:bg-red-100">
                                        <LogOut className="w-5 h-5" /> Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <a href="/#about" onClick={() => setIsOpen(false)} className="block p-4 text-center font-bold text-gray-700 bg-gray-50 rounded-2xl">About Us</a>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block p-4 text-center font-bold text-gray-700 bg-gray-50 rounded-2xl">Log In</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block p-4 text-center font-bold text-white bg-blue-600 rounded-2xl shadow-lg">Get the App</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
