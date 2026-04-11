import { Scale, BookOpen, ShieldAlert, FileWarning, ExternalLink, ScrollText, CheckCircle2 } from 'lucide-react';

const CyberLaw = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 w-full min-h-screen bg-white text-black">
            <header className="mb-12 border-b border-gray-200 pb-8 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                    <div className="p-6 bg-black border border-gray-200 inline-block">
                        <Scale className="w-12 h-12 text-white" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-cursive font-bold text-black tracking-widest mb-4">Cyber Law & Digital Rights</h1>
                        <p className="text-gray-800 tracking-wide text-lg max-w-2xl">
                            Empowering you with knowledge. Understand the legal protections available under the Indian Information Technology Act, 2000 and the Indian Penal Code to fight online abuse.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - The Laws */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-gray-100 border border-gray-200 p-8">
                        <h2 className="text-3xl font-bold font-cursive mb-8 flex items-center gap-3 border-b border-gray-700 pb-4">
                            <BookOpen className="w-8 h-8 text-black" />
                            Crucial Legal Sections
                        </h2>
                        
                        <div className="space-y-8">
                            <div className="border-l-4 border-black pl-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 flex items-center justify-between">
                                    Section 67 (IT Act)
                                    <span className="text-xs bg-red-600 text-black px-2 py-1 tracking-widest rounded-sm">5 YRS IMPRISONMENT</span>
                                </h3>
                                <p className="text-gray-800 leading-relaxed">
                                    <strong className="text-black">Publishing Obscene Material:</strong> Specifically protects against individuals who transmit, publish or cause to be published any material which is lascivious or appeals to the prurient interest in electronic form.
                                </p>
                            </div>

                            <div className="border-l-4 border-gray-400 pl-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-gray-900">Section 354D (Indian Penal Code)</h3>
                                <p className="text-gray-800 leading-relaxed">
                                    <strong className="text-black">Cyber Stalking:</strong> Prosecutes any man who monitors the use by a woman of the internet, email or any other form of electronic communication, or repeatedly contacts her despite clear indications of disinterest.
                                </p>
                            </div>

                            <div className="border-l-4 border-gray-600 pl-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-gray-900">Section 354C (Indian Penal Code)</h3>
                                <p className="text-gray-800 leading-relaxed">
                                    <strong className="text-black">Voyeurism:</strong> Punishes the act of capturing or disseminating an image of a woman engaging in a private act in circumstances where she would usually have an expectation of not being observed.
                                </p>
                            </div>

                            <div className="border-l-4 border-gray-700 pl-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-gray-800">Section 66E (IT Act)</h3>
                                <p className="text-gray-800 leading-relaxed">
                                    <strong className="text-black">Violation of Privacy:</strong> Heavily penalizes the non-consensual capturing, publishing, or transmitting of images containing private areas of any person. (Up to 3 years imprisonment).
                                </p>
                            </div>

                            <div className="border-l-4 border-gray-200 pl-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-gray-900">Section 509 (Indian Penal Code)</h3>
                                <p className="text-gray-800 leading-relaxed">
                                    <strong className="text-black">Insulting Modesty:</strong> Triggered when any word is spoken, sound made, or gesture exhibited through digital modes with the intent that such word or gesture outrages the modesty of a woman.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column - Actions & Rights */}
                <div className="space-y-8">
                    <section className="bg-white border border-black p-8">
                        <h2 className="text-2xl font-bold font-cursive mb-6 flex items-center gap-2">
                            <ScrollText className="w-6 h-6 text-black" />
                            Your Immutable Rights
                        </h2>
                        <ul className="space-y-4 text-gray-900">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span><strong className="text-black">Zero FIR:</strong> You can file a cyber complaint at ANY police station in India, regardless of where the incident occurred.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span><strong className="text-black">Right to Anonymity:</strong> You can request the authorities and magistrates to keep your identity strictly confidential during investigation.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span><strong className="text-black">Virtual Statement:</strong> Women have the right to record their statement with the police virtually or via email; physical station visits are not mandatory.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white border border-red-900 glow-red p-8 relative overflow-hidden group hover:border-red-600 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                            <ShieldAlert className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold font-cursive mb-4 text-red-500">How to File an FIR</h2>
                            <p className="text-sm text-gray-800 mb-6">Take immediate action against online threats.</p>
                            
                            <ul className="list-decimal pl-5 space-y-3 text-gray-900 mb-8 text-sm">
                                <li><strong>Do not delete chats.</strong> Screen record the scrolling conversation.</li>
                                <li>Generate the <strong>Formal PDF Report</strong> from your SafeHer Evidence Vault to capture exact timestamps.</li>
                                <li>Use the portal below to officially register as a victim.</li>
                                <li>Attach the SafeHer PDF directly into their evidence submission box.</li>
                            </ul>
                            
                            <a 
                                href="https://cybercrime.gov.in/" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-black font-bold py-4 px-6 uppercase tracking-widest transition-all w-full text-center"
                            >
                                National Cyber Portal <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            <div className="mt-8 p-6 border border-gray-200 flex flex-col md:flex-row items-center md:items-start gap-4 bg-gray-100 border-l-4 border-l-gray-500">
                <FileWarning className="w-8 h-8 text-gray-800 shrink-0" />
                <p className="text-sm text-gray-800 italic leading-relaxed">
                    <strong>Disclaimer:</strong> The SafeHer Platform provides this centralized legal compilation for educational and empowerment purposes only. We are a technical support system, not a law firm. Always consult with a registered legal professional or directly approach your nearest Cyber Cell or Mahila Police Thana for official procedures.
                </p>
            </div>
        </div>
    );
};

export default CyberLaw;
