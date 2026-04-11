import { ShieldCheck, Anchor, BookOpen, AlertCircle } from 'lucide-react';

const Premium = () => {
    return (
        <div className="bg-white min-h-screen text-black pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-24">
                    <h1 className="text-6xl md:text-8xl font-cursive mb-6">Gain Your Trust</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-sans uppercase tracking-widest text-sm">
                        Premium awareness and guidance to navigate the digital world safely. We stand with you against online hostility.
                    </p>
                </div>

                <div className="space-y-40">
                    
                    {/* Section 1: The Unseen Threat */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-8">
                            <h2 className="text-5xl font-cursive">The Unseen Threat</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Not every danger makes a sound. Cyberbullies often lurk behind the veil of anonymity, waiting to intrude upon your peace. Recognize the signs of unseen predators. You are not alone against the invisible shadows — SafeHer is your shield.
                            </p>
                            <div className="inline-flex items-center gap-3 border-b-2 border-black pb-2 font-bold uppercase tracking-widest text-sm">
                                <ShieldCheck className="w-5 h-5" /> Be Vigilant
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img 
                                src="/images/monster.png" 
                                alt="The unseen threat monster watching a girl" 
                                className="w-full border border-gray-200 hover:border-black transition-colors"
                            />
                        </div>
                    </section>

                    {/* Section 2: DOs and DON'Ts */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <img 
                                src="/images/dos_donts.png" 
                                alt="Do's and Don'ts Digital security guide" 
                                className="w-full border border-gray-200 hover:border-black transition-colors"
                            />
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-5xl font-cursive">Digital Safety Guide</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Knowledge is power. Familiarize yourself with the crucial DOs and DON'Ts of online interactions. Protect your personal space, lock down your data, and understand that setting boundaries isn't just an option — it's a necessity.
                            </p>
                            <div className="inline-flex items-center gap-3 border-b-2 border-black pb-2 font-bold uppercase tracking-widest text-sm">
                                <BookOpen className="w-5 h-5" /> Know The Rules
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Unwanted Advances */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-8">
                            <h2 className="text-5xl font-cursive">Unwanted Advances</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Unsolicited approaches and harassment can feel like an invasion. Reclaim your space from digital harassment. Your digital life belongs to you, and no one has the right to reach into your world without permission. Stay strong and speak up.
                            </p>
                            <div className="inline-flex items-center gap-3 border-b-2 border-black pb-2 font-bold uppercase tracking-widest text-sm">
                                <Anchor className="w-5 h-5" /> Stand Your Ground
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img 
                                src="/images/hands.png" 
                                alt="Hands grabbing a girl" 
                                className="w-full border border-gray-200 hover:border-black transition-colors"
                            />
                        </div>
                    </section>

                    {/* Section 4: The Weight of Words */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <img 
                                src="/images/cyberbully.png" 
                                alt="Sad girl with hate texts" 
                                className="w-full border border-gray-200 hover:border-black transition-colors"
                            />
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-5xl font-cursive">The Weight of Words</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Words can cut deeper than we realize. The constant influx of hate and negativity on social media is designed to break your spirit. Turn the tide against cyberbullying by prioritizing your mental health and reporting systemic abuse.
                            </p>
                            <div className="inline-flex items-center gap-3 border-b-2 border-black pb-2 font-bold uppercase tracking-widest text-sm">
                                <AlertCircle className="w-5 h-5" /> Protect Your Peace
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Premium;
