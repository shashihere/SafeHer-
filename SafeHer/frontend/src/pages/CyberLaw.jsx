import { Scale, BookOpen, ShieldAlert, FileWarning, ExternalLink, ScrollText, CheckCircle2 } from 'lucide-react';

const CyberLaw = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 w-full min-h-screen text-slate-800">
            <header className="mb-12 border-b border-purple-100 pb-8 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                    <div className="p-5 bg-purple-50 shadow-inner border border-purple-100 inline-flex items-center justify-center rounded-3xl">
                        <Scale className="w-10 h-10 text-purple-500" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-purple-900 tracking-wide mb-4">Cyber Law & Digital Rights</h1>
                        <p className="text-slate-500 tracking-wide text-base md:text-lg max-w-3xl leading-relaxed">
                            Empowering you with knowledge. Understand the legal protections available under the Indian Information Technology Act, 2000 and the Indian Penal Code to fight online abuse safely.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - The Laws */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100 p-8">
                        <h2 className="text-3xl font-bold font-playfair mb-8 flex items-center gap-3 text-purple-900 border-b border-purple-50 pb-4">
                            <BookOpen className="w-8 h-8 text-pink-400" />
                            Crucial Legal Sections
                        </h2>
                        
                        <div className="space-y-8">
                            <div className="border-l-4 border-purple-400 pl-6 bg-purple-50/30 py-2 rounded-r-xl">
                                <h3 className="text-lg font-bold uppercase tracking-widest mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-slate-800">
                                    Section 67 (IT Act)
                                    <span className="text-xs bg-red-100 text-red-600 px-3 py-1 font-bold tracking-widest rounded-full self-start sm:self-auto">5 YRS IMPRISONMENT</span>
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    <strong className="text-slate-700">Publishing Obscene Material:</strong> Protects against individuals who transmit, publish or cause to be published any material which is lascivious or appeals to the prurient interest in electronic form.
                                </p>
                            </div>

                            <div className="border-l-4 border-pink-400 pl-6 bg-pink-50/20 py-2 rounded-r-xl">
                                <h3 className="text-lg font-bold uppercase tracking-widest mb-2 text-slate-800">Section 354D (Indian Penal Code)</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    <strong className="text-slate-700">Cyber Stalking:</strong> Prosecutes any man who monitors the use by a woman of the internet, email or any other form of electronic communication, or repeatedly contacts her despite clear indications of disinterest.
                                </p>
                            </div>

                            <div className="border-l-4 border-purple-300 pl-6 bg-purple-50/20 py-2 rounded-r-xl">
                                <h3 className="text-lg font-bold uppercase tracking-widest mb-2 text-slate-800">Section 354C (Indian Penal Code)</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    <strong className="text-slate-700">Voyeurism:</strong> Punishes the act of capturing or disseminating an image of a woman engaging in a private act in circumstances where she would usually have an expectation of not being observed.
                                </p>
                            </div>

                            <div className="border-l-4 border-pink-300 pl-6 bg-pink-50/20 py-2 rounded-r-xl">
                                <h3 className="text-lg font-bold uppercase tracking-widest mb-2 text-slate-800">Section 66E (IT Act)</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    <strong className="text-slate-700">Violation of Privacy:</strong> Heavily penalizes the non-consensual capturing, publishing, or transmitting of images containing private areas of any person. <i>(Up to 3 years imprisonment)</i>.
                                </p>
                            </div>

                            <div className="border-l-4 border-slate-300 pl-6 bg-slate-50/40 py-2 rounded-r-xl">
                                <h3 className="text-lg font-bold uppercase tracking-widest mb-2 text-slate-800">Section 509 (Indian Penal Code)</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    <strong className="text-slate-700">Insulting Modesty:</strong> Triggered when any word is spoken, sound made, or gesture exhibited through digital modes with the intent that such word or gesture outrages the modesty of a woman.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column - Actions & Rights */}
                <div className="space-y-8">
                    <section className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 rounded-3xl border border-green-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold font-playfair mb-6 flex items-center gap-2 text-emerald-800">
                            <ScrollText className="w-6 h-6 text-emerald-500" />
                            Your Immutable Rights
                        </h2>
                        <ul className="space-y-5 text-emerald-700/80 text-sm">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span><strong className="text-emerald-800">Zero FIR:</strong> You can file a cyber complaint at ANY police station in India, regardless of where the incident occurred.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span><strong className="text-emerald-800">Right to Anonymity:</strong> You can request the authorities and magistrates to keep your identity strictly confidential during investigation.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span><strong className="text-emerald-800">Virtual Statement:</strong> Women have the right to record their statement with the police virtually or via email; physical visits are not mandatory.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-red-50/50 border border-red-200 rounded-3xl p-8 relative overflow-hidden group hover:border-red-300 transition-colors shadow-sm">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                            <ShieldAlert className="w-40 h-40 text-red-500" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold font-playfair mb-3 text-red-600">How to File an FIR</h2>
                            <p className="text-sm text-red-500/80 mb-6 font-medium">Take immediate action against online threats securely.</p>
                            
                            <ul className="list-decimal pl-5 space-y-3 text-slate-600 mb-8 text-sm marker:text-red-400 marker:font-bold">
                                <li><strong>Do not delete chats.</strong> Screen record the scrolling conversation.</li>
                                <li>Generate the <strong>Formal PDF Report</strong> from your SafeHer Evidence Vault to capture exact timestamps.</li>
                                <li>Use the portal below to officially register as a victim.</li>
                                <li>Attach the SafeHer PDF directly into their evidence submission box.</li>
                            </ul>
                            
                            <a 
                                href="https://cybercrime.gov.in/" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-6 uppercase tracking-widest transition-all w-full text-center rounded-full shadow-md text-xs sm:text-sm"
                            >
                                National Cyber Portal <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            <div className="mt-8 p-6 md:p-8 rounded-3xl border border-purple-100 flex flex-col md:flex-row items-center md:items-start gap-6 bg-purple-50/50 shadow-inner">
                <div className="p-3 bg-purple-100 rounded-full shrink-0">
                    <FileWarning className="w-6 h-6 text-purple-500" />
                </div>
                <p className="text-sm text-slate-500 italic leading-relaxed text-center md:text-left">
                    <strong className="text-purple-700">Disclaimer:</strong> The SafeHer Platform provides this centralized legal compilation for educational and empowerment purposes only. We are a technical support system, not a law firm. Always consult with a registered legal professional or directly approach your nearest Cyber Cell or Mahila Police Thana for official procedures. You are not alone.
                </p>
            </div>
        </div>
    );
};

export default CyberLaw;
