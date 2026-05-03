import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Loader2, ArrowRight } from 'lucide-react';

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
        <div className="flex-grow flex items-center justify-center p-4 min-h-[calc(100vh-80px)] bg-[#fcfcfc]">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 soft-shadow-lg border border-gray-50">
                
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                </div>
                
                <h2 className="text-3xl font-extrabold text-center mb-2 text-[#1d1d1d]">Welcome back</h2>
                <p className="text-center text-gray-500 mb-8 font-medium">Log in to your secure vault</p>

                {error && (
                    <div className="bg-rose-50 text-rose-600 px-4 py-3 rounded-2xl mb-6 font-medium text-sm text-center border border-rose-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email address</label>
                        <input 
                            type="email" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors placeholder:text-gray-400 font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors placeholder:text-gray-400 font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="pt-2">
                        <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-2xl shadow-md hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : <>Log in <ArrowRight className="w-5 h-5"/></>}
                        </button>
                    </div>
                </form>
                
                <div className="mt-8 text-center">
                    <p className="text-gray-500 font-medium">
                        Don't have an account? 
                        <Link to="/register" className="ml-2 text-blue-600 hover:text-blue-700 font-bold hover:underline underline-offset-4 transition-all">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
