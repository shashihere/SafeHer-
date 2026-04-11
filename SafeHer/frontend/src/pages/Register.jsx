import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center p-4 min-h-[calc(100vh-80px)] py-12 bg-gradient-to-tl from-purple-50/50 via-white to-pink-50/50 text-slate-800 relative overflow-hidden">
            
            {/* Soft Ambient Bubbles */}
            <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-pink-200/30 blur-[100px] rounded-full pointer-events-none -z-10"></div>
            <div className="absolute bottom-[0%] right-[-5%] w-96 h-96 bg-purple-200/30 blur-[100px] rounded-full pointer-events-none -z-10"></div>

            <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-purple-100 p-10 md:p-14 relative overflow-hidden transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(167,139,250,0.1)] rounded-3xl group">
                
                <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="p-5 bg-purple-50 border border-purple-100 text-purple-500 rounded-full inline-block transform group-hover:rotate-12 transition-all duration-500">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-playfair text-center mb-4 tracking-wide text-purple-900 font-bold">Join SafeHer</h2>
                    <p className="text-center text-slate-500 mb-10 font-sans tracking-wide text-sm font-medium">Your safety matters. Create a secure account.</p>

                    {error && (
                        <div className="bg-red-50 border border-red-100 px-4 py-3 mb-8 text-red-600 tracking-wide text-xs font-bold text-center animate-fadeIn rounded-2xl shadow-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group/input space-y-2">
                            <label className="block text-xs font-bold text-purple-500 uppercase tracking-widest pl-2">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-50/50 border border-purple-100 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 transition-all placeholder:text-slate-400 font-medium"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Ava Vanguard"
                            />
                        </div>
                        <div className="group/input space-y-2">
                            <label className="block text-xs font-bold text-purple-500 uppercase tracking-widest pl-2">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full bg-slate-50/50 border border-purple-100 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 transition-all placeholder:text-slate-400 font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="group/input space-y-2">
                            <label className="block text-xs font-bold text-purple-500 uppercase tracking-widest pl-2">Password</label>
                            <input 
                                type="password" 
                                className="w-full bg-slate-50/50 border border-purple-100 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 transition-all placeholder:text-slate-400 font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="pt-6">
                            <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4.5 px-4 rounded-full transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:shadow-[0_8px_20px_rgba(244,114,182,0.3)] hover:-translate-y-0.5">
                                Create Identity
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-10 border-t border-purple-50 pt-8 text-center text-sm font-medium">
                        <p className="text-slate-500 tracking-wide">
                            Already have an account? 
                            <Link to="/login" className="ml-2 text-purple-600 font-bold hover:text-pink-600 transition-colors">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
