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

    return (
        <div className="bg-white min-h-[calc(100vh-80px)] text-black pt-24 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-cursive mb-6">Your Sanctuary</h1>
                    <p className="text-gray-600 font-sans uppercase tracking-widest text-sm border-b border-gray-200 pb-8">
                        Manage your secure identity and privacy settings.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-12">
                    {/* Sidebar / Nav */}
                    <div className="md:col-span-1 border border-gray-300 bg-white/50 p-4 space-y-2 font-sans tracking-widest uppercase text-xs font-bold flex flex-col justify-between" style={{ minHeight: '300px' }}>
                        <div className="space-y-2">
                            <button 
                                onClick={() => setActiveTab('profile')}
                                className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-all ${activeTab === 'profile' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200 hover:border-black hover:pl-8'}`}
                            >
                                <User className="w-4 h-4" /> Profile Info
                            </button>
                            <button 
                                onClick={() => setActiveTab('security')}
                                className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-all ${activeTab === 'security' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200 hover:border-black hover:pl-8'}`}
                            >
                                <Key className="w-4 h-4" /> Security
                            </button>
                            <button 
                                onClick={() => setActiveTab('preferences')}
                                className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-all ${activeTab === 'preferences' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200 hover:border-black hover:pl-8'}`}
                            >
                                <Settings className="w-4 h-4" /> Preferences
                            </button>
                        </div>

                        <div className="pt-8 mt-auto">
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-6 py-4 flex items-center gap-3 transition-all bg-white text-gray-700 border border-gray-200 hover:text-black hover:border-gray-500 hover:pl-8"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-12">
                        
                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section className="bg-white border border-gray-200 p-8 md:p-12 hover:border-black transition-colors duration-500">
                                    <h2 className="text-3xl font-cursive mb-8 tracking-wide flex items-center gap-3"><User className="w-6 h-6"/> Identity Details</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Registered Name</label>
                                            <div className="w-full border border-gray-200 bg-white px-4 py-4 text-black font-sans text-lg cursor-not-allowed opacity-80 decoration-dashed underline underline-offset-8">
                                                {user?.name || 'SafeHer User'}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Registered Email</label>
                                            <div className="w-full border border-gray-200 bg-white px-4 py-4 text-black font-sans text-lg cursor-not-allowed opacity-80 decoration-dashed underline underline-offset-8">
                                                {user?.email || 'user@email.com'}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Danger Zone */}
                                <section className="bg-white border border-gray-200 p-8 md:p-12 hover:border-red-900 transition-colors duration-500">
                                    <h2 className="text-3xl font-cursive mb-4 tracking-wide text-black flex items-center gap-3"><ShieldAlert className="w-6 h-6 text-red-500"/> Danger Zone</h2>
                                    <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                                        Erasing your account will permanently delete your identity and wipe all securely stored evidence from the SafeHer vault. This action cannot be reversed.
                                    </p>
                                    {showSuccess ? (
                                        <div className="flex items-center justify-center gap-3 bg-black text-white p-4 uppercase tracking-widest text-xs font-bold animate-pulse">
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
                                <section className="bg-white border border-gray-200 p-8 md:p-12">
                                    <h2 className="text-3xl font-cursive mb-8 tracking-wide flex items-center gap-3"><Lock className="w-6 h-6"/> Password Modification</h2>
                                    
                                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Current Password</label>
                                            <input 
                                                type="password" 
                                                required
                                                value={pwdData.currentPassword}
                                                onChange={(e) => setPwdData({...pwdData, currentPassword: e.target.value})}
                                                className="w-full border border-gray-200 bg-white px-4 py-4 text-black font-sans focus:outline-none focus:border-black transition-colors" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">New Password</label>
                                            <input 
                                                type="password" 
                                                required
                                                minLength="6"
                                                value={pwdData.newPassword}
                                                onChange={(e) => setPwdData({...pwdData, newPassword: e.target.value})}
                                                className="w-full border border-gray-200 bg-white px-4 py-4 text-black font-sans focus:outline-none focus:border-black transition-colors" 
                                            />
                                        </div>
                                        
                                        {pwdStatus.error && <p className="text-red-500 text-sm mt-2">{pwdStatus.error}</p>}
                                        {pwdStatus.success && <p className="text-green-500 text-sm mt-2">{pwdStatus.success}</p>}

                                        <button 
                                            type="submit" 
                                            disabled={pwdStatus.loading}
                                            className="w-full sm:w-auto bg-black text-white font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-gray-200 transition-colors disabled:opacity-50"
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
                                <section className="bg-white border border-gray-200 p-8 md:p-12">
                                    <h2 className="text-3xl font-cursive mb-8 tracking-wide flex items-center gap-3"><Settings className="w-6 h-6"/> Platform Preferences</h2>
                                    
                                    <div className="grid grid-cols-1 gap-6">
                                        
                                        <div className="border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer hover:border-gray-600 transition-colors" onClick={handleStrictFilterToggle}>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">Strict AI Formatting <EyeOff className="w-4 h-4 text-gray-700"/></h3>
                                                <p className="text-sm text-gray-700">
                                                    Aggressive heuristic shielding. Re-calibrates the toxicity analyzer to maximize threat detection precision.
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-3">
                                                <span className={`text-xs font-bold uppercase tracking-widest ${user?.strictAIFilter ? 'text-green-500' : 'text-gray-600'}`}>
                                                    {filterUpdating ? 'Saving...' : user?.strictAIFilter ? 'Enabled' : 'Disabled'}
                                                </span>
                                                <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${user?.strictAIFilter ? 'bg-black' : 'bg-gray-800'}`}>
                                                    <div className={`w-4 h-4 rounded-full transition-transform ${user?.strictAIFilter ? 'bg-white translate-x-6' : 'bg-gray-400'}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-6 mt-4 italic">
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
