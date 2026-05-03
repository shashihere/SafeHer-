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
        <div className="flex-grow flex items-center justify-center p-4 bg-transparent min-h-[calc(100vh-80px)] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

            <div className="w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 p-10 md:p-14 rounded-3xl relative z-10 transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                
                <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 bg-blue-600/20 text-blue-400 border border-blue-500/50 rounded-2xl shadow-[0_0_15px_rgba(37,99,235,0.3)] inline-block">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold font-cursive text-center mb-2 tracking-wide text-white drop-shadow-md">Welcome Back</h2>
                    <p className="text-center text-slate-400 mb-10 font-sans tracking-widest uppercase text-xs font-bold">Securely access your Action Center</p>

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 px-4 py-3 mb-8 rounded-xl uppercase tracking-widest text-xs font-bold text-center animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.2)]">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group/input">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 group-focus-within/input:text-blue-400 transition-colors">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-slate-800/80 transition-all placeholder:text-slate-600 font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="group/input">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 group-focus-within/input:text-blue-400 transition-colors">Password</label>
                            <input 
                                type="password" 
                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-slate-800/80 transition-all placeholder:text-slate-600 font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="pt-4">
                            <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-500 font-bold py-4 px-4 rounded-xl transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authenticate Identity'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-8 pt-6 text-center">
                        <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">
                            Don't have an account? 
                            <Link to="/register" className="ml-2 text-blue-400 hover:text-blue-300 transition-colors">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
