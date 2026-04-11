import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center p-4 bg-white min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-lg bg-white border border-[#c4b7b1] hover:border-[#615e5f] p-10 md:p-14 relative overflow-hidden transition-all duration-700 group hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[#c4b7b1] group-hover:border-[#615e5f] transition-all duration-700 opacity-50 -mt-16 -mr-16 rotate-45 transform group-hover:rotate-90"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 bg-[#615e5f] text-white hover:bg-[#4a4748] inline-block transform group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                    </div>
                    <h2 className="text-5xl font-cursive text-center mb-3 tracking-wide">Welcome Back</h2>
                    <p className="text-center text-gray-600 mb-10 font-sans tracking-widest uppercase text-xs">Securely access your SafeHer account</p>

                    {error && (
                        <div className="bg-transparent border-2 border-[#615e5f] px-4 py-3 mb-8 text-[#615e5f] uppercase tracking-widest text-xs font-bold text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group/input">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 group-focus-within/input:text-[#615e5f] transition-colors">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full bg-transparent border-b-2 border-[#c4b7b1] rounded-none px-0 py-3 text-[#615e5f] focus:outline-none focus:border-[#615e5f] transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="group/input">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 group-focus-within/input:text-[#615e5f] transition-colors">Password</label>
                            <input 
                                type="password" 
                                className="w-full bg-transparent border-b-2 border-[#c4b7b1] rounded-none px-0 py-3 text-[#615e5f] focus:outline-none focus:border-[#615e5f] transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="w-full bg-[#615e5f] text-white hover:bg-[#4a4748] font-bold py-5 px-4 rounded-none hover:bg-[#4a4748] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 group/btn">
                                Authenticate <div className="h-1 w-0 bg-white transition-all group-hover/btn:w-6"></div>
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-10 border-t border-gray-300 pt-8 text-center">
                        <p className="text-[#615e5f] uppercase tracking-widest text-xs">
                            Don't have an account? 
                            <Link to="/register" className="ml-2 text-[#615e5f] font-bold border-b border-transparent hover:border-[#615e5f] pb-1 transition-all">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
