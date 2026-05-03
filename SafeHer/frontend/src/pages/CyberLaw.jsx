import { Scale, BookOpen, ShieldAlert, FileWarning, ExternalLink, ScrollText, CheckCircle2 } from 'lucide-react';

const CyberLaw = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 w-full min-h-screen bg-[#fdfdfd] text-black">
            <header className="mb-16 border-b-8 border-black pb-12 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-4">
                    <div className="p-8 bg-blue-600 border-8 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] inline-block rotate-3">
                        <Scale className="w-16 h-16 text-white" />
                    </div>
                    <div>
                        <h1 className="text-6xl md:text-8xl font-cursive font-black tracking-tighter mb-6 uppercase">
                            KNOW <span className="text-white bg-black px-4 py-1 border-4 border-black">YOUR RIGHTS</span>
                        </h1>
                        <p className="text-black font-bold tracking-widest text-xl max-w-3xl leading-relaxed uppercase bg-yellow-400 border-4 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            Understand the legal protections available under the Indian Information Technology Act, 2000 and the Indian Penal Code to fight online abuse.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column - The Laws */}
                <div className="lg:col-span-2 space-y-12">
                    <section className="bg-white border-8 border-black p-8 md:p-12 shadow-[12px_12px_0px_rgba(0,0,0,1)] relative">
                        <div className="absolute top-0 left-0 w-full h-4 bg-black"></div>
                        <h2 className="text-4xl font-black font-cursive mb-12 mt-4 flex items-center gap-4 border-b-4 border-black pb-6 uppercase">
                            <BookOpen className="w-10 h-10 text-blue-600" />
                            CRUCIAL LEGAL SECTIONS
                        </h2>
                        
                        <div className="space-y-10">
                            <div className="border-l-8 border-blue-600 pl-8 bg-gray-50 p-6 border-y-4 border-r-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 flex items-center justify-between">
                                    Section 67 (IT Act)
                                    <span className="text-xs font-black bg-red-500 text-white px-4 py-2 tracking-widest border-2 border-black">5 YRS IMPRISONMENT</span>
                                </h3>
                                <p className="text-black leading-relaxed font-bold text-lg">
                                    <strong className="text-blue-700 text-xl font-black block mb-2">Publishing Obscene Material:</strong> Specifically protects against individuals who transmit, publish or cause to be published any material which is lascivious or appeals to the prurient interest in electronic form.
                                </p>
                            </div>

                            <div className="border-l-8 border-emerald-500 pl-8 bg-gray-50 p-6 border-y-4 border-r-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Section 354D (Indian Penal Code)</h3>
                                <p className="text-black leading-relaxed font-bold text-lg">
                                    <strong className="text-emerald-700 text-xl font-black block mb-2">Cyber Stalking:</strong> Prosecutes any man who monitors the use by a woman of the internet, email or any other form of electronic communication, or repeatedly contacts her despite clear indications of disinterest.
                                </p>
                            </div>

                            <div className="border-l-8 border-purple-500 pl-8 bg-gray-50 p-6 border-y-4 border-r-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Section 354C (Indian Penal Code)</h3>
                                <p className="text-black leading-relaxed font-bold text-lg">
                                    <strong className="text-purple-700 text-xl font-black block mb-2">Voyeurism:</strong> Punishes the act of capturing or disseminating an image of a woman engaging in a private act in circumstances where she would usually have an expectation of not being observed.
                                </p>
                            </div>

                            <div className="border-l-8 border-amber-500 pl-8 bg-gray-50 p-6 border-y-4 border-r-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Section 66E (IT Act)</h3>
                                <p className="text-black leading-relaxed font-bold text-lg">
                                    <strong className="text-amber-600 text-xl font-black block mb-2">Violation of Privacy:</strong> Heavily penalizes the non-consensual capturing, publishing, or transmitting of images containing private areas of any person. (Up to 3 years imprisonment).
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column - Actions & Rights */}
                <div className="space-y-12">
                    <section className="bg-yellow-300 border-8 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-3xl font-black font-cursive mb-8 flex items-center gap-3 uppercase tracking-tighter">
                            <ScrollText className="w-8 h-8 text-black" />
                            IMMUTABLE RIGHTS
                        </h2>
                        <ul className="space-y-6 text-black font-bold">
                            <li className="flex items-start gap-4 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
                                <span><strong className="text-black font-black block mb-1 uppercase text-lg">ZERO FIR:</strong> You can file a cyber complaint at ANY police station in India, regardless of where the incident occurred.</span>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
                                <span><strong className="text-black font-black block mb-1 uppercase text-lg">RIGHT TO ANONYMITY:</strong> You can request the authorities and magistrates to keep your identity strictly confidential during investigation.</span>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
                                <span><strong className="text-black font-black block mb-1 uppercase text-lg">VIRTUAL STATEMENT:</strong> Women have the right to record their statement with the police virtually or via email; physical visits are not mandatory.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-red-500 border-8 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:bg-red-600 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-20 text-black group-hover:scale-110 transition-transform duration-500">
                            <ShieldAlert className="w-40 h-40" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black font-cursive mb-2 text-white uppercase tracking-tighter">HOW TO FILE AN FIR</h2>
                            <p className="text-sm text-black mb-8 font-black uppercase tracking-widest bg-white inline-block px-3 py-1 border-2 border-black">Take immediate action.</p>
                            
                            <ul className="list-decimal pl-5 space-y-4 text-white mb-10 text-base font-bold bg-black p-6 border-4 border-white">
                                <li><strong className="text-yellow-400">DO NOT DELETE CHATS.</strong> Screen record the scrolling conversation.</li>
                                <li>Generate the <strong className="text-yellow-400">MASTER PDF REPORT</strong> from your Raksha Action Center to capture exact timestamps.</li>
                                <li>Use the portal below to officially register as a victim.</li>
                                <li>Attach the Raksha PDF directly into their evidence submission box.</li>
                            </ul>
                            
                            <a 
                                href="https://cybercrime.gov.in/" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 bg-white text-black font-black py-5 px-6 border-4 border-black uppercase tracking-widest text-lg transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] w-full text-center"
                            >
                                NATIONAL CYBER PORTAL <ExternalLink className="w-6 h-6" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            <div className="mt-16 p-8 border-8 border-black flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-[12px_12px_0px_rgba(0,0,0,1)]">
                <FileWarning className="w-16 h-16 text-black shrink-0" />
                <p className="text-lg text-black font-bold leading-relaxed uppercase tracking-widest">
                    <strong className="font-black text-2xl block mb-2">DISCLAIMER</strong> The Raksha Platform provides this centralized legal compilation for educational and empowerment purposes only. We are a technical support system, not a law firm. Always consult with a registered legal professional or directly approach your nearest Cyber Cell or Mahila Police Thana for official procedures.
                </p>
            </div>
        </div>
    );
};

export default CyberLaw;
