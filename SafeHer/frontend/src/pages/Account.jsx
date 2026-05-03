import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, ShieldAlert, Key, Settings, Trash2, CheckCircle2, Lock, EyeOff, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
    const { user, setUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('profile');
    
    // Auth URL Base
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Password Update States
    const [pwdData, setPwdData] = useState({ currentPassword: '', newPassword: '' });
    const [pwdStatus, setPwdStatus] = useState({ loading: false, success: null, error: null });

    // Preference Update States
    const [filterUpdating, setFilterUpdating] = useState(false);
    const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '');
    const [contactUpdating, setContactUpdating] = useState(false);

    // Delete Account States
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you entirely sure you want to permanently delete your data?")) return;
        setIsDeleting(true);
        try {
            await axios.delete(`${API_URL}/api/auth/delete`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setShowSuccess(true);
            setTimeout(() => {
                logout();
                navigate('/');
            }, 2000);
        } catch (error) {
            alert('Failed to erase account. Please try again.');
            setIsDeleting(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setPwdStatus({ loading: true, success: null, error: null });
        try {
            await axios.put(`${API_URL}/api/auth/update-password`, pwdData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setPwdStatus({ loading: false, success: 'Sanctuary gates resecured. Password updated.', error: null });
            setPwdData({ currentPassword: '', newPassword: '' });
        } catch (error) {
            setPwdStatus({ loading: false, success: null, error: error.response?.data?.message || 'Password update failed' });
        }
    };

    const handleStrictFilterToggle = async () => {
        setFilterUpdating(true);
        try {
            const newFilterState = !(user?.strictAIFilter || false);
            const { data } = await axios.put(`${API_URL}/api/auth/preferences`, 
                { strictAIFilter: newFilterState },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            // Update local user state Context
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            alert('Could not update AI preferences.');
        } finally {
            setFilterUpdating(false);
        }
    };

    const handleContactUpdate = async (e) => {
        e.preventDefault();
        setContactUpdating(true);
        try {
            const { data } = await axios.put(`${API_URL}/api/auth/preferences`, 
                { emergencyContact },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            alert('Emergency Contact updated successfully.');
        } catch (error) {
            alert('Could not update emergency contact.');
        } finally {
            setContactUpdating(false);
        }
    };

    return (
        <div className="bg-transparent min-h-[calc(100vh-80px)] text-slate-200 pt-16 pb-20 px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-cursive font-extrabold mb-4 text-white drop-shadow-md tracking-widest">Your Sanctuary</h1>
                    <p className="text-slate-400 font-sans uppercase tracking-widest text-xs font-bold border-b border-white/10 pb-8">
                        Manage your secure identity and privacy settings.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar / Nav */}
                    <div className="md:col-span-1 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-4 space-y-2 font-sans tracking-widest uppercase text-xs font-bold flex flex-col justify-between rounded-2xl shadow-lg" style={{ minHeight: '300px' }}>
                        <div className="space-y-2">
                            <button 
                                onClick={() => setActiveTab('profile')}
                                className={`w-full text-left px-4 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${activeTab === 'profile' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'text-slate-400 border border-transparent hover:bg-slate-800/50 hover:text-white'}`}
                            >
                                <User className="w-4 h-4" /> Profile Info
                            </button>
                            <button 
                                onClick={() => setActiveTab('security')}
                                className={`w-full text-left px-4 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${activeTab === 'security' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'text-slate-400 border border-transparent hover:bg-slate-800/50 hover:text-white'}`}
                            >
                                <Key className="w-4 h-4" /> Security
                            </button>
                            <button 
                                onClick={() => setActiveTab('preferences')}
                                className={`w-full text-left px-4 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${activeTab === 'preferences' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'text-slate-400 border border-transparent hover:bg-slate-800/50 hover:text-white'}`}
                            >
                                <Settings className="w-4 h-4" /> Preferences
                            </button>
                        </div>

                        <div className="pt-8 mt-auto border-t border-white/10">
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-4 rounded-xl flex items-center gap-3 transition-all text-red-400 hover:bg-red-950/30 hover:text-red-300 border border-transparent hover:border-red-500/30"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-8">
                        
                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-lg">
                                    <h2 className="text-3xl font-cursive font-bold mb-8 tracking-wide flex items-center gap-3 text-white"><User className="w-6 h-6 text-blue-400"/> Identity Details</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Registered Name</label>
                                            <div className="w-full border border-white/10 bg-slate-800/50 px-4 py-4 text-slate-300 font-sans text-lg rounded-xl opacity-80 decoration-dashed underline underline-offset-8">
                                                {user?.name || 'Raksha User'}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Registered Email</label>
                                            <div className="w-full border border-white/10 bg-slate-800/50 px-4 py-4 text-slate-300 font-sans text-lg rounded-xl opacity-80 decoration-dashed underline underline-offset-8">
                                                {user?.email || 'user@email.com'}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Danger Zone */}
                                <section className="bg-rose-950/20 backdrop-blur-xl border border-rose-900/50 p-8 md:p-10 rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.1)]">
                                    <h2 className="text-3xl font-cursive font-bold mb-4 tracking-wide text-rose-500 flex items-center gap-3"><ShieldAlert className="w-6 h-6 text-rose-500"/> Danger Zone</h2>
                                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                        Erasing your account will permanently delete your identity and wipe all securely stored evidence from the Raksha vault. This action cannot be reversed.
                                    </p>
                                    {showSuccess ? (
                                        <div className="flex items-center justify-center gap-3 bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 p-4 rounded-xl uppercase tracking-widest text-xs font-bold animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                            <CheckCircle2 className="w-5 h-5" /> Account scrubbed successfully. Redirecting...
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={handleDeleteAccount}
                                            disabled={isDeleting}
                                            className="w-full md:w-auto bg-rose-600/20 border border-rose-500/50 text-rose-400 hover:bg-rose-600 hover:text-white rounded-xl font-bold py-4 px-8 transition-all duration-300 shadow-[0_0_15px_rgba(225,29,72,0.2)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
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
                                <section className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-lg">
                                    <h2 className="text-3xl font-cursive font-bold mb-8 tracking-wide flex items-center gap-3 text-white"><Lock className="w-6 h-6 text-emerald-400"/> Password Modification</h2>
                                    
                                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current Password</label>
                                            <input 
                                                type="password" 
                                                required
                                                value={pwdData.currentPassword}
                                                onChange={(e) => setPwdData({...pwdData, currentPassword: e.target.value})}
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">New Password</label>
                                            <input 
                                                type="password" 
                                                required
                                                minLength="6"
                                                value={pwdData.newPassword}
                                                onChange={(e) => setPwdData({...pwdData, newPassword: e.target.value})}
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                                            />
                                        </div>
                                        
                                        {pwdStatus.error && <p className="text-rose-400 text-sm mt-2">{pwdStatus.error}</p>}
                                        {pwdStatus.success && <p className="text-emerald-400 text-sm mt-2">{pwdStatus.success}</p>}

                                        <button 
                                            type="submit" 
                                            disabled={pwdStatus.loading}
                                            className="w-full sm:w-auto bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-xl font-bold uppercase tracking-widest text-xs px-8 py-4 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] disabled:opacity-50"
                                        >
                                            {pwdStatus.loading ? 'Updating...' : 'Ensure Password Security'}
                                        </button>
                                    </form>
                                </section>
                            </div>
                        )}

                        {/* Preferences Section */}
                        {activeTab === 'preferences' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-lg">
                                    <h2 className="text-3xl font-cursive font-bold mb-8 tracking-wide flex items-center gap-3 text-white"><Settings className="w-6 h-6 text-blue-400"/> Platform Preferences</h2>
                                    
                                    <div className="grid grid-cols-1 gap-6">
                                        
                                        <div className="bg-slate-800/50 border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer hover:border-blue-500/50 rounded-xl transition-colors" onClick={handleStrictFilterToggle}>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1 flex items-center gap-2 text-white">Strict AI Formatting <EyeOff className="w-4 h-4 text-blue-400"/></h3>
                                                <p className="text-sm text-slate-400">
                                                    Aggressive heuristic shielding. Re-calibrates the toxicity analyzer to maximize threat detection precision.
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-3">
                                                <span className={`text-xs font-bold uppercase tracking-widest ${user?.strictAIFilter ? 'text-emerald-400' : 'text-slate-500'}`}>
                                                    {filterUpdating ? 'Saving...' : user?.strictAIFilter ? 'Enabled' : 'Disabled'}
                                                </span>
                                                <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${user?.strictAIFilter ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                                                    <div className={`w-4 h-4 rounded-full transition-transform ${user?.strictAIFilter ? 'bg-white translate-x-6' : 'bg-slate-400'}`}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-800/50 border border-white/10 p-6 mt-4 rounded-xl">
                                            <h3 className="font-bold text-lg mb-2 text-white">Primary Emergency Contact</h3>
                                            <p className="text-sm text-slate-400 mb-4">
                                                Enter the phone number (with country code, e.g., 919876543210) of your most trusted contact. SOS messages will route directly to them via WhatsApp.
                                            </p>
                                            <form onSubmit={handleContactUpdate} className="flex flex-col sm:flex-row gap-4">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 919876543210"
                                                    value={emergencyContact}
                                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                                    className="flex-grow bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-mono"
                                                />
                                                <button 
                                                    type="submit" 
                                                    disabled={contactUpdating}
                                                    className="bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600 hover:text-white rounded-xl font-bold uppercase tracking-widest text-xs px-6 py-3 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] disabled:opacity-50 whitespace-nowrap"
                                                >
                                                    {contactUpdating ? 'Saving...' : 'Save Contact'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-6 mt-4 italic">
                                        Note: We have strictly removed unnecessary UI bloat (such as non-serviceable SMS routing and un-syncable modules) to maintain maximum lightweight and robust security operation.
                                    </p>
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
