import { Scale, BookOpen, ShieldAlert, FileWarning, ExternalLink, ScrollText, CheckCircle2 } from 'lucide-react';

const CyberLaw = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 w-full min-h-screen bg-[#fcfcfc] text-[#1d1d1d]">
            <header className="mb-16 text-center md:text-left flex flex-col md:flex-row items-center gap-8 border-b border-gray-100 pb-16">
                <div className="p-6 bg-blue-50 rounded-3xl shrink-0">
                    <Scale className="w-16 h-16 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#1b1b25]">
                        Know your rights.
                    </h1>
                    <p className="text-gray-500 font-medium text-lg max-w-2xl leading-relaxed">
                        Understand the legal protections available under the Indian Information Technology Act, 2000 and the Indian Penal Code to fight online abuse.
                    </p>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Column - The Laws */}
                <div className="lg:col-span-2 space-y-10">
                    <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 soft-shadow border border-gray-50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 mt-2 flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                            Crucial Legal Sections
                        </h2>
                        
                        <div className="space-y-6">
                            <LawCard 
                                title="Section 67 (IT Act)"
                                badge="5 YRS IMPRISONMENT"
                                badgeColor="bg-rose-100 text-rose-700"
                                highlight="Publishing Obscene Material:"
                                text="Specifically protects against individuals who transmit, publish or cause to be published any material which is lascivious or appeals to the prurient interest in electronic form."
                            />
                            <LawCard 
                                title="Section 354D (Indian Penal Code)"
                                highlight="Cyber Stalking:"
                                text="Prosecutes any man who monitors the use by a woman of the internet, email or any other form of electronic communication, or repeatedly contacts her despite clear indications of disinterest."
                            />
                            <LawCard 
                                title="Section 354C (Indian Penal Code)"
                                highlight="Voyeurism:"
                                text="Punishes the act of capturing or disseminating an image of a woman engaging in a private act in circumstances where she would usually have an expectation of not being observed."
                            />
                            <LawCard 
                                title="Section 66E (IT Act)"
                                highlight="Violation of Privacy:"
                                text="Heavily penalizes the non-consensual capturing, publishing, or transmitting of images containing private areas of any person. (Up to 3 years imprisonment)."
                            />
                        </div>
                    </section>
                </div>

                {/* Right Column - Actions & Rights */}
                <div className="space-y-10">
                    <section className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-100">
                        <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3 text-amber-900">
                            <ScrollText className="w-6 h-6" />
                            Immutable Rights
                        </h2>
                        <ul className="space-y-4">
                            <RightItem title="ZERO FIR:" desc="File a cyber complaint at ANY police station in India, regardless of where it occurred." />
                            <RightItem title="RIGHT TO ANONYMITY:" desc="Request authorities to keep your identity strictly confidential during investigation." />
                            <RightItem title="VIRTUAL STATEMENT:" desc="Record your statement with the police virtually; physical visits are not mandatory." />
                        </ul>
                    </section>

                    <section className="bg-blue-600 rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 p-8 opacity-10 text-white group-hover:scale-110 transition-transform duration-500">
                            <ShieldAlert className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 text-white">
                            <h2 className="text-2xl font-extrabold mb-2">How to file an FIR</h2>
                            <p className="text-blue-100 mb-6 font-medium text-sm">Take immediate action.</p>
                            
                            <ul className="space-y-3 mb-8 text-sm font-medium">
                                <li className="flex gap-2"><span className="font-bold text-amber-300">1.</span> DO NOT DELETE CHATS. Screen record the scrolling conversation.</li>
                                <li className="flex gap-2"><span className="font-bold text-amber-300">2.</span> Generate the MASTER PDF REPORT from your Action Center.</li>
                                <li className="flex gap-2"><span className="font-bold text-amber-300">3.</span> Use the portal below to officially register as a victim.</li>
                                <li className="flex gap-2"><span className="font-bold text-amber-300">4.</span> Attach the Raksha PDF directly into their evidence box.</li>
                            </ul>
                            
                            <a 
                                href="https://cybercrime.gov.in/" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 bg-white text-blue-600 font-bold py-3.5 px-6 rounded-full hover:bg-gray-50 transition-all shadow-md w-full text-center"
                            >
                                National Cyber Portal <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            <div className="mt-12 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 border border-gray-200">
                <FileWarning className="w-10 h-10 text-gray-400 shrink-0 mt-1" />
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    <strong className="font-bold text-gray-700 block mb-1">Disclaimer</strong> 
                    The Raksha Platform provides this centralized legal compilation for educational and empowerment purposes only. We are a technical support system, not a law firm. Always consult with a registered legal professional or directly approach your nearest Cyber Cell or Mahila Police Thana for official procedures.
                </p>
            </div>
        </div>
    );
};

const LawCard = ({ title, badge, badgeColor, highlight, text }) => (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h3 className="text-lg font-bold mb-3 flex items-center justify-between flex-wrap gap-2">
            {title}
            {badge && <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeColor}`}>{badge}</span>}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed font-medium">
            <strong className="text-gray-900 block mb-1">{highlight}</strong> {text}
        </p>
    </div>
);

const RightItem = ({ title, desc }) => (
    <li className="flex items-start gap-3 bg-white p-4 rounded-2xl soft-shadow-sm border border-amber-50">
        <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <span className="text-sm font-medium text-amber-900"><strong className="block mb-0.5 text-amber-950">{title}</strong>{desc}</span>
    </li>
);

export default CyberLaw;
