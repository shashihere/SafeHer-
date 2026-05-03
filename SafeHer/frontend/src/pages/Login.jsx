import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center p-4 min-h-[calc(100vh-80px)] relative overflow-hidden bg-[#fdfdfd]">
            <div className="w-full max-w-lg bg-white border-8 border-black p-8 md:p-14 relative z-10 shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] transition-all duration-300">
                
                <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] inline-block -rotate-3 hover:rotate-0 transition-transform">
                            <ShieldCheck className="w-12 h-12 text-black" />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black font-cursive text-center mb-2 tracking-tighter text-black uppercase">Welcome Back</h2>
                    <p className="text-center text-slate-800 mb-10 font-sans tracking-widest uppercase text-xs font-bold bg-gray-100 py-2 border-y-2 border-black">Securely access your Action Center</p>

                    {error && (
                        <div className="bg-red-500 border-4 border-black text-black px-4 py-3 mb-8 uppercase tracking-widest text-sm font-black text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-black text-black uppercase tracking-widest mb-2">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full bg-white border-4 border-black px-4 py-4 text-black focus:outline-none focus:bg-yellow-100 transition-colors placeholder:text-slate-400 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-black uppercase tracking-widest mb-2">Password</label>
                            <input 
                                type="password" 
                                className="w-full bg-white border-4 border-black px-4 py-4 text-black focus:outline-none focus:bg-yellow-100 transition-colors placeholder:text-slate-400 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="pt-6">
                            <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white font-black py-5 px-4 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:bg-blue-500 transition-all uppercase tracking-widest text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : 'AUTHENTICATE'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-10 pt-6 text-center border-t-4 border-black">
                        <p className="text-black uppercase tracking-widest text-sm font-bold bg-yellow-400 inline-block px-4 py-2 border-2 border-black">
                            Don't have an account? 
                            <Link to="/register" className="ml-2 text-blue-700 hover:text-blue-900 transition-colors underline decoration-2 underline-offset-4">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
