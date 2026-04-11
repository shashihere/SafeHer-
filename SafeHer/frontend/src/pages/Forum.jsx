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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full min-h-screen bg-white text-black selection:bg-black selection:text-white">
            {/* Soft Ambient Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-screen h-[500px] bg-gradient-to-b from-gray-900/50 via-black/10 to-transparent pointer-events-none -z-10"></div>

            <header className="mb-16 text-center space-y-6 relative">
                <div className="inline-flex items-center justify-center p-5 bg-black/5 border border-black/10 backdrop-blur-md rounded-full shadow-[0_0_40px_rgba(255,255,255,0.05)] relative z-10 mb-2">
                    <MessageCircle className="w-8 h-8 text-black" />
                </div>
                <h1 className="text-5xl md:text-6xl font-cursive font-bold text-black tracking-widest relative z-10 drop-shadow-lg">
                    The Safe Haven
                </h1>
                <p className="text-gray-600 tracking-wide max-w-2xl mx-auto relative z-10 text-lg md:text-xl font-light">
                    A completely anonymous, zero-judgment sanctuary. Share your trauma, heal together, and find strength in the community.
                </p>
                <div className="inline-flex items-center gap-2 bg-black/5 border border-black/10 px-5 py-2 mt-6 rounded-full backdrop-blur-sm">
                    <Shield className="w-4 h-4 text-gray-300" />
                    <span className="text-sm font-medium tracking-widest text-gray-300">Identity Strictly Protected</span>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left Side: Create Post (Wider and Softer) */}
                <div className="lg:col-span-5">
                    <div className="sticky top-28">
                        <form onSubmit={handleSubmit} className="bg-black/[0.03] backdrop-blur-xl border border-black/10 p-8 shadow-2xl relative overflow-hidden group rounded-3xl transition-all hover:bg-black/[0.04]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-[80px] opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            
                            <h3 className="text-2xl font-cursive tracking-widest mb-8 flex items-center gap-3 relative z-10 text-black">
                                <MessageSquarePlus className="w-6 h-6 text-gray-600" /> Share Your Truth
                            </h3>
                            
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <label className="text-xs text-gray-700 uppercase tracking-widest mb-2 block font-medium">Story Headline</label>
                                    <input 
                                        type="text" 
                                        placeholder="E.g., I finally spoke up..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-white/50 border border-black/10 text-black px-5 py-4 focus:outline-none focus:border-black/40 transition-colors text-lg font-medium rounded-xl placeholder:text-gray-600"
                                        required 
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-700 uppercase tracking-widest mb-2 block font-medium">Your Experience</label>
                                    <textarea 
                                        rows="6"
                                        placeholder="This is a safe space. No one will ever know who you are. Let it all out..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full bg-white/50 border border-black/10 text-gray-300 px-5 py-4 focus:outline-none focus:border-black/40 transition-colors resize-none rounded-xl leading-relaxed placeholder:text-gray-600"
                                        required 
                                    ></textarea>
                                </div>
                                
                                <div className="pt-2">
                                    <label className="text-xs text-gray-700 uppercase tracking-widest mb-3 block font-medium">How are you feeling?</label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {['Seeking Advice', 'Just Venting', 'Success Story', 'Need Help'].map(tag => (
                                            <button 
                                                key={tag}
                                                type="button"
                                                onClick={() => setActiveTag(tag)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTag === tag ? 'bg-black text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/50 text-gray-600 border border-black/10 hover:border-black/30 hover:text-gray-200'}`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-black text-white font-bold uppercase tracking-widest px-8 py-4 hover:bg-gray-200 disabled:opacity-50 transition-all flex justify-center items-center gap-2 rounded-xl mt-6 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                >
                                    {loading ? 'Posting securely...' : <><Sparkles className="w-5 h-5"/> Publish Anonymously</>}
                                </button>
                                
                                <div className="flex items-center gap-2 justify-center mt-4">
                                    <Shield className="w-3.5 h-3.5 text-gray-700" />
                                    <p className="text-xs text-gray-700 font-medium">End-to-end stripped of identity markers.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side: Feed (More spacious and elegant) */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center gap-3 border-b border-black/10 pb-4 mb-8">
                        <Wind className="w-5 h-5 text-gray-600" />
                        <h2 className="text-xl font-medium tracking-wider text-gray-300">
                            Stories of Resilience
                        </h2>
                    </div>

                    {feed.map((post) => (
                        <div key={post._id} className="bg-black/[0.02] border border-black/10 p-8 hover:bg-black/[0.04] transition-all shadow-xl shadow-black/50 rounded-3xl group cursor-default backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black border border-black/10 rounded-full flex items-center justify-center shadow-inner">
                                        <UserCircle className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-200 tracking-wide">Anonymous Survivor</p>
                                        <p className="text-xs text-gray-700 uppercase tracking-widest mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className="bg-white/50 border border-black/10 text-gray-300 text-xs px-4 py-1.5 font-medium tracking-widest rounded-full">
                                    {post.tag || 'Survival Story'}
                                </span>
                            </div>
                            
                            <h4 className="text-3xl font-cursive font-bold tracking-wide mb-5 text-black drop-shadow-md">{post.title}</h4>
                            <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light">{post.content}</p>
                            
                            <div className="flex items-center gap-8 border-t border-black/10 pt-6">
                                <button className="flex items-center gap-2.5 text-gray-700 hover:text-black transition-all group/btn">
                                    <div className="p-2 rounded-full group-hover/btn:bg-black/10 transition-colors">
                                        <Heart className="w-5 h-5 group-hover/btn:fill-white transition-colors" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">{post.upvotes || 0} Supported</span>
                                </button>
                                <button className="flex items-center gap-2.5 text-gray-700 hover:text-black transition-all group/btn">
                                    <div className="p-2 rounded-full group-hover/btn:bg-black/10 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">Amplify</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="py-12 flex flex-col items-center justify-center text-gray-600 space-y-4 border-t border-black/5">
                        <Feather className="w-8 h-8 opacity-50" />
                        <p className="text-sm tracking-widest uppercase">End of stories</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forum;
