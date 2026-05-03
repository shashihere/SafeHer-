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
            setPwdStatus({ loading: false, success: 'PASSWORD UPDATED SECURELY.', error: null });
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
        <div className="bg-[#fdfdfd] min-h-[calc(100vh-80px)] text-black pt-12 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-6xl md:text-8xl font-cursive font-black mb-4 uppercase tracking-tighter">Your Hub</h1>
                    <p className="font-sans uppercase tracking-widest text-sm font-bold bg-yellow-400 inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        Manage your secure identity and privacy settings.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar / Nav */}
                    <div className="md:col-span-1 bg-white border-4 border-black p-4 space-y-4 font-sans tracking-widest uppercase text-xs font-bold flex flex-col justify-between shadow-[8px_8px_0px_rgba(0,0,0,1)]" style={{ minHeight: '400px' }}>
                        <div className="space-y-4">
                            <button 
                                onClick={() => setActiveTab('profile')}
                                className={`w-full text-left px-4 py-4 border-4 border-black flex items-center gap-3 transition-all ${activeTab === 'profile' ? 'bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white hover:bg-gray-100'}`}
                            >
                                <User className="w-5 h-5" /> Profile
                            </button>
                            <button 
                                onClick={() => setActiveTab('security')}
                                className={`w-full text-left px-4 py-4 border-4 border-black flex items-center gap-3 transition-all ${activeTab === 'security' ? 'bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white hover:bg-gray-100'}`}
                            >
                                <Key className="w-5 h-5" /> Security
                            </button>
                            <button 
                                onClick={() => setActiveTab('preferences')}
                                className={`w-full text-left px-4 py-4 border-4 border-black flex items-center gap-3 transition-all ${activeTab === 'preferences' ? 'bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white hover:bg-gray-100'}`}
                            >
                                <Settings className="w-5 h-5" /> Settings
                            </button>
                        </div>

                        <div className="pt-8 mt-auto border-t-4 border-black">
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-4 flex items-center gap-3 transition-all bg-red-500 text-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                            >
                                <LogOut className="w-5 h-5" /> SIGN OUT
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-8">
                        
                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
                                    <h2 className="text-4xl font-cursive font-black mb-8 tracking-tighter uppercase flex items-center gap-3"><User className="w-8 h-8 text-blue-600"/> IDENTITY</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-black uppercase tracking-widest mb-2">Registered Name</label>
                                            <div className="w-full border-4 border-black bg-gray-100 px-4 py-4 font-sans text-lg cursor-not-allowed opacity-80 decoration-dashed underline underline-offset-8">
                                                {user?.name || 'Raksha User'}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-black uppercase tracking-widest mb-2">Registered Email</label>
                                            <div className="w-full border-4 border-black bg-gray-100 px-4 py-4 font-sans text-lg cursor-not-allowed opacity-80 decoration-dashed underline underline-offset-8">
                                                {user?.email || 'user@email.com'}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Danger Zone */}
                                <section className="bg-red-500 border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                                    <h2 className="text-4xl font-cursive font-black mb-4 tracking-tighter text-black uppercase flex items-center gap-3"><ShieldAlert className="w-8 h-8 text-black"/> DANGER ZONE</h2>
                                    <p className="text-black font-bold text-lg mb-8 leading-relaxed">
                                        Erasing your account will permanently delete your identity and wipe all securely stored evidence from the Raksha vault. This action cannot be reversed.
                                    </p>
                                    {showSuccess ? (
                                        <div className="flex items-center justify-center gap-3 bg-white border-4 border-black text-black p-4 uppercase tracking-widest text-sm font-black animate-pulse shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                            <CheckCircle2 className="w-6 h-6 text-green-500" /> ACCOUNT DELETED. REDIRECTING...
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={handleDeleteAccount}
                                            disabled={isDeleting}
                                            className="w-full md:w-auto bg-black text-white hover:bg-gray-800 border-4 border-black font-black py-5 px-8 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-[4px_4px_0px_rgba(255,255,255,1)]"
                                        >
                                            <Trash2 className="w-5 h-5 text-white" /> 
                                            {isDeleting ? 'ERASING...' : 'PERMANENTLY DELETE ACCOUNT'}
                                        </button>
                                    )}
                                </section>
                            </div>
                        )}

                        {/* Security Section */}
                        {activeTab === 'security' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
                                    <h2 className="text-4xl font-cursive font-black mb-8 tracking-tighter uppercase flex items-center gap-3"><Lock className="w-8 h-8 text-green-600"/> PASSWORD</h2>
                                    
                                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-black uppercase tracking-widest mb-2">Current Password</label>
                                            <input 
                                                type="password" 
                                                required
                                                value={pwdData.currentPassword}
                                                onChange={(e) => setPwdData({...pwdData, currentPassword: e.target.value})}
                                                className="w-full bg-white border-4 border-black px-4 py-4 text-black focus:outline-none focus:bg-yellow-100 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-black uppercase tracking-widest mb-2">New Password</label>
                                            <input 
                                                type="password" 
                                                required
                                                minLength="6"
                                                value={pwdData.newPassword}
                                                onChange={(e) => setPwdData({...pwdData, newPassword: e.target.value})}
                                                className="w-full bg-white border-4 border-black px-4 py-4 text-black focus:outline-none focus:bg-yellow-100 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" 
                                            />
                                        </div>
                                        
                                        {pwdStatus.error && <p className="text-red-600 font-bold bg-red-100 p-3 border-2 border-black">{pwdStatus.error}</p>}
                                        {pwdStatus.success && <p className="text-green-700 font-bold bg-green-100 p-3 border-2 border-black">{pwdStatus.success}</p>}

                                        <button 
                                            type="submit" 
                                            disabled={pwdStatus.loading}
                                            className="w-full sm:w-auto bg-green-500 text-black border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-sm px-8 py-5 transition-all disabled:opacity-50"
                                        >
                                            {pwdStatus.loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                                        </button>
                                    </form>
                                </section>
                            </div>
                        )}

                        {/* Preferences Section */}
                        {activeTab === 'preferences' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
                                    <h2 className="text-4xl font-cursive font-black mb-8 tracking-tighter uppercase flex items-center gap-3"><Settings className="w-8 h-8 text-blue-600"/> PREFERENCES</h2>
                                    
                                    <div className="grid grid-cols-1 gap-8">
                                        
                                        <div className="bg-white border-4 border-black p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)]" onClick={handleStrictFilterToggle}>
                                            <div>
                                                <h3 className="font-black text-xl mb-2 flex items-center gap-2 uppercase">STRICT AI FORMATTING <EyeOff className="w-5 h-5 text-blue-600"/></h3>
                                                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                                                    Aggressive heuristic shielding. Re-calibrates the toxicity analyzer to maximize threat detection precision.
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-3">
                                                <span className={`text-sm font-black uppercase tracking-widest ${user?.strictAIFilter ? 'text-green-600' : 'text-slate-500'}`}>
                                                    {filterUpdating ? 'SAVING...' : user?.strictAIFilter ? 'ENABLED' : 'DISABLED'}
                                                </span>
                                                <div className={`w-16 h-8 border-4 border-black flex items-center px-1 transition-colors ${user?.strictAIFilter ? 'bg-green-400' : 'bg-gray-300'}`}>
                                                    <div className={`w-4 h-4 border-2 border-black transition-transform ${user?.strictAIFilter ? 'bg-white translate-x-8' : 'bg-white'}`}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white border-4 border-black p-6 mt-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                            <h3 className="font-black text-xl mb-2 uppercase">PRIMARY SOS CONTACT</h3>
                                            <p className="text-sm font-bold text-slate-700 mb-6 leading-relaxed">
                                                Enter the phone number (with country code, e.g., 919876543210) of your most trusted contact. SOS messages will route directly to them via WhatsApp.
                                            </p>
                                            <form onSubmit={handleContactUpdate} className="flex flex-col sm:flex-row gap-4">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 919876543210"
                                                    value={emergencyContact}
                                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                                    className="flex-grow bg-white border-4 border-black px-4 py-4 text-black focus:outline-none focus:bg-yellow-100 font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] font-bold text-lg"
                                                />
                                                <button 
                                                    type="submit" 
                                                    disabled={contactUpdating}
                                                    className="bg-blue-600 text-white border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-sm px-8 py-4 transition-all disabled:opacity-50 whitespace-nowrap"
                                                >
                                                    {contactUpdating ? 'SAVING...' : 'SAVE CONTACT'}
                                                </button>
                                            </form>
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
