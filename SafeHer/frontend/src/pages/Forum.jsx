import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { MessageSquarePlus, MessageCircle, Heart, UserCircle, Shield, Share2, Sparkles, TrendingUp } from 'lucide-react';

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
        <div className="max-w-5xl mx-auto px-4 py-8 w-full min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <header className="mb-10 text-center space-y-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-white rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
                <div className="inline-flex items-center justify-center p-4 bg-white border border-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] relative z-10 mb-4">
                    <MessageCircle className="w-10 h-10 text-black" />
                </div>
                <h1 className="text-5xl font-cursive font-bold text-white tracking-widest relative z-10">Survivor Feed</h1>
                <p className="text-gray-400 tracking-wide max-w-2xl mx-auto relative z-10 text-lg">
                    A completely anonymous, zero-judgment social feed. Read survival stories, share your trauma, and find strength in the community.
                </p>
                <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 px-4 py-2 mt-4 rounded-full">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Identity Strictly Protected</span>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side: Create Post */}
                <div className="lg:col-span-1 border-t md:border-t-0 md:border-r border-gray-800 md:pr-8 pt-8 md:pt-0">
                    <div className="sticky top-24">
                        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-gray-800 p-6 shadow-2xl relative overflow-hidden group rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                            
                            <h3 className="text-xl font-bold font-cursive tracking-widest mb-6 flex items-center gap-2 relative z-10">
                                <MessageSquarePlus className="w-5 h-5 text-gray-300" /> Post to Feed
                            </h3>
                            
                            <div className="space-y-5 relative z-10">
                                <input 
                                    type="text" 
                                    placeholder="Headline of your story..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-black border-b border-gray-800 text-white px-2 py-3 focus:outline-none focus:border-white transition-colors text-lg font-bold placeholder:font-normal"
                                    required 
                                />
                                <textarea 
                                    rows="5"
                                    placeholder="Share your experience here. No one will ever know who you are. Let it out..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full bg-black border border-gray-800 text-gray-300 p-4 focus:outline-none focus:border-white transition-colors resize-none rounded-lg leading-relaxed"
                                    required 
                                ></textarea>
                                
                                <div className="flex gap-2 text-xs">
                                    {['Advice', 'Rant', 'Success Story', 'Need Help'].map(tag => (
                                        <button 
                                            key={tag}
                                            type="button"
                                            onClick={() => setActiveTag(tag)}
                                            className={`px-3 py-1.5 rounded-full transition-colors border ${activeTag === tag ? 'bg-white text-black border-white font-bold' : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'}`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-white text-black font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-gray-200 disabled:opacity-50 transition-colors flex justify-center items-center gap-2 rounded-lg"
                                >
                                    {loading ? 'Posting...' : <><Sparkles className="w-4 h-4"/> Publish Anonymously</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side: Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-300">
                            <TrendingUp className="w-5 h-5" /> Recent Activity
                        </h2>
                    </div>

                    {feed.map((post) => (
                        <div key={post._id} className="bg-[#050505] border border-gray-800 p-6 lg:p-8 hover:border-gray-600 transition-all shadow-lg rounded-2xl group cursor-default">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-gray-700 to-black p-0.5 rounded-full">
                                        <UserCircle className="w-10 h-10 text-white bg-black rounded-full" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white tracking-wide">Anonymous Warrior</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className="bg-gray-900 border border-gray-700 text-gray-300 text-xs px-3 py-1 font-bold tracking-widest rounded-full shadow-inner shadow-black/50">
                                    {post.tag || 'Survival Story'}
                                </span>
                            </div>
                            
                            <h4 className="text-2xl font-bold font-cursive tracking-wide mb-4 text-gray-100 group-hover:text-white transition-colors">{post.title}</h4>
                            <p className="text-gray-400 leading-relaxed mb-8 text-base md:text-lg">{post.content}</p>
                            
                            <div className="flex items-center gap-6 border-t border-gray-900 pt-5">
                                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-full transition-all group/btn">
                                    <Heart className="w-5 h-5 group-hover/btn:fill-red-500 transition-colors" />
                                    <span className="text-sm font-bold tracking-wide">{post.upvotes || 0}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 hover:text-white hover:bg-gray-800 px-3 py-1.5 rounded-full transition-all">
                                    <Share2 className="w-5 h-5" />
                                    <span className="text-sm font-bold tracking-wide">Amplify</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Forum;
