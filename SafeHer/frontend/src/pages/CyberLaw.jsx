import { Scale, BookOpen, ShieldAlert, FileWarning, ExternalLink } from 'lucide-react';

const CyberLaw = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 w-full min-h-screen bg-black text-white">
            <header className="mb-12 border-b border-gray-800 pb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-white border border-gray-200">
                        <Scale className="w-8 h-8 text-black" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-cursive font-bold text-white tracking-widest">Cyber Law & Rights</h1>
                        <p className="text-gray-400 tracking-wide mt-2">Know your legal rights under the Indian Information Technology Act, 2000.</p>
                    </div>
                </div>
            </header>

            <div className="space-y-8">
                <section className="bg-gray-900 border border-gray-800 p-8">
                    <h2 className="text-2xl font-bold font-cursive mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-white" />
                        Relevant Legal Sections
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="border-l-4 border-white pl-6">
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-2">Section 67 & 67A (IT Act)</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Publishing or transmitting obscene material in electronic form. If someone sends you non-consensual explicit messages or images, they are liable for imprisonment up to 5 years and a heavy fine.
                            </p>
                        </div>

                        <div className="border-l-4 border-gray-600 pl-6">
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-gray-300">Section 354D (Indian Penal Code)</h3>
                            <p className="text-gray-400 leading-relaxed">
                                **Cyber Stalking:** If a man follows a woman and contacts her repeatedly despite clear disinterest, or monitors her digital activity (emails, social media, IP), he can be imprisoned for up to 3 years.
                            </p>
                        </div>

                        <div className="border-l-4 border-gray-800 pl-6">
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-gray-500">Section 66E (IT Act)</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Violation of privacy. Capturing, publishing, or transmitting images of a private area of any person without consent. Carries a penalty of up to 3 years imprisonment.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-black border border-red-900/30 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <ShieldAlert className="w-48 h-48" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold font-cursive mb-4 text-red-500">How to file an official FIR</h2>
                        <ul className="list-decimal pl-5 space-y-4 text-gray-300 mb-8 max-w-2xl">
                            <li>Keep evidence secure. Do not delete the abusive texts, emails, or fake profiles.</li>
                            <li>Go to the <span className="font-bold text-white">SafeHer Evidence Vault</span> and download the formalized PDF report of your incident.</li>
                            <li>Click the link below to visit the official Indian Government Cyber Crime Portal.</li>
                            <li>Register as a victim, file a complaint anonymously or with your details, and attach the SafeHer PDF as evidence.</li>
                        </ul>
                        
                        <a 
                            href="https://cybercrime.gov.in/" 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 uppercase tracking-widest transition-colors"
                        >
                            Report to Police Portal <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>
                </section>
                
                <div className="mt-8 p-4 border border-gray-800 flex items-start gap-4 bg-gray-900/50">
                    <FileWarning className="w-6 h-6 text-gray-400 shrink-0" />
                    <p className="text-sm text-gray-400 italic">
                        Disclaimer: SafeHer provides this information for educational purposes only. Always consult with a legal professional or directly approach your nearest Cyber Cell for official legal advice.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CyberLaw;
