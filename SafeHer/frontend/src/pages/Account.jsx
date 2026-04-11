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
        <div className="bg-gradient-to-b from-purple-50/80 to-white min-h-[calc(100vh-80px)] text-slate-800 pt-20 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-14 text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-playfair font-bold text-purple-900 mb-4 tracking-wide">Your Sanctuary</h1>
                    <p className="text-slate-500 font-sans tracking-wide text-sm md:text-base mb-8">
                        Manage your secure identity and privacy settings safely.
                    </p>
                    <div className="border-b border-purple-100 w-full mb-8"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {/* Sidebar / Nav */}
                    <div className="md:col-span-1 space-y-3 font-sans tracking-widest uppercase text-xs font-bold">
                        <button className="w-full text-left bg-white text-purple-600 px-6 py-4 rounded-2xl shadow-sm border border-purple-100 flex items-center gap-3 transition-all hover:-translate-y-0.5">
                            <User className="w-4 h-4" /> Profile Info
                        </button>
                        <button className="w-full text-left bg-transparent text-slate-500 border border-transparent px-6 py-4 rounded-2xl flex items-center gap-3 transition-all hover:bg-white hover:text-purple-600 hover:shadow-sm">
                            <Key className="w-4 h-4" /> Security
                        </button>
                        <button className="w-full text-left bg-transparent text-slate-500 border border-transparent px-6 py-4 rounded-2xl flex items-center gap-3 transition-all hover:bg-white hover:text-purple-600 hover:shadow-sm">
                            <Settings className="w-4 h-4" /> Preferences
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-2 space-y-10">
                        
                        {/* Profile Section */}
                        <section className="bg-white border border-purple-100 p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all">
                            <h2 className="text-3xl font-playfair font-bold text-purple-900 mb-8 tracking-wide">Identity Details</h2>
                            
                            <div className="space-y-6">
                                <div className="group/field">
                                    <label className="block text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Registered Name</label>
                                    <div className="w-full border border-purple-50 bg-slate-50/50 rounded-2xl px-5 py-4 text-slate-700 font-sans text-lg font-medium cursor-not-allowed opacity-90 shadow-inner decoration-purple-200 underline decoration-wavy underline-offset-8">
                                        {user?.name || 'SafeHer User'}
                                    </div>
                                </div>
                                <div className="group/field">
                                    <label className="block text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Registered Email</label>
                                    <div className="w-full border border-purple-50 bg-slate-50/50 rounded-2xl px-5 py-4 text-slate-700 font-sans text-lg font-medium cursor-not-allowed opacity-90 shadow-inner decoration-purple-200 underline decoration-wavy underline-offset-8">
                                        {user?.email || 'user@email.com'}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Danger Zone */}
                        <section className="bg-red-50/80 border border-red-100 p-8 md:p-12 rounded-3xl hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transition-all">
                            <h2 className="text-3xl font-playfair font-bold mb-4 tracking-wide text-red-600">Danger Zone</h2>
                            <p className="text-red-500/80 text-sm mb-8 leading-relaxed font-medium">
                                Erasing your account will permanently delete your identity and wipe all securely stored evidence from the SafeHer Vault. This action cannot be reversed.
                            </p>

                            {showSuccess ? (
                                <div className="flex items-center justify-center gap-3 bg-red-100 text-red-700 p-5 rounded-2xl uppercase tracking-widest text-xs font-bold animate-fadeIn shadow-sm border border-red-200">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> Account scrubbed successfully. Redirecting...
                                </div>
                            ) : (
                                <button 
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                    className="w-full md:w-auto bg-white border border-red-200 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 font-bold py-4 px-8 rounded-full transition-all tracking-widest text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
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
