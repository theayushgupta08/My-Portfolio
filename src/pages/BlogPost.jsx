import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { getBlogPostBySlug } from '../services/blogService';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getBlogPostBySlug(slug);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Blog post not found.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const readingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center">
        <div className="text-red-400 text-xl mb-4">{error || 'Blog post not found'}</div>
        <Link
          to="/blogs"
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className={`${styles.paddingX} max-w-4xl mx-auto`}>
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/blogs')}
              className="flex items-center gap-2 text-secondary hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blogs</span>
            </button>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-tertiary rounded-2xl p-8 md:p-12"
          >
            {/* Category and Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.category && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{readingTime(post.content)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-white text-4xl md:text-5xl font-black mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-secondary text-xl mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Share Button */}
            <div className="mb-8 pb-8 border-b border-purple-500/10">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors duration-300"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </button>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white
                prose-p:text-secondary prose-p:leading-relaxed
                prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
                prose-strong:text-white
                prose-code:text-purple-300 prose-code:bg-purple-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-tertiary prose-pre:border prose-pre:border-purple-500/20
                prose-img:rounded-lg prose-img:my-8
                prose-ul:text-secondary prose-ol:text-secondary
                prose-li:text-secondary
                prose-blockquote:text-gray-400 prose-blockquote:border-purple-500/30"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-tertiary text-secondary border border-purple-500/20"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;

