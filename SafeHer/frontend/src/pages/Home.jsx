import { Link } from 'react-router-dom';
import { ShieldAlert, Image, Scale, ArrowRight, HeartPulse, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Hero Section based on First Image */}
            <section className="w-full relative flex flex-col items-center justify-start pb-16 overflow-hidden">
                {/* Full Width Edge-to-Edge Image without distortion */}
                <div className="w-full max-w-full flex justify-center">
                    <img 
                        src="/images/landing.png" 
                        alt="Safe Her Landing" 
                        className="w-full max-w-[1200px] h-auto object-contain object-center z-10"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
                
                {/* Buttons Below */}
                <div className="mt-8 flex gap-6 flex-col sm:flex-row w-full max-w-3xl px-4 z-20">
                    <Link to="/report" className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:-translate-y-1 tracking-wider text-sm shadow-lg">
                        Report Abuse <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/premium" className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 hover:text-purple-600 border border-purple-200 px-8 py-4 rounded-full font-bold transition-all tracking-wider text-sm shadow-md hover:-translate-y-1">
                        <Star className="w-5 h-5 text-purple-400" /> Trust
                    </Link>
                </div>
            </section>

            {/* Features Section - Soft Style */}
            <section className="w-full py-24 relative">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-purple-900 tracking-wide">Safety is Your Right</h2>
                        <p className="text-slate-500 font-sans tracking-widest text-sm font-medium">Empowered Women Empower the World.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<ShieldAlert className="w-8 h-8 text-purple-500" />}
                            title="AI Protection"
                            description="Our AI engine analyzes messages and comments in real-time, instantly warning you of toxicity and severe threats."
                        />
                        <FeatureCard 
                            icon={<Image className="w-8 h-8 text-pink-500" />}
                            title="Secure Evidence Vault"
                            description="Upload screenshots securely. We store your evidence so you can retrieve it whenever you're ready to take legal action."
                        />
                        <FeatureCard 
                            icon={<Scale className="w-8 h-8 text-purple-500" />}
                            title="Legal Help & Reports"
                            description="Generate structured reports and use pre-written FIR templates to fast-track your path to justice."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 bg-white/70 backdrop-blur-sm border border-purple-100/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(167,139,250,0.15)] hover:-translate-y-1 transition-all duration-300 group">
        <div className="mb-6 p-4 inline-block bg-purple-50 rounded-2xl group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
            {icon}
        </div>
        <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-600 font-sans text-sm leading-relaxed">{description}</p>
    </div>
);

export default Home;
