import { Link } from 'react-router-dom';
import { ShieldAlert, Activity, Scale, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center bg-[#fcfcfc] min-h-screen text-[#1d1d1d] overflow-x-hidden">
            
            {/* Soft Startup Hero Section */}
            <section className="w-full flex flex-col items-center justify-center py-20 md:py-32 px-4 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-40 right-10 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                <div className="max-w-4xl w-full text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-sm mb-8">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Your Private Safety Network</span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1b1b25] mb-6 leading-tight">
                        Everyday safety, <br className="hidden md:block"/>
                        <span className="text-blue-600">without compromise.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        Create a private Bubble with your people. One-tap SOS, live location tracking, and secure evidence vault, built for everyday peace of mind.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                            Get the App <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                            Open Action Center
                        </Link>
                    </div>
                </div>
            </section>

            {/* Soft Features Section */}
            <section className="w-full bg-white py-24 px-4 border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1d1d1d] mb-4">Safety in your hands</h2>
                        <p className="text-gray-500 font-medium text-lg">Simple tools to protect, alert, and stay connected.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Activity className="w-8 h-8 text-rose-500" />}
                            title="Live SOS Radar"
                            description="Instantly broadcast your live GPS location and alert your trusted contacts in a single tap."
                            iconBg="bg-rose-50"
                        />
                        <FeatureCard 
                            icon={<ShieldAlert className="w-8 h-8 text-blue-600" />}
                            title="Secret Evidence Vault"
                            description="Record audio stealthily and upload photos directly to a secure, encrypted cloud."
                            iconBg="bg-blue-50"
                        />
                        <FeatureCard 
                            icon={<Scale className="w-8 h-8 text-indigo-600" />}
                            title="Auto-FIR Generation"
                            description="Compile all your logged evidence into a professionally formatted PDF instantly."
                            iconBg="bg-indigo-50"
                        />
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="w-full bg-[#1b1b25] text-white py-24 px-4 relative overflow-hidden">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Built for real life.<br/>Not surveillance.</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Raksha is built around real relationships. We give you a one-tap advantage against harassment without selling your data. No ads. No tracking without consent. Just pure, reliable safety when it matters most.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-200 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-blue-400" /> Invite-only connections
                            </li>
                            <li className="flex items-center gap-3 text-gray-200 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-blue-400" /> Private Mode available
                            </li>
                            <li className="flex items-center gap-3 text-gray-200 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-blue-400" /> Delete your data anytime
                            </li>
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-rose-400 rounded-3xl opacity-20 blur-2xl"></div>
                        <div className="bg-[#242430] p-8 md:p-12 rounded-3xl relative border border-white/10 soft-shadow-lg">
                            <div className="flex gap-4 mb-8">
                                 <div className="w-12 h-12 bg-rose-500 rounded-full shadow-lg flex items-center justify-center"><Activity className="w-6 h-6 text-white"/></div>
                                 <div className="w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center"><ShieldAlert className="w-6 h-6 text-white"/></div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Your safety kit</h3>
                            <p className="text-gray-400">Everything you need to secure your identity and protect your physical space in one clean application.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, iconBg }) => (
    <div className="bg-white p-8 rounded-3xl soft-shadow hover:soft-shadow-lg transition-all duration-300 border border-gray-50 group">
        <div className={`mb-6 w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-[#1d1d1d]">{title}</h3>
        <p className="text-gray-500 leading-relaxed font-medium">{description}</p>
    </div>
);

export default Home;
