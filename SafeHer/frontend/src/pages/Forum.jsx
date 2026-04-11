import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { MessageSquarePlus, MessageCircle, Heart, UserCircle, Shield } from 'lucide-react';

const Forum = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

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
                title, content, tag: 'Survivor Story'
            }, config);
            setTitle('');
            setContent('');
            fetchPosts();
        } catch (error) {
            console.error("Failed to post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 w-full min-h-screen bg-black text-white">
            <header className="mb-12 border-b border-gray-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-white border border-gray-200">
                        <MessageCircle className="w-8 h-8 text-black" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-cursive font-bold text-white tracking-widest">Anonymous Support Forum</h1>
                        <p className="text-gray-400 tracking-wide mt-2">A safe space to share your stories, entirely anonymously.</p>
                    </div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-bold tracking-widest uppercase text-gray-400">100% Identity Protected</span>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="bg-black border border-gray-800 p-6 mb-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <h3 className="text-xl font-bold font-cursive tracking-widest mb-6 flex items-center gap-2 relative z-10">
                    <MessageSquarePlus className="w-5 h-5" /> Share Your Experience
                </h3>
                
                <div className="space-y-4 relative z-10">
                    <input 
                        type="text" 
                        placeholder="Give your story a title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                        required 
                    />
                    <textarea 
                        rows="4"
                        placeholder="Write your experience here. No one will know who you are. This is a safe space..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                        required 
                    ></textarea>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-white text-black font-bold uppercase tracking-widest px-8 py-3 hover:bg-gray-200 disabled:opacity-50 transition-colors border-2 border-white"
                    >
                        {loading ? 'Posting...' : 'Post Anonymously'}
                    </button>
                    <p className="text-xs text-gray-500 italic mt-2">* Your name and email are stripped from all forum submissions.</p>
                </div>
            </form>

            <div className="space-y-6">
                {posts.length === 0 ? (
                     <div className="text-center py-12 border border-gray-800">
                        <p className="text-gray-500 font-cursive text-xl">No stories shared yet. Be the first to speak up.</p>
                     </div>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="bg-black border border-gray-800 p-6 hover:border-gray-600 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <UserCircle className="w-8 h-8 text-gray-600" />
                                    <div>
                                        <p className="font-bold text-gray-300">Anonymous Survivor</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">{new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className="bg-gray-900 text-gray-400 text-xs px-3 py-1 font-bold tracking-widest">{post.tag}</span>
                            </div>
                            
                            <h4 className="text-xl font-bold font-cursive tracking-wide mb-3">{post.title}</h4>
                            <p className="text-gray-400 leading-relaxed mb-6">{post.content}</p>
                            
                            <div className="flex items-center gap-2 border-t border-gray-800 pt-4">
                                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                                    <Heart className="w-5 h-5" />
                                    <span className="text-sm font-bold">{post.upvotes || 0} Support</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Forum;
