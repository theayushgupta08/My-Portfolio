import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn, staggerContainer } from '../utils/motion';
import { BookOpen, Calendar, ArrowRight, Clock } from 'lucide-react';
import { getBlogPosts } from '../services/blogService';

const BlogCard = ({ post, index }) => {
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

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="group"
    >
      <Link
        to={`/blogs/${post.slug}`}
        className="block bg-tertiary p-6 rounded-2xl hover:bg-[#1a1440] transition-all duration-300 cursor-pointer h-full"
      >
        <div className="flex flex-col h-full">
          {post.featuredImage && (
            <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-3">
            {post.category && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                {post.category}
              </span>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{readingTime(post.content)}</span>
            </div>
          </div>

          <h3 className="text-white text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-secondary text-sm mb-4 line-clamp-3 flex-grow">
            {post.excerpt || post.content.substring(0, 150) + '...'}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-purple-500/10">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all duration-300">
              <span className="text-sm font-medium">Read More</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = ['all', ...new Set(posts.map(post => post.category).filter(Boolean))];
  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full"
        >
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>My Writings</p>
            <h2 className={styles.sectionHeadText}>Blog Articles</h2>
          </motion.div>

          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] mb-8"
          >
            Explore my latest articles on technology, software development, data science, and more.
          </motion.p>

          {/* Category Filter */}
          {categories.length > 1 && (
            <motion.div
              variants={fadeIn("up", "spring", 0.2, 0.75)}
              className="flex flex-wrap gap-2 mb-8"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                    filter === category
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                      : 'bg-tertiary text-secondary hover:text-white hover:bg-[#1a1440]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              variants={staggerContainer()}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={fadeIn("up", "spring", 0.3, 0.75)}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-secondary text-lg">No blog posts found.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(BlogsList, "blogs");

