import { Tilt } from 'react-tilt';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { projects } from '../constants';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';


const ProjectCard = ({ index, name, description, tags, image, source_code_link, demo_link }) => {
  return (
    <motion.div
      // With this variants the image card will come up one by one because each have diffrent index. 
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 10,
          scale: 1,
          speed: 450,
          perspective: 1000,
        }}
        className="bg-tertiary p-5 rounded-2xl w-[320px] h-[500px] flex flex-col transition-all duration-300 hover:-translate-y-1"
      >
        <div className='relative w-full h-48 flex-shrink-0 mb-4'>
          <img src={image} alt={name} className='w-full h-full object-cover rounded-2xl ' />
          <div className='absolute inset-0 flex justify-end gap-2 m-3 card-img_hover'>
            {demo_link && (
              <div 
                onClick={() => window.open(demo_link, "_blank")}
                className='black-gradient w-10 h-10 rounded-full cursor-pointer flex justify-center items-center hover:bg-purple-500 transition-colors'
                title="Live Demo"
              >
                <ExternalLink className='w-5 h-5 text-white' />
              </div>
            )}
            <div 
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full cursor-pointer flex justify-center items-center hover:bg-purple-500 transition-colors'
              title="Source Code"
            >
              <img src={github} alt="github" className='w-5 h-5 object-contain' />
            </div>
          </div>
        </div>
        <div className='mt-2 flex-1 flex flex-col'>
          <h3 className='text-white font-bold text-[20px] mb-2 line-clamp-2'>{name}</h3>
          <p className="text-sm text-gray-300 flex-1 line-clamp-3">{description}</p>
        <div className='flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-700'>
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}

          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

const Works = () => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCards, setVisibleCards] = useState(1);
  const cardRef = useRef(null);

  // Calculate number of visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleCards(3); // xl
      else if (width >= 1024) setVisibleCards(3); // lg
      else if (width >= 768) setVisibleCards(2); // md
      else setVisibleCards(1); // sm and below
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Check scroll position and update button states
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    return () => container.removeEventListener('scroll', checkScroll);
  }, [visibleCards]);

  const scroll = (direction) => {
    if (!containerRef.current || !cardRef.current) return;
    
    const container = containerRef.current;
    const cardWidth = cardRef.current.offsetWidth + 24; // width + gap
    const scrollAmount = cardWidth * (direction === 'left' ? -visibleCards : visibleCards);
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };


  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className='w-full relative'
    >
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'>
          Following projects showcases my skills and experience through real-world examples of my work. 
          Each project is briefly described with links to code repositories. It reflects my ability to 
          solve complex problems, work with different technologies, and manage projects effectively.
        </motion.p>
      </div>

      <div className='relative w-full mt-20'>
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1a1440]/80 hover:bg-[#2a0e61] flex items-center justify-center shadow-lg transition-all duration-300 ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label='Previous projects'
          disabled={!canScrollLeft}
        >
          <ChevronLeft className='w-5 h-5 md:w-6 md:h-6 text-white' />
        </button>
        
        <div 
          ref={containerRef}
          className='flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory'
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div className='flex gap-6'>
            {projects.map((project, index) => (
              <div 
                key={`project-${index}`}
                ref={index === 0 ? cardRef : null}
                className='flex-shrink-0 snap-start'
              >
                <ProjectCard
                  index={index}
                  name={project.name}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  source_code_link={project.source_code_link}
                  demo_link={project.demo_link}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1a1440]/80 hover:bg-[#2a0e61] flex items-center justify-center shadow-lg transition-all duration-300 ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label='Next projects'
          disabled={!canScrollRight}
        >
          <ChevronRight className='w-5 h-5 md:w-6 md:h-6 text-white' />
        </button>
      </div>
    </motion.div>
  )
}

export default SectionWrapper(Works, "projects");