import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, ShieldAlert, Key, Settings, Trash2, CheckCircle2, Lock, Smartphone, Bell, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

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
            <div className="max-w-5xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-cursive mb-6">Your Sanctuary</h1>
                    <p className="text-gray-400 font-sans uppercase tracking-widest text-sm border-b border-gray-800 pb-8">
                        Manage your secure identity and privacy settings.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-12">
                    {/* Sidebar / Nav */}
                    <div className="md:col-span-1 space-y-2 font-sans tracking-widest uppercase text-xs font-bold">
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-all ${activeTab === 'profile' ? 'bg-white text-black' : 'bg-black text-white border border-gray-800 hover:border-white hover:pl-8'}`}
                        >
                            <User className="w-4 h-4" /> Profile Info
                        </button>
                        <button 
                            onClick={() => setActiveTab('security')}
                            className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-all ${activeTab === 'security' ? 'bg-white text-black' : 'bg-black text-white border border-gray-800 hover:border-white hover:pl-8'}`}
                        >
                            <Key className="w-4 h-4" /> Security
                        </button>
                        <button 
                            onClick={() => setActiveTab('preferences')}
                            className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-all ${activeTab === 'preferences' ? 'bg-white text-black' : 'bg-black text-white border border-gray-800 hover:border-white hover:pl-8'}`}
                        >
                            <Settings className="w-4 h-4" /> Preferences
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-12">
                        
                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section className="bg-black border border-gray-800 p-8 md:p-12 hover:border-white transition-colors duration-500">
                                    <h2 className="text-3xl font-cursive mb-8 tracking-wide flex items-center gap-3"><User className="w-6 h-6"/> Identity Details</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Registered Name</label>
                                            <div className="w-full border border-gray-800 bg-black px-4 py-4 text-white font-sans text-lg cursor-not-allowed opacity-80 decoration-dashed underline underline-offset-8">
                                                {user?.name || 'SafeHer User'}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Registered Email</label>
                                            <div className="w-full border border-gray-800 bg-black px-4 py-4 text-white font-sans text-lg cursor-not-allowed opacity-80 decoration-dashed underline underline-offset-8">
                                                {user?.email || 'user@email.com'}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Danger Zone */}
                                <section className="bg-black border border-gray-800 p-8 md:p-12 hover:border-red-900 transition-colors duration-500">
                                    <h2 className="text-3xl font-cursive mb-4 tracking-wide text-white flex items-center gap-3"><ShieldAlert className="w-6 h-6 text-red-500"/> Danger Zone</h2>
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
                                            className="w-full md:w-auto bg-transparent border-2 border-red-900 text-red-500 hover:bg-red-950 hover:text-red-400 hover:border-red-700 font-bold py-4 px-8 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" /> 
                                            {isDeleting ? 'Erasing Protocol...' : 'Permanently Delete Account'}
                                        </button>
                                    )}
                                </section>
                            </div>
                        )}

                        {/* Security Section */}
                        {activeTab === 'security' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section className="bg-black border border-gray-800 p-8 md:p-12">
                                    <h2 className="text-3xl font-cursive mb-8 tracking-wide flex items-center gap-3"><Lock className="w-6 h-6"/> Password & Authentication</h2>
                                    
                                    <div className="space-y-6">
                                        <div className="border border-gray-800 p-6 flex flex-col md:flex-row justify-between md:items-center gap-6">
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">Update Password</h3>
                                                <p className="text-sm text-gray-500">Ensure your account is protected with a strong passphrase.</p>
                                            </div>
                                            <button className="bg-white text-black font-bold uppercase tracking-widest text-xs px-6 py-3 whitespace-nowrap hover:bg-gray-200">
                                                Change Password
                                            </button>
                                        </div>

                                        <div className="border border-green-900/30 bg-green-950/10 p-6 flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-32 h-32"/></div>
                                            <div className="relative z-10">
                                                <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><Smartphone className="w-5 h-5 text-green-500"/> Two-Factor Authentication (2FA)</h3>
                                                <p className="text-sm text-gray-500">Extra layer of security. Use an authenticator app to log in.</p>
                                            </div>
                                            <div className="relative z-10 flex items-center gap-3">
                                                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Active</span>
                                                <button className="border border-gray-700 text-white font-bold uppercase tracking-widest text-xs px-6 py-3 hover:border-gray-500 transition-colors">
                                                    Configure
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="border border-gray-800 p-6 flex flex-col md:flex-row justify-between md:items-center gap-6">
                                            <div>
                                                <h3 className="font-bold text-lg mb-1 text-red-400">Emergency Disconnect</h3>
                                                <p className="text-sm text-gray-500">Instantly sign out of all devices to protect your accounts from intrusion.</p>
                                            </div>
                                            <button className="bg-red-600 text-white font-bold uppercase tracking-widest text-xs px-6 py-3 whitespace-nowrap hover:bg-red-700">
                                                Sign out of all sessions
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* Preferences Section */}
                        {activeTab === 'preferences' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section className="bg-black border border-gray-800 p-8 md:p-12">
                                    <h2 className="text-3xl font-cursive mb-8 tracking-wide flex items-center gap-3"><Settings className="w-6 h-6"/> Platform Preferences</h2>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="border border-gray-800 p-6 hover:border-gray-600 transition-colors cursor-pointer group">
                                            <Bell className="w-6 h-6 mb-4 text-gray-400 group-hover:text-white" />
                                            <h3 className="font-bold text-lg mb-2">SOS Notifications</h3>
                                            <p className="text-sm text-gray-500 mb-4">Manage who receives alerts when the panic button is pressed.</p>
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                                                Manage Contacts →
                                            </div>
                                        </div>
                                        
                                        <div className="border border-gray-800 p-6 hover:border-gray-600 transition-colors cursor-pointer group">
                                            <EyeOff className="w-6 h-6 mb-4 text-gray-400 group-hover:text-white" />
                                            <h3 className="font-bold text-lg mb-2">Incognito Mode</h3>
                                            <p className="text-sm text-gray-500 mb-4">Automatically clear traces of SafeHer from browser history when logging out.</p>
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                                                <span className="w-8 h-4 bg-white rounded-full flex items-center p-0.5 justify-end"><span className="w-3 h-3 bg-black rounded-full"></span></span> Enabled
                                            </div>
                                        </div>
                                        
                                        <div className="border border-gray-800 p-6 md:col-span-2 flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">Strict AI Filtering</h3>
                                                <p className="text-sm text-gray-500">Aggressively block and flag texts in the Analyzer component.</p>
                                            </div>
                                            <div className="w-12 h-6 bg-gray-800 rounded-full flex items-center p-1 cursor-pointer hover:bg-gray-700">
                                                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
