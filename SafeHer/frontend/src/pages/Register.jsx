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
        <div className="flex-grow flex items-center justify-center p-4 bg-white min-h-[calc(100vh-80px)] py-12">
            <div className="w-full max-w-lg bg-white border border-gray-200 hover:border-black p-10 md:p-14 relative overflow-hidden transition-all duration-700 group hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                
                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-40 h-40 border-l border-b border-gray-200 group-hover:border-black transition-all duration-700 opacity-50 -mb-20 -ml-20 rotate-45 transform group-hover:rotate-12"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 bg-black text-white inline-block transform group-hover:-translate-y-2 transition-transform duration-500">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                    </div>
                    <h2 className="text-5xl font-cursive text-center mb-3 tracking-wide">Join SafeHer</h2>
                    <p className="text-center text-gray-600 mb-10 font-sans tracking-widest uppercase text-xs">Your safety matters. Create a secure account.</p>

                    {error && (
                        <div className="bg-transparent border-2 border-black px-4 py-3 mb-8 text-black uppercase tracking-widest text-xs font-bold text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group/input">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 group-focus-within/input:text-black transition-colors">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full bg-transparent border-b-2 border-gray-200 rounded-none px-0 py-3 text-black focus:outline-none focus:border-black transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Ava Vanguard"
                            />
                        </div>
                        <div className="group/input">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 group-focus-within/input:text-black transition-colors">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full bg-transparent border-b-2 border-gray-200 rounded-none px-0 py-3 text-black focus:outline-none focus:border-black transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="group/input">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 group-focus-within/input:text-black transition-colors">Password</label>
                            <input 
                                type="password" 
                                className="w-full bg-transparent border-b-2 border-gray-200 rounded-none px-0 py-3 text-black focus:outline-none focus:border-black transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="w-full bg-black text-white font-bold py-5 px-4 rounded-none hover:bg-gray-200 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 group/btn">
                                Create Identity <div className="h-1 w-0 bg-white transition-all group-hover/btn:w-6"></div>
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-10 border-t border-gray-300 pt-8 text-center">
                        <p className="text-gray-700 uppercase tracking-widest text-xs">
                            Already have an account? 
                            <Link to="/login" className="ml-2 text-black font-bold border-b border-transparent hover:border-black pb-1 transition-all">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
