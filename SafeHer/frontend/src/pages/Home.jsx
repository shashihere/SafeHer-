import { Link } from 'react-router-dom';
import { ShieldAlert, Image, Scale, ArrowRight, Star, Activity } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center bg-transparent min-h-screen">
            {/* Hero Section */}
            <section className="w-full relative flex flex-col items-center justify-start pb-16 bg-transparent overflow-hidden">
                {/* Optional subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
                
                {/* Hero Image */}
                <div className="w-full max-w-full flex justify-center bg-transparent z-10">
                    <img 
                        src="/images/landing.png" 
                        alt="Raksha Landing" 
                        className="w-full max-w-[1200px] h-auto object-contain object-center drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
                
                {/* Buttons Below */}
                <div className="mt-8 flex gap-6 flex-col sm:flex-row w-full max-w-3xl px-4 z-20">
                    <Link to="/dashboard" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-500 px-8 py-5 font-extrabold transition-all duration-300 border border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 uppercase tracking-widest text-sm rounded-xl">
                        Open Action Center <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/premium" className="flex-1 flex items-center justify-center gap-2 bg-slate-900/50 backdrop-blur-md text-white border border-white/10 hover:border-blue-500/50 hover:bg-slate-800/80 px-8 py-5 font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase tracking-widest text-sm rounded-xl">
                        <Star className="w-5 h-5 text-blue-400" /> Premium Trust
                    </Link>
                </div>
            </section>

            {/* Features Section - Dark Glassmorphism */}
            <section className="w-full bg-slate-950/50 border-t border-white/10 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-cursive tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Safety is Your Right</h2>
                        <p className="text-slate-400 font-sans uppercase tracking-widest text-sm font-bold">Empowered Women Empower the World.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Activity className="w-8 h-8 text-blue-400" />}
                            title="Live SOS Radar"
                            description="Instantly broadcast your live GPS location and alert your emergency contacts in a single tap."
                        />
                        <FeatureCard 
                            icon={<ShieldAlert className="w-8 h-8 text-emerald-400" />}
                            title="Secret Evidence"
                            description="Record audio stealthily and upload photos directly to a secure, encrypted cloud vault that cannot be tampered with."
                        />
                        <FeatureCard 
                            icon={<Scale className="w-8 h-8 text-purple-400" />}
                            title="Auto-FIR Generation"
                            description="Compile all your logged evidence into a professionally formatted PDF instantly for legal and police reporting."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group rounded-2xl">
        <div className="mb-6 p-4 inline-block bg-slate-800/50 border border-white/5 rounded-xl group-hover:scale-110 group-hover:bg-slate-800 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            {icon}
        </div>
        <h3 className="text-2xl font-cursive font-bold mb-3 tracking-wider text-white">{title}</h3>
        <p className="text-slate-400 font-sans text-sm leading-relaxed tracking-wide font-medium">{description}</p>
    </div>
);

export default Home;
