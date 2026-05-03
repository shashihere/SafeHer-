import { Scale, BookOpen, ShieldAlert, FileWarning, ExternalLink, ScrollText, CheckCircle2 } from 'lucide-react';

const CyberLaw = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 w-full min-h-screen bg-transparent text-slate-200 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <header className="mb-12 border-b border-white/10 pb-8 text-center md:text-left relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                    <div className="p-6 bg-blue-600/20 border border-blue-500/50 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] inline-block">
                        <Scale className="w-12 h-12 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-cursive font-extrabold text-white tracking-widest mb-4 drop-shadow-md">Cyber Law & Digital Rights</h1>
                        <p className="text-slate-400 tracking-wide text-lg max-w-2xl font-medium">
                            Empowering you with knowledge. Understand the legal protections available under the Indian Information Technology Act, 2000 and the Indian Penal Code to fight online abuse.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                {/* Left Column - The Laws */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold font-cursive mb-8 flex items-center gap-3 border-b border-white/10 pb-4 text-white">
                            <BookOpen className="w-8 h-8 text-blue-400" />
                            Crucial Legal Sections
                        </h2>
                        
                        <div className="space-y-8">
                            <div className="border-l-4 border-blue-500 pl-6 hover:-translate-x-1 transition-transform">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 flex items-center justify-between text-white">
                                    Section 67 (IT Act)
                                    <span className="text-xs bg-rose-500/20 border border-rose-500/50 text-rose-400 px-3 py-1 tracking-widest rounded-full shadow-[0_0_10px_rgba(225,29,72,0.3)]">5 YRS IMPRISONMENT</span>
                                </h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    <strong className="text-slate-200">Publishing Obscene Material:</strong> Specifically protects against individuals who transmit, publish or cause to be published any material which is lascivious or appeals to the prurient interest in electronic form.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-6 hover:-translate-x-1 transition-transform">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Section 354D (Indian Penal Code)</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    <strong className="text-slate-200">Cyber Stalking:</strong> Prosecutes any man who monitors the use by a woman of the internet, email or any other form of electronic communication, or repeatedly contacts her despite clear indications of disinterest.
                                </p>
                            </div>

                            <div className="border-l-4 border-purple-500 pl-6 hover:-translate-x-1 transition-transform">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Section 354C (Indian Penal Code)</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    <strong className="text-slate-200">Voyeurism:</strong> Punishes the act of capturing or disseminating an image of a woman engaging in a private act in circumstances where she would usually have an expectation of not being observed.
                                </p>
                            </div>

                            <div className="border-l-4 border-amber-500 pl-6 hover:-translate-x-1 transition-transform">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Section 66E (IT Act)</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    <strong className="text-slate-200">Violation of Privacy:</strong> Heavily penalizes the non-consensual capturing, publishing, or transmitting of images containing private areas of any person. (Up to 3 years imprisonment).
                                </p>
                            </div>

                            <div className="border-l-4 border-cyan-500 pl-6 hover:-translate-x-1 transition-transform">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Section 509 (Indian Penal Code)</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    <strong className="text-slate-200">Insulting Modesty:</strong> Triggered when any word is spoken, sound made, or gesture exhibited through digital modes with the intent that such word or gesture outrages the modesty of a woman.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column - Actions & Rights */}
                <div className="space-y-8">
                    <section className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold font-cursive mb-6 flex items-center gap-2 text-white">
                            <ScrollText className="w-6 h-6 text-emerald-400" />
                            Your Immutable Rights
                        </h2>
                        <ul className="space-y-6 text-slate-400 font-medium">
                            <li className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full" />
                                <span><strong className="text-emerald-300 block mb-1">Zero FIR:</strong> You can file a cyber complaint at ANY police station in India, regardless of where the incident occurred.</span>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full" />
                                <span><strong className="text-emerald-300 block mb-1">Right to Anonymity:</strong> You can request the authorities and magistrates to keep your identity strictly confidential during investigation.</span>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full" />
                                <span><strong className="text-emerald-300 block mb-1">Virtual Statement:</strong> Women have the right to record their statement with the police virtually or via email; physical station visits are not mandatory.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-rose-950/20 backdrop-blur-xl border border-rose-900/50 rounded-3xl p-8 relative overflow-hidden group hover:border-rose-500/50 transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.1)] hover:shadow-[0_0_40px_rgba(225,29,72,0.2)]">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-rose-500 group-hover:scale-110 transition-transform duration-500">
                            <ShieldAlert className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold font-cursive mb-2 text-rose-500">How to File an FIR</h2>
                            <p className="text-sm text-slate-400 mb-6 font-bold uppercase tracking-widest">Take immediate action against threats.</p>
                            
                            <ul className="list-decimal pl-5 space-y-3 text-slate-300 mb-8 text-sm font-medium">
                                <li><strong>Do not delete chats.</strong> Screen record the scrolling conversation.</li>
                                <li>Generate the <strong>Formal PDF Report</strong> from your Raksha Action Center to capture exact timestamps.</li>
                                <li>Use the portal below to officially register as a victim.</li>
                                <li>Attach the Raksha PDF directly into their evidence submission box.</li>
                            </ul>
                            
                            <a 
                                href="https://cybercrime.gov.in/" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 bg-rose-600/20 border border-rose-500/50 hover:bg-rose-600 hover:text-white text-rose-400 font-bold py-4 px-6 rounded-xl uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] w-full text-center"
                            >
                                National Cyber Portal <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            <div className="mt-8 p-6 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 bg-slate-900/40 backdrop-blur-xl relative z-10">
                <FileWarning className="w-8 h-8 text-amber-500 shrink-0" />
                <p className="text-sm text-slate-400 italic leading-relaxed font-medium">
                    <strong className="text-amber-400">Disclaimer:</strong> The Raksha Platform provides this centralized legal compilation for educational and empowerment purposes only. We are a technical support system, not a law firm. Always consult with a registered legal professional or directly approach your nearest Cyber Cell or Mahila Police Thana for official procedures.
                </p>
            </div>
        </div>
    );
};

export default CyberLaw;
