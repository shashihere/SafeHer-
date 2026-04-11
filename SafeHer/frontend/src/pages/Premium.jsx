import { ShieldCheck, Anchor, BookOpen, AlertCircle } from 'lucide-react';

const Premium = () => {
    return (
        <div className="bg-gradient-to-br from-pink-50/40 via-white to-purple-50/40 min-h-screen text-slate-800 pt-24 pb-24 relative overflow-hidden">
            {/* Ambient background blur */}
            <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/30 blur-[120px] rounded-full pointer-events-none -z-10"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-pink-200/30 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24 relative">
                    <div className="inline-flex items-center justify-center p-4 bg-purple-50 text-purple-500 rounded-full mb-6 shadow-sm border border-purple-100">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold text-purple-900 mb-6 drop-shadow-sm tracking-wide">Digital Awareness</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-sans font-medium tracking-wide">
                        Empowering guidance to navigate the digital world safely. We stand with you against online hostility. You are stronger equipped with knowledge.
                    </p>
                </div>

                <div className="space-y-32">
                    
                    {/* Section 1: The Unseen Threat */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-purple-500 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 shadow-sm inline-block">Lesson 01</span>
                            <h2 className="text-4xl text-slate-800 font-playfair font-bold tracking-wide">The Unseen Threat</h2>
                            <p className="text-slate-600 leading-relaxed text-lg pb-4 font-medium">
                                Not every danger makes a sound. Cyberbullies often lurk behind the veil of anonymity, waiting to intrude upon your peace. Recognize the signs of unseen predators. You are not alone against the invisible shadows — SafeHer is your shield.
                            </p>
                            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-purple-100 shadow-sm font-bold uppercase tracking-widest text-xs text-purple-700 hover:shadow-md transition-shadow">
                                <ShieldCheck className="w-5 h-5 text-purple-400" /> Be Vigilant
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="p-4 bg-white/60 backdrop-blur-sm border border-purple-100 rounded-[3rem] shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl">
                                <img 
                                    src="/images/monster.png" 
                                    alt="The unseen threat monster watching a girl" 
                                    className="w-full rounded-[2.5rem] object-cover bg-purple-50 mix-blend-multiply opacity-90 shadow-inner"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 2: DOs and DON'Ts */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="p-4 bg-white/60 backdrop-blur-sm border border-pink-100 rounded-[3rem] shadow-xl -rotate-1 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl">
                                <img 
                                    src="/images/dos_donts.png" 
                                    alt="Do's and Don'ts Digital security guide" 
                                    className="w-full rounded-[2.5rem] object-cover bg-pink-50 mix-blend-multiply opacity-90 shadow-inner"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100 shadow-sm inline-block">Lesson 02</span>
                            <h2 className="text-4xl text-slate-800 font-playfair font-bold tracking-wide">Digital Safety Guide</h2>
                            <p className="text-slate-600 leading-relaxed text-lg pb-4 font-medium">
                                Knowledge is power. Familiarize yourself with the crucial DOs and DON'Ts of online interactions. Protect your personal space, lock down your data, and understand that setting boundaries isn't just an option — it's a necessity.
                            </p>
                            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-pink-100 shadow-sm font-bold uppercase tracking-widest text-xs text-pink-700 hover:shadow-md transition-shadow">
                                <BookOpen className="w-5 h-5 text-pink-400" /> Know The Rules
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Unwanted Advances */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm inline-block">Lesson 03</span>
                            <h2 className="text-4xl text-slate-800 font-playfair font-bold tracking-wide">Unwanted Advances</h2>
                            <p className="text-slate-600 leading-relaxed text-lg pb-4 font-medium">
                                Unsolicited approaches and harassment can feel like an invasion. Reclaim your space from digital harassment. Your digital life belongs to you, and no one has the right to reach into your world without permission. Stay strong and speak up.
                            </p>
                            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-indigo-100 shadow-sm font-bold uppercase tracking-widest text-xs text-indigo-700 hover:shadow-md transition-shadow">
                                <Anchor className="w-5 h-5 text-indigo-400" /> Stand Your Ground
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="p-4 bg-white/60 backdrop-blur-sm border border-indigo-100 rounded-[3rem] shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl">
                                <img 
                                    src="/images/hands.png" 
                                    alt="Hands grabbing a girl" 
                                    className="w-full rounded-[2.5rem] object-cover bg-indigo-50 mix-blend-multiply opacity-90 shadow-inner"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 4: The Weight of Words */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="p-4 bg-white/60 backdrop-blur-sm border border-rose-100 rounded-[3rem] shadow-xl -rotate-1 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl">
                                <img 
                                    src="/images/cyberbully.png" 
                                    alt="Sad girl with hate texts" 
                                    className="w-full rounded-[2.5rem] object-cover bg-rose-50 mix-blend-multiply opacity-90 shadow-inner"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 shadow-sm inline-block">Lesson 04</span>
                            <h2 className="text-4xl text-slate-800 font-playfair font-bold tracking-wide">The Weight of Words</h2>
                            <p className="text-slate-600 leading-relaxed text-lg pb-4 font-medium">
                                Words can cut deeper than we realize. The constant influx of hate and negativity on social media is designed to break your spirit. Turn the tide against cyberbullying by prioritizing your mental health and reporting systemic abuse.
                            </p>
                            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-rose-100 shadow-sm font-bold uppercase tracking-widest text-xs text-rose-700 hover:shadow-md transition-shadow">
                                <AlertCircle className="w-5 h-5 text-rose-400" /> Protect Your Peace
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Premium;
