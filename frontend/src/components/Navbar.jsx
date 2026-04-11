import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, LogOut, LayoutDashboard, FileWarning, Search, FolderLock, Settings } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-white rounded-lg transition-all group-hover:bg-gray-200">
                                <ShieldCheck className="w-6 h-6 text-black" />
                            </div>
                            <span className="font-cursive font-bold text-3xl tracking-wide text-white transition-colors">
                                SafeHer
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                </Link>
                                <Link to="/report" className="text-white hover:text-gray-300 font-medium flex items-center gap-2 transition-colors">
                                    <FileWarning className="w-4 h-4" /> Report Abuse
                                </Link>
                                <Link to="/analyzer" className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                                    <Search className="w-4 h-4" /> AI Analyzer
                                </Link>
                                <Link to="/vault" className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                                    <FolderLock className="w-4 h-4" /> Vault
                                </Link>
                                <div className="h-6 w-px bg-gray-700 mx-2"></div>
                                <span className="text-sm text-gray-400">Hi, {user.name}</span>
                                <Link to="/account" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors title='Account Settings'">
                                    <Settings className="w-4 h-4" />
                                </Link>
                                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" title="Logout">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                                <Link to="/register" className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-none font-bold transition-colors uppercase tracking-widest text-sm border-2 border-white">
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
