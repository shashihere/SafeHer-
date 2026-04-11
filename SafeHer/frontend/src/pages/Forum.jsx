import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { MessageSquarePlus, MessageCircle, Heart, UserCircle, Shield, Share2, Sparkles, Wind, Feather } from 'lucide-react';

const DUMMY_STORIES = [
    {
        _id: 'dummy1',
        title: 'I finally stood up to my cyberstalker',
        content: 'For 6 months, someone from my college was making fake instagram accounts to message me every night. I was terrified. I used SafeHer to analyze the threats and took the Evidence Vault PDF directly to the cyber cell. They tracked his IP within 3 days. Stay strong girls, do not delete the evidence!',
        tag: 'Success Story',
        upvotes: 842,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        _id: 'dummy2',
        title: 'How to handle non-consensual photo threats',
        content: 'My ex threatened to leak private photos if I didn\'t talk to him. I was terrified and couldn\'t tell my parents. I read the Cyber Laws section here. Knowing that Section 66E is a non-bailable offense gave me the courage to report him anonymously. Please read your rights, knowledge is power!',
        tag: 'Legal Advice',
        upvotes: 1250,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
        _id: 'dummy3',
        title: 'Don\'t let them silence you online',
        content: 'I received massive hate and misogynistic abuse on Twitter for a simple opinion. It broke my mental health. But seeing other women here fight back gave me strength. Block, Report, and Document using the Vault. Your voice matters and you are not alone.',
        tag: 'Mental Health',
        upvotes: 564,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
    }
];

const Forum = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTag, setActiveTag] = useState('');

    const fetchPosts = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/forum`, config);
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/forum`, {
                title, content, tag: activeTag || 'Survival Story'
            }, config);
            setTitle('');
            setContent('');
            setActiveTag('');
            fetchPosts();
        } catch (error) {
            console.error("Failed to post:", error);
        } finally {
            setLoading(false);
        }
    };

    const feed = [...posts, ...DUMMY_STORIES];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full min-h-screen text-slate-800 relative bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50">
            {/* Soft Ambient Element */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/40 blur-[100px] rounded-full pointer-events-none -z-10"></div>
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-pink-200/30 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <header className="mb-16 text-center space-y-5 relative">
                <div className="inline-flex items-center justify-center p-5 bg-white shadow-sm border border-pink-100 rounded-full relative z-10 mb-2">
                    <MessageCircle className="w-8 h-8 text-pink-500" />
                </div>
                <h1 className="text-5xl md:text-6xl font-playfair font-bold text-slate-800 tracking-wide relative z-10 drop-shadow-sm">
                    The Safe Haven
                </h1>
                <p className="text-slate-500 tracking-wide max-w-2xl mx-auto relative z-10 text-lg font-medium leading-relaxed">
                    A completely anonymous, zero-judgment sanctuary. Share your trauma, heal together, and find strength in the community. You are not alone.
                </p>
                <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 px-5 py-2 mt-4 rounded-full shadow-sm text-purple-700">
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-bold tracking-widest">Identity Strictly Protected</span>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left Side: Create Post */}
                <div className="lg:col-span-4 lg:col-start-2">
                    <div className="sticky top-28">
                        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl border border-purple-100 p-8 shadow-[0_8px_30px_rgba(167,139,250,0.08)] relative overflow-hidden group rounded-3xl transition-all">
                            <h3 className="text-2xl font-playfair tracking-wide mb-8 flex items-center gap-3 relative z-10 text-purple-900 font-bold">
                                <MessageSquarePlus className="w-6 h-6 text-purple-400" /> Share Your Truth
                            </h3>
                            
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <label className="text-xs text-purple-500 uppercase tracking-widest mb-2 block font-bold">Story Headline</label>
                                    <input 
                                        type="text" 
                                        placeholder="E.g., I finally spoke up..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-purple-50/50 border border-purple-100 text-slate-800 px-5 py-4 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 transition-all text-lg font-medium rounded-2xl placeholder:text-slate-400"
                                        required 
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-purple-500 uppercase tracking-widest mb-2 block font-bold">Your Experience</label>
                                    <textarea 
                                        rows="6"
                                        placeholder="This is a safe space. No one will ever know who you are. Let it all out..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full bg-purple-50/50 border border-purple-100 text-slate-700 px-5 py-4 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 transition-all resize-none rounded-2xl leading-relaxed placeholder:text-slate-400"
                                        required 
                                    ></textarea>
                                </div>
                                
                                <div className="pt-2">
                                    <label className="text-xs text-purple-500 uppercase tracking-widest mb-3 block font-bold">How are you feeling?</label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {['Seeking Advice', 'Just Venting', 'Success Story', 'Need Help'].map(tag => (
                                            <button 
                                                key={tag}
                                                type="button"
                                                onClick={() => setActiveTag(tag)}
                                                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm ${activeTag === tag ? 'bg-purple-500 text-white shadow-purple-200 border-transparent' : 'bg-white text-slate-500 border border-purple-100 hover:border-purple-300 hover:text-purple-700'}`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold uppercase tracking-widest px-8 py-4 hover:shadow-[0_8px_20px_rgba(244,114,182,0.3)] disabled:opacity-50 transition-all flex justify-center items-center gap-2 rounded-full mt-6 hover:-translate-y-0.5"
                                >
                                    {loading ? 'Posting securely...' : <><Sparkles className="w-5 h-5"/> Publish Anonymously</>}
                                </button>
                                
                                <div className="flex items-center gap-2 justify-center mt-5">
                                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                                    <p className="text-xs text-slate-500 font-medium tracking-wide">Identity markers removed.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side: Feed */}
                <div className="lg:col-span-6 space-y-8">
                    <div className="flex items-center gap-3 border-b border-purple-100 pb-4 mb-8">
                        <Wind className="w-5 h-5 text-purple-400" />
                        <h2 className="text-lg font-bold tracking-widest uppercase text-purple-900">
                            Stories of Resilience
                        </h2>
                    </div>

                    {feed.map((post) => (
                        <div key={post._id} className="bg-white/90 border border-purple-50 p-8 hover:border-purple-100 transition-all shadow-[0_8px_30px_rgba(167,139,250,0.05)] hover:shadow-[0_15px_40px_rgba(167,139,250,0.1)] rounded-3xl group cursor-default backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-50 border border-pink-100 rounded-full flex items-center justify-center shadow-inner">
                                        <UserCircle className="w-8 h-8 text-pink-300" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 tracking-wide">Anonymous Survivor</p>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5 font-medium">{new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className="bg-purple-50 border border-purple-100 text-purple-600 text-xs px-4 py-1.5 font-bold tracking-widest rounded-full uppercase shadow-sm">
                                    {post.tag || 'Survival Story'}
                                </span>
                            </div>
                            
                            <h4 className="text-2xl font-playfair font-bold tracking-wide mb-4 text-purple-900">{post.title}</h4>
                            <p className="text-slate-600 leading-relaxed mb-8 text-base md:text-lg font-medium">{post.content}</p>
                            
                            <div className="flex items-center gap-8 border-t border-purple-50 pt-5 mt-4">
                                <button className="flex items-center gap-2.5 text-slate-400 hover:text-pink-500 transition-all group/btn">
                                    <div className="p-2.5 rounded-full bg-slate-50 group-hover/btn:bg-pink-50 transition-colors">
                                        <Heart className="w-5 h-5 group-hover/btn:fill-pink-200 transition-colors" />
                                    </div>
                                    <span className="text-sm font-bold tracking-wider">{post.upvotes || 0} Supported</span>
                                </button>
                                <button className="flex items-center gap-2.5 text-slate-400 hover:text-purple-600 transition-all group/btn">
                                    <div className="p-2.5 rounded-full bg-slate-50 group-hover/btn:bg-purple-50 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold tracking-wider">Amplify</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="py-12 flex flex-col items-center justify-center text-purple-300 space-y-4 border-t border-purple-50 mt-12">
                        <Feather className="w-8 h-8 opacity-70 text-purple-400" />
                        <p className="text-xs font-bold tracking-widest uppercase text-slate-400">End of stories</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forum;
