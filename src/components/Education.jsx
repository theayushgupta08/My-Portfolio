import { motion } from 'framer-motion';
import { styles } from "../styles";
import { education } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, staggerContainer, fadeIn } from "../utils/motion";
import { useState, useRef, useEffect } from 'react';

const EducationCard = ({ education, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      animate="show"
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient card */}
      <div className="relative bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 transition-all duration-500 group-hover:border-purple-500/40 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-600/10 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-xl"></div>
        </div>

        {/* Header section */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors duration-300">
                {education.title}
              </h3>
              <p className="text-secondary text-sm font-medium">
              <a href={education.link} target="_blank" rel="noopener noreferrer">
                {education.institution}
                <br />
                Affiliated to: <span className="text-purple-300">{education.affiliation}</span>
                </a>
              </p>
            </div>
            
            {/* Animated icon */}
            <motion.div 
              className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-0.5"
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <a href={education.link} target="_blank" rel="noopener noreferrer">
                <img 
                  src={education.icon} 
                  alt={education.institution} 
                  className="w-9 h-9 object-contain"
                />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Date badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-4">
            <span className="text-purple-300 text-xs font-medium">{education.date}</span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Academic Progress</span>
            <span className="text-purple-300 font-medium">
              {education.points[0].includes("CGPA") ? education.points[0].split(":")[1].trim() : education.points[0].split(":")[1].trim()}
            </span>
          </div>
          <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: education.points[0].includes("CGPA") ? 
                (parseFloat(education.points[0].split(":")[1].trim().split("/")[0]) / 10 * 100) + "%" :
                (parseFloat(education.points[0].split(":")[1].trim().split("%")[0]) / 100 * 100) + "%"
              }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
            />
          </div>
        </div>

        {/* Key points */}
        <div className="relative z-10">
          <h4 className="text-white text-sm font-semibold mb-3 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-2"></span>
            Key Highlights
          </h4>
          <div className="space-y-2">
            {education.points.slice(1).map((point, pointIndex) => (
              <motion.div
                key={pointIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (index * 0.1) + (pointIndex * 0.1) }}
                className="flex items-start"
              >
                <span className="text-purple-400 text-xs mt-1 mr-2">•</span>
                <p className="text-gray-300 text-xs leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hover effect overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
    </motion.div>
  );
};

const Education = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef(null);

  const filters = [
    { id: 'all', label: 'All Education' },
    { id: 'college', label: 'College' },
    { id: 'school', label: 'School' }
  ];

  const filteredEducation = education.filter(edu => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'college') {
      // College: Bachelor's degree (1st item)
      return edu.institution.toLowerCase().includes('college');
    }
    if (activeFilter === 'school') {
      // School: 12th and 10th (2nd and 3rd items)
      return edu.institution.toLowerCase().includes('school');
    }
    return false;
  });

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Academic Journey</p>
        <h2 className={styles.sectionHeadText}>Education</h2>
      </motion.div>

      {/* Filter buttons */}
      <motion.div 
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex justify-center gap-4 mt-8 mb-12"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Education cards grid */}
      <motion.div
        key={activeFilter} // Force re-render when filter changes
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        ref={containerRef}
      >
        {filteredEducation.map((edu, index) => (
          <EducationCard key={`${edu.title}-${edu.date}`} education={edu} index={index} />
        ))}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
    </>
  );
};

export default SectionWrapper(Education, 'education'); 