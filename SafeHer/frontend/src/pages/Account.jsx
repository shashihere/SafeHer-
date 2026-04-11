import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, ShieldAlert, Key, Settings, Trash2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteAccount = () => {
        setIsDeleting(true);
        // Mock delete action
        setTimeout(() => {
            setIsDeleting(false);
            setShowSuccess(true);
            setTimeout(() => {
                logout();
                navigate('/');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="bg-black min-h-[calc(100vh-80px)] text-white pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-6xl md:text-8xl font-cursive mb-6">Your Sanctuary</h1>
                    <p className="text-gray-400 font-sans uppercase tracking-widest text-sm border-b border-gray-800 pb-8">
                        Manage your secure identity and privacy settings.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Sidebar / Nav (Visual mock for now) */}
                    <div className="md:col-span-1 space-y-2 font-sans tracking-widest uppercase text-xs font-bold">
                        <button className="w-full text-left bg-white text-black px-6 py-4 flex items-center gap-3 transition-all hover:bg-gray-200">
                            <User className="w-4 h-4" /> Profile Info
                        </button>
                        <button className="w-full text-left bg-black text-white border border-gray-800 px-6 py-4 flex items-center gap-3 transition-all hover:border-white hover:pl-8">
                            <Key className="w-4 h-4" /> Security
                        </button>
                        <button className="w-full text-left bg-black text-white border border-gray-800 px-6 py-4 flex items-center gap-3 transition-all hover:border-white hover:pl-8">
                            <Settings className="w-4 h-4" /> Preferences
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-2 space-y-12">
                        
                        {/* Profile Section */}
                        <section className="bg-black border border-gray-800 p-8 md:p-12 group hover:border-white transition-colors duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 border-l border-b border-gray-800 opacity-50 group-hover:border-white transition-all transform translate-x-12 -translate-y-12 rotate-45 group-hover:rotate-90 duration-700"></div>
                            
                            <h2 className="text-3xl font-cursive mb-8 tracking-wide">Identity Details</h2>
                            
                            <div className="space-y-6">
                                <div className="group/field">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 transition-colors group-hover/field:text-gray-300">Registered Name</label>
                                    <div className="w-full border border-gray-800 bg-black px-4 py-4 text-white font-sans text-lg cursor-not-allowed opacity-80 decoration-dashed underline underline-offset-8">
                                        {user?.name || 'SafeHer User'}
                                    </div>
                                </div>
                                <div className="group/field">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 transition-colors group-hover/field:text-gray-300">Registered Email</label>
                                    <div className="w-full border border-gray-800 bg-black px-4 py-4 text-white font-sans text-lg cursor-not-allowed opacity-80 decoration-dashed underline underline-offset-8">
                                        {user?.email || 'user@email.com'}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Danger Zone */}
                        <section className="bg-black border border-gray-800 p-8 md:p-12 hover:border-red-900 transition-colors duration-500">
                            <h2 className="text-3xl font-cursive mb-4 tracking-wide text-white">Danger Zone</h2>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                Erasing your account will permanently delete your identity and wipe all securely stored evidence from the SafeHer Vault. This action cannot be reversed.
                            </p>

                            {showSuccess ? (
                                <div className="flex items-center justify-center gap-3 bg-white text-black p-4 uppercase tracking-widest text-xs font-bold animate-pulse">
                                    <CheckCircle2 className="w-5 h-5" /> Account scrubbed successfully. Redirecting...
                                </div>
                            ) : (
                                <button 
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                    className="w-full md:w-auto bg-transparent border-2 border-red-900 text-red-500 hover:bg-red-950 hover:text-red-400 hover:border-red-700 font-bold py-4 px-8 rounded-none transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" /> 
                                    {isDeleting ? 'Erasing Protocol...' : 'Permanently Delete Account'}
                                </button>
                            )}
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
