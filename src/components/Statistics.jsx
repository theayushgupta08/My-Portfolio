import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn, staggerContainer } from '../utils/motion';
import { useState, useEffect } from 'react';
import { github, leetcode, linkedin } from '../assets';

const StatCard = ({ icon, label, value, subtext, link, index }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="group relative bg-tertiary p-6 rounded-2xl hover:bg-[#1a1440] transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <img src={icon} alt={label} className="w-8 h-8 object-contain" />
        </div>
        <h3 className="text-white text-2xl font-bold mb-2">{value}</h3>
        <p className="text-secondary text-sm font-medium mb-1">{label}</p>
        {subtext && <p className="text-gray-500 text-xs">{subtext}</p>}
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
    </motion.a>
  );
};

const Statistics = () => {
  const [githubStats, setGithubStats] = useState({
    repos: 'Loading...',
    contributions: 'Loading...',
    followers: 'Loading...'
  });

  useEffect(() => {
    // Fetch GitHub stats (using GitHub API)
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/theayushgupta08');
        if (response.ok) {
          const data = await response.json();
          setGithubStats({
            repos: data.public_repos || '20+',
            contributions: '500+', // Approximate, can be enhanced with GitHub API
            followers: data.followers || '50+'
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setGithubStats({
          repos: '20+',
          contributions: '500+',
          followers: '50+'
        });
      }
    };

    fetchGitHubStats();
  }, []);

  const stats = [
    {
      icon: github,
      label: 'GitHub Repositories',
      value: githubStats.repos,
      subtext: 'Open Source Projects',
      link: 'https://github.com/theayushgupta08',
    },
    {
      icon: github,
      label: 'GitHub Contributions',
      value: githubStats.contributions,
      subtext: 'This Year',
      link: 'https://github.com/theayushgupta08',
    },
    {
      icon: github,
      label: 'GitHub Followers',
      value: githubStats.followers,
      subtext: 'Growing Community',
      link: 'https://github.com/theayushgupta08',
    },
    {
      icon: leetcode,
      label: 'LeetCode Problems',
      value: '100+',
      subtext: 'Solved & Counting',
      link: 'https://leetcode.com/u/theayushgupta08/',
    },
    {
      icon: linkedin,
      label: 'LinkedIn Connections',
      value: '500+',
      subtext: 'Professional Network',
      link: 'https://linkedin.com/in/theayushgupta08',
    },
    {
      icon: github,
      label: 'Projects Completed',
      value: '15+',
      subtext: 'Real-World Solutions',
      link: 'https://github.com/theayushgupta08',
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
        <p className={styles.sectionSubText}>My Achievements</p>
        <h2 className={styles.sectionHeadText}>Statistics</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] mb-12"
      >
        Here are some metrics that showcase my journey in software development, 
        problem-solving, and community engagement.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} index={index} {...stat} />
        ))}
      </div>
    </motion.div>
  );
};

export default SectionWrapper(Statistics, "statistics");


