import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn, staggerContainer } from '../utils/motion';
import { blogger } from '../assets';
import { ExternalLink, BookOpen } from 'lucide-react';

const BlogCard = ({ title, description, date, link, index }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="group relative bg-tertiary p-6 rounded-2xl hover:bg-[#1a1440] transition-all duration-300 cursor-pointer block"
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white text-lg font-bold group-hover:text-purple-300 transition-colors duration-300">
              {title}
            </h3>
            <ExternalLink className="w-5 h-5 text-secondary group-hover:text-purple-300 transition-colors duration-300 flex-shrink-0 mt-1" />
          </div>
          <p className="text-secondary text-sm mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{date}</span>
            <span>•</span>
            <span className="text-purple-400">Read More</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
    </motion.a>
  );
};

const Blog = () => {
  // You can add more blog posts here or fetch from an API
  const blogPosts = [
    {
      title: "Innovate Insight Blog",
      description: "Explore my latest articles on technology, data science, machine learning, and software development. Sharing insights, tutorials, and industry trends.",
      date: "Ongoing",
      link: "https://innovate-insight.blogspot.com/",
    },
    {
      title: "Tech Content Creation",
      description: "Regular content creation on Instagram (@cyberayush08) covering tech trends, coding tips, and career advice for developers and data scientists.",
      date: "Since 2021",
      link: "https://www.instagram.com/cyberayush08/",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="w-full"
    >
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Writings</p>
        <h2 className={styles.sectionHeadText}>Blog & Content</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] mb-12"
      >
        I share my knowledge and insights through blog posts and social media content. 
        Check out my latest articles and tech content.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <BlogCard key={index} index={index} {...post} />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-8 text-center"
      >
        <a
          href="https://innovate-insight.blogspot.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          <img src={blogger} alt="Blog" className="w-5 h-5" />
          Visit My Blog
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default SectionWrapper(Blog, "blog");


