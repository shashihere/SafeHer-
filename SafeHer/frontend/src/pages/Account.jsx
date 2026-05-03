import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, ShieldAlert, Key, Settings, Trash2, CheckCircle2, Lock, EyeOff, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
    const { user, setUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('profile');
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const [pwdData, setPwdData] = useState({ currentPassword: '', newPassword: '' });
    const [pwdStatus, setPwdStatus] = useState({ loading: false, success: null, error: null });

    const [filterUpdating, setFilterUpdating] = useState(false);
    const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '');
    const [contactUpdating, setContactUpdating] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to permanently delete your data? This cannot be undone.")) return;
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
            setPwdStatus({ loading: false, success: 'Password updated securely.', error: null });
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
        <div className="bg-[#fcfcfc] min-h-[calc(100vh-80px)] text-[#1d1d1d] pt-12 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#1d1d1d] tracking-tight">Your Hub</h1>
                    <p className="text-gray-500 font-medium text-lg">
                        Manage your secure identity and privacy settings.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar / Nav */}
                    <div className="md:col-span-1 bg-white rounded-3xl p-4 soft-shadow flex flex-col justify-between border border-gray-50 h-fit">
                        <div className="space-y-2">
                            <button 
                                onClick={() => setActiveTab('profile')}
                                className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 transition-all font-bold ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <User className="w-5 h-5" /> Profile
                            </button>
                            <button 
                                onClick={() => setActiveTab('security')}
                                className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 transition-all font-bold ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Key className="w-5 h-5" /> Security
                            </button>
                            <button 
                                onClick={() => setActiveTab('preferences')}
                                className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 transition-all font-bold ${activeTab === 'preferences' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Settings className="w-5 h-5" /> Settings
                            </button>
                        </div>

                        <div className="pt-6 mt-6 border-t border-gray-100">
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 flex items-center gap-3 transition-all text-rose-600 hover:bg-rose-50 rounded-2xl font-bold"
                            >
                                <LogOut className="w-5 h-5" /> Sign out
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-6">
                        
                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 soft-shadow border border-gray-50">
                                    <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3"><User className="w-6 h-6 text-blue-600"/> Identity Details</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Registered Name</label>
                                            <div className="w-full bg-gray-50 rounded-2xl px-4 py-4 text-gray-500 font-medium border border-gray-100">
                                                {user?.name || 'Raksha User'}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Registered Email</label>
                                            <div className="w-full bg-gray-50 rounded-2xl px-4 py-4 text-gray-500 font-medium border border-gray-100">
                                                {user?.email || 'user@email.com'}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Danger Zone */}
                                <section className="bg-rose-50 border border-rose-100 rounded-3xl p-6 sm:p-8 md:p-10 soft-shadow">
                                    <h2 className="text-2xl font-extrabold mb-4 text-rose-600 flex items-center gap-3"><ShieldAlert className="w-6 h-6"/> Danger Zone</h2>
                                    <p className="text-rose-900 font-medium text-lg mb-8 leading-relaxed">
                                        Erasing your account will permanently delete your identity and wipe all securely stored evidence from the Raksha vault. This action cannot be reversed.
                                    </p>
                                    {showSuccess ? (
                                        <div className="flex items-center justify-center gap-3 bg-white text-emerald-600 p-4 rounded-2xl font-bold animate-pulse shadow-sm">
                                            <CheckCircle2 className="w-5 h-5" /> Account deleted. Redirecting...
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={handleDeleteAccount}
                                            disabled={isDeleting}
                                            className="w-full sm:w-auto bg-rose-600 text-white hover:bg-rose-700 font-bold py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <Trash2 className="w-5 h-5" /> 
                                            {isDeleting ? 'Erasing...' : 'Permanently delete account'}
                                        </button>
                                    )}
                                </section>
                            </div>
                        )}

                        {/* Security Section */}
                        {activeTab === 'security' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 soft-shadow border border-gray-50">
                                    <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3"><Lock className="w-6 h-6 text-emerald-600"/> Update Password</h2>
                                    
                                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                                            <input 
                                                type="password" 
                                                required
                                                value={pwdData.currentPassword}
                                                onChange={(e) => setPwdData({...pwdData, currentPassword: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-colors font-medium" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                                            <input 
                                                type="password" 
                                                required
                                                minLength="6"
                                                value={pwdData.newPassword}
                                                onChange={(e) => setPwdData({...pwdData, newPassword: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-colors font-medium" 
                                            />
                                        </div>
                                        
                                        {pwdStatus.error && <p className="text-rose-600 font-medium bg-rose-50 p-4 rounded-2xl border border-rose-100">{pwdStatus.error}</p>}
                                        {pwdStatus.success && <p className="text-emerald-700 font-medium bg-emerald-50 p-4 rounded-2xl border border-emerald-100">{pwdStatus.success}</p>}

                                        <button 
                                            type="submit" 
                                            disabled={pwdStatus.loading}
                                            className="w-full sm:w-auto bg-emerald-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold px-8 py-3.5 rounded-full transition-all disabled:opacity-50"
                                        >
                                            {pwdStatus.loading ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </form>
                                </section>
                            </div>
                        )}

                        {/* Preferences Section */}
                        {activeTab === 'preferences' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 soft-shadow border border-gray-50">
                                    <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3"><Settings className="w-6 h-6 text-indigo-600"/> Settings & Preferences</h2>
                                    
                                    <div className="space-y-6">
                                        
                                        <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gray-100">
                                            <div>
                                                <h3 className="font-extrabold text-xl mb-2 flex items-center gap-2">Strict AI Formatting <EyeOff className="w-5 h-5 text-indigo-600"/></h3>
                                                <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-lg">
                                                    Aggressive heuristic shielding. Re-calibrates the toxicity analyzer to maximize threat detection precision.
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-4">
                                                <span className={`text-sm font-bold uppercase tracking-wide ${user?.strictAIFilter ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                    {filterUpdating ? 'Saving...' : user?.strictAIFilter ? 'Enabled' : 'Disabled'}
                                                </span>
                                                <button 
                                                    onClick={handleStrictFilterToggle}
                                                    disabled={filterUpdating}
                                                    className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors disabled:opacity-50 ${user?.strictAIFilter ? 'bg-emerald-500' : 'bg-gray-300'}`}
                                                >
                                                    <div className={`w-6 h-6 rounded-full shadow-sm transition-transform ${user?.strictAIFilter ? 'bg-white translate-x-6' : 'bg-white'}`}></div>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-100">
                                            <h3 className="font-extrabold text-xl mb-2">Primary SOS Contact</h3>
                                            <p className="text-sm font-medium text-gray-500 mb-6 leading-relaxed max-w-lg">
                                                Enter the phone number (with country code, e.g., 919876543210) of your most trusted contact. SOS messages route directly to them.
                                            </p>
                                            <form onSubmit={handleContactUpdate} className="flex flex-col sm:flex-row gap-4">
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 919876543210"
                                                    value={emergencyContact}
                                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                                    className="flex-grow bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 font-medium"
                                                />
                                                <button 
                                                    type="submit" 
                                                    disabled={contactUpdating}
                                                    className="bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 font-bold px-8 py-3.5 transition-all disabled:opacity-50 whitespace-nowrap shadow-md"
                                                >
                                                    {contactUpdating ? 'Saving...' : 'Save Contact'}
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
