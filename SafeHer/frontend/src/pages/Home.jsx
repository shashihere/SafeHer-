import { Link } from 'react-router-dom';
import { ShieldAlert, Image, Scale, ArrowRight, HeartPulse, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen">
            {/* Hero Section based on First Image */}
            <section className="w-full relative flex flex-col items-center justify-start pb-16 bg-black overflow-hidden relative">
                {/* Full Width Edge-to-Edge Image without distortion */}
                <div className="w-full max-w-full flex justify-center bg-black">
                    <img 
                        src="/images/landing.png" 
                        alt="Safe Her Landing" 
                        className="w-full max-w-[1200px] h-auto object-contain object-center z-10 mix-blend-lighten"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
                
                {/* Buttons Below */}
                <div className="mt-8 flex gap-6 flex-col sm:flex-row w-full max-w-3xl px-4 z-20">
                    <Link to="/report" className="flex-1 flex items-center justify-center gap-2 bg-white text-black px-8 py-5 rounded-none font-bold transition-all hover:bg-gray-200 border-2 border-white uppercase tracking-widest text-sm">
                        Report Abuse <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/premium" className="flex-1 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 border-2 border-white px-8 py-5 rounded-none font-bold transition-all uppercase tracking-widest text-sm">
                        <Star className="w-5 h-5" /> Trust
                    </Link>
                </div>
            </section>

            {/* Features Section - B&W Style */}
            <section className="w-full bg-black border-t border-gray-800 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-cursive tracking-wide">Safety is Your Right</h2>
                        <p className="text-gray-400 font-sans uppercase tracking-widest text-sm">Empowered Women Empower the World.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<ShieldAlert className="w-8 h-8 text-black" />}
                            title="AI Protection"
                            description="Our AI engine analyzes messages and comments in real-time, instantly warning you of toxicity and severe threats."
                        />
                        <FeatureCard 
                            icon={<Image className="w-8 h-8 text-black" />}
                            title="Secure Evidence Vault"
                            description="Upload screenshots securely. We store your evidence so you can retrieve it whenever you're ready to take legal action."
                        />
                        <FeatureCard 
                            icon={<Scale className="w-8 h-8 text-black" />}
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
    <div className="p-8 bg-black border border-gray-700 hover:border-white transition-colors group">
        <div className="mb-6 p-4 inline-block bg-white group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-2xl font-cursive font-bold mb-3 tracking-wider">{title}</h3>
        <p className="text-gray-400 font-sans text-sm leading-relaxed tracking-wide">{description}</p>
    </div>
);

export default Home;
