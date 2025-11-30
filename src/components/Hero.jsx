import { motion } from 'framer-motion';
import { socialLinksicons } from '../constants';
import { fadeIn } from '../utils/motion';
// Make sure to add your profile image to the assets folder
// and uncomment the line below
import ayush from '../assets/ayush.png';

const Hero = () => {
  return (

    <section className='hero-section relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 pt-24 pb-10 md:py-20 overflow-hidden'>
      <div className='lg:ml-20 mt-10 hero-content container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10'>
        {/* Left side - Content */}
        <motion.div 
          className='text-center md:text-left order-2 md:order-1 flex-1'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='mb-8'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4'>
              Hi, I'm <span className='text-[#915eff]'>Ayush</span>
            </h1>
            <p className='text-lg sm:text-xl text-gray-300 max-w-2xl'>
              I'm a Software Development Engineer (SDE), Data Scientist and a Tech Content Creator!
            </p>
          </div>
          
          <motion.div 
            className='flex flex-wrap justify-center md:justify-start gap-4 mt-8 mb-16 md:mb-8'
            variants={fadeIn("up", "spring", 0.5, 0.75)}
          >
            {socialLinksicons.map((socialLink, index) => (
              <motion.a
                key={index}
                href={socialLink.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1d1836] hover:bg-[#915eff] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={socialLink.icon} 
                  alt={socialLink.alt} 
                  className="w-5 h-5" 
                />
                <span className="text-white font-medium hidden sm:inline-block">
                  {socialLink.alt}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div 
          className='relative order-1 md:order-2 mb-10 md:mb-0 flex-1 flex justify-center'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96'>
            {/* Glow effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-[#915eff] to-[#ff00ff] rounded-full opacity-20 blur-3xl animate-pulse'></div>
            
            {/* Profile image */}
            <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-[#915eff] shadow-lg shadow-[#915eff]/30'>
              <img
                src={ayush}
                alt="Ayush"
                className='w-full h-full object-cover'
              />
            </div>
            
            {/* Animated circles */}
            <div className='absolute -top-4 -left-4 w-full h-full rounded-full border-2 border-[#915eff]/30 animate-ping-slow'></div>
            <div className='absolute -top-8 -left-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] rounded-full border-2 border-[#ff00ff]/30 animate-ping-slower'></div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator - Only show on larger screens */}
      <div className='hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2'>
        <a 
          href="/about"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('about');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          <div className='w-9 h-14 rounded-3xl border-2 border-[#915eff] flex justify-center items-start p-2'>
            <motion.div 
              className='w-2 h-3 rounded-full bg-[#915eff]'
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero;