import { Link } from 'react-router-dom';
import { ShieldAlert, Activity, Scale, ArrowRight, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center bg-transparent min-h-screen pt-12 md:pt-24">
            {/* Brutalist Typographic Hero Section */}
            <section className="w-full flex flex-col items-center justify-center pb-24 px-4">
                
                <div className="max-w-5xl w-full text-center mb-16">
                    <div className="inline-block border-4 border-black bg-yellow-400 px-6 py-2 font-extrabold uppercase tracking-widest mb-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-2">
                        NO MORE COMPROMISE
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black font-cursive leading-none uppercase tracking-tighter text-black mb-6">
                        YOUR SAFETY.<br/>
                        <span className="text-red-500 underline decoration-8 underline-offset-8">YOUR RULES.</span>
                    </h1>
                    <p className="text-xl md:text-3xl font-bold uppercase tracking-widest text-slate-800 max-w-3xl mx-auto mt-12">
                        The ultimate high-speed emergency response tool for women.
                    </p>
                </div>
                
                {/* Buttons Below */}
                <div className="mt-4 flex gap-6 flex-col sm:flex-row w-full max-w-3xl px-4 z-20">
                    <Link to="/dashboard" className="flex-1 flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-6 font-black border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:bg-blue-500 uppercase tracking-widest text-lg transition-all">
                        OPEN ACTION CENTER <ArrowRight className="w-6 h-6" />
                    </Link>
                    <Link to="/premium" className="flex-1 flex items-center justify-center gap-3 bg-white text-black border-4 border-black px-8 py-6 font-black hover:-translate-y-2 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:bg-gray-100 uppercase tracking-widest text-lg transition-all">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> PREMIUM TRUST
                    </Link>
                </div>
            </section>

            {/* Features Section - Brutalist Style */}
            <section className="w-full bg-black text-white border-y-8 border-black py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-black mb-6 font-cursive tracking-tighter uppercase text-yellow-400">UNBREAKABLE SECURITY</h2>
                        <p className="font-sans uppercase tracking-widest text-lg font-bold">Empowered Women Empower the World.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Activity className="w-12 h-12 text-black" />}
                            title="LIVE SOS RADAR"
                            description="Instantly broadcast your live GPS location and alert your emergency contacts in a single tap."
                            bgColor="bg-red-500"
                        />
                        <FeatureCard 
                            icon={<ShieldAlert className="w-12 h-12 text-black" />}
                            title="SECRET EVIDENCE"
                            description="Record audio stealthily and upload photos directly to a secure, encrypted cloud vault that cannot be tampered with."
                            bgColor="bg-blue-500"
                        />
                        <FeatureCard 
                            icon={<Scale className="w-12 h-12 text-black" />}
                            title="AUTO-FIR GEN"
                            description="Compile all your logged evidence into a professionally formatted PDF instantly for legal and police reporting."
                            bgColor="bg-green-400"
                        />
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="w-full bg-yellow-400 text-black border-b-8 border-black py-24 px-4 relative">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                    <div className="inline-block border-4 border-black bg-white px-6 py-2 font-black uppercase tracking-widest mb-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-2">
                        THE MISSION
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-10 font-cursive tracking-tighter uppercase">WHY WE BUILT RAKSHA</h2>
                    <p className="text-xl md:text-3xl font-bold leading-relaxed tracking-wide mb-12 border-4 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] text-left hover:-translate-y-2 transition-transform duration-300">
                        Raksha is not just an application. It's a <strong className="text-red-600 underline decoration-4 underline-offset-4">reactionary weapon</strong> against digital and physical harassment. We noticed that traditional reporting takes too long, and evidence is easily deleted or manipulated by perpetrators. 
                        <br/><br/>
                        We built this platform to give you a <strong className="text-blue-600 uppercase">one-tap advantage</strong>. Instant live-tracking, a stealth evidence vault, and automated legal FIR generation. Your safety should never be a negotiation.
                    </p>
                    <div className="flex gap-4">
                         <div className="w-12 h-12 bg-red-500 border-4 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)]"></div>
                         <div className="w-12 h-12 bg-blue-500 border-4 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)]"></div>
                         <div className="w-12 h-12 bg-green-400 border-4 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)]"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, bgColor }) => (
    <div className={`p-8 ${bgColor} border-4 border-white shadow-[8px_8px_0px_rgba(255,255,255,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_rgba(255,255,255,1)] transition-all group`}>
        <div className="mb-8 p-4 inline-block bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-3xl font-cursive font-black mb-4 tracking-tighter text-black uppercase">{title}</h3>
        <p className="text-black font-sans text-lg font-bold leading-relaxed tracking-wide">{description}</p>
    </div>
);

export default Home;
