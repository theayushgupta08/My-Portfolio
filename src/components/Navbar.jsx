import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { ChevronDown, Download, User, Briefcase, FolderKanban, Mail, GraduationCap, Award, Trophy, BarChart3, BookOpen, MoreVertical, Handshake } from 'lucide-react';
import HireMe from './HireMe';



// Primary navigation items (always visible)
const primaryNavLinks = navLinks.filter(link => 
  ['about', 'work', 'projects', 'contact'].includes(link.id)
);

// Secondary navigation items (in dropdown)
const secondaryNavLinks = navLinks.filter(link => 
  !link.download && !['about', 'work', 'projects', 'contact'].includes(link.id)
);

// Icon mapping for nav items
const navIcons = {
  about: User,
  work: Briefcase,
  projects: FolderKanban,
  contact: Mail,
  education: GraduationCap,
  certificates: Award,
  awards: Trophy,
  statistics: BarChart3,
  blog: BookOpen,
};

const Navbar = () => {
  const [Active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showHireMe, setShowHireMe] = useState(false);
  const moreMenuRef = useRef(null);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
      setShowMoreMenu(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreMenu]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .filter(link => !link.download)
        .map(link => ({
          id: link.id,
          element: document.getElementById(link.id)
        }))
        .filter(section => section.element);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element.offsetTop <= scrollPosition) {
          setActive(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 bg-primary/80 backdrop-blur-md border-b border-purple-500/10`} role="navigation" aria-label="Main navigation">
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link 
          to="/" 
          className='flex items-center gap-3 group' 
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
          aria-label="Home - Ayush Gupta Portfolio"
        >
          <div className='relative'>
            <img className='w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110' src={logo} alt='Ayush Gupta Logo' />
            <div className='absolute inset-0 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>
          <p className='text-white font-bold cursor-pointer text-[18px] transition-colors duration-300 group-hover:text-purple-300'>Ayush Gupta</p>
        </Link>
        
        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-2'>
          <ul className='list-none flex flex-row gap-1' role="menubar">
            {primaryNavLinks.map((link) => {
              const Icon = navIcons[link.id];
              return (
                <li key={link.id} role="none">
                  <a 
                    href={`/${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-label={`Navigate to ${link.title} section`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      Active === link.id 
                        ? 'text-white bg-purple-500/20 shadow-lg shadow-purple-500/10' 
                        : 'text-secondary hover:text-white hover:bg-purple-500/10'
                    }`}
                  >
                    {Icon && <Icon className='w-4 h-4' />}
                    <span>{link.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* More Dropdown */}
          <div className='relative' ref={moreMenuRef}>
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                showMoreMenu || secondaryNavLinks.some(link => Active === link.id)
                  ? 'text-white bg-purple-500/20 shadow-lg shadow-purple-500/10' 
                  : 'text-secondary hover:text-white hover:bg-purple-500/10'
              }`}
              aria-label="More menu"
              aria-expanded={showMoreMenu}
            >
              <MoreVertical className='w-4 h-4' />
              <span>More</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showMoreMenu ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showMoreMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-full right-0 mt-2 w-48 bg-tertiary/95 backdrop-blur-md rounded-xl shadow-2xl border border-purple-500/20 overflow-hidden z-50'
                >
                  <ul className='py-2'>
                    {secondaryNavLinks.map((link, index) => {
                      const Icon = navIcons[link.id];
                      return (
                        <motion.li
                          key={link.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <a
                            href={`/${link.id}`}
                            onClick={(e) => handleNavClick(e, link.id)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                              Active === link.id
                                ? 'text-white bg-purple-500/20'
                                : 'text-secondary hover:text-white hover:bg-purple-500/10'
                            }`}
                          >
                            {Icon && <Icon className='w-4 h-4' />}
                            <span>{link.title}</span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hire Me Button */}
          <button
            onClick={() => setShowHireMe(true)}
            className='flex items-center gap-2 px-5 py-2.5 ml-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105'
            aria-label="Hire Me"
          >
            <Handshake className='w-4 h-4' />
            <span>Hire Me</span>
          </button>

          {/* Resume Button */}
          <a
            href={navLinks.find(l => l.download)?.url}
            download="Ayush_Gupta.pdf"
            className='flex items-center gap-2 px-5 py-2.5 ml-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105'
            aria-label="Download Resume"
          >
            <Download className='w-4 h-4' />
            <span>Resume</span>
          </a>
        </div>
        {/* Mobile Navigation */}
        <div className='lg:hidden flex flex-1 justify-end items-center gap-2'>
          {/* Mobile Hire Me Button */}
          <button
            onClick={() => {
              setShowHireMe(true);
              setToggle(false);
            }}
            className='flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-semibold'
            aria-label="Hire Me"
          >
            <Handshake className='w-3.5 h-3.5' />
            <span className='hidden sm:inline'>Hire</span>
          </button>

          {/* Mobile Resume Button */}
          <a
            href={navLinks.find(l => l.download)?.url}
            download="Ayush_Gupta.pdf"
            className='flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-semibold'
            aria-label="Download Resume"
          >
            <Download className='w-3.5 h-3.5' />
            <span className='hidden sm:inline'>Resume</span>
          </a>

          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls="mobile-menu"
            onClick={() => setToggle(!toggle)}
            className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-2 hover:bg-purple-500/10 transition-colors"
          >
            <img src={toggle ? close : menu} alt={toggle ? "Close menu" : "Open menu"} className='w-6 h-6 object-contain' />
          </button>
          
          <div 
            id="mobile-menu"
            className={`${!toggle ? 'hidden' : 'flex'} flex-col p-6 bg-tertiary/95 backdrop-blur-md absolute top-20 right-4 w-64 z-10 rounded-xl shadow-2xl border border-purple-500/20`}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <ul className='list-none flex flex-col gap-1'>
              {primaryNavLinks.map((link) => {
                const Icon = navIcons[link.id];
                return (
                  <li key={link.id} role="menuitem">
                    <a
                      href={`/${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(e, link.id);
                        setToggle(!toggle);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        Active === link.id
                          ? 'text-white bg-purple-500/20'
                          : 'text-secondary hover:text-white hover:bg-purple-500/10'
                      }`}
                    >
                      {Icon && <Icon className='w-4 h-4' />}
                      <span>{link.title}</span>
                    </a>
                  </li>
                );
              })}
              
              <li className='border-t border-purple-500/20 my-2'></li>
              
              {secondaryNavLinks.map((link) => {
                const Icon = navIcons[link.id];
                return (
                  <li key={link.id} role="menuitem">
                    <a
                      href={`/${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(e, link.id);
                        setToggle(!toggle);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        Active === link.id
                          ? 'text-white bg-purple-500/20'
                          : 'text-secondary hover:text-white hover:bg-purple-500/10'
                      }`}
                    >
                      {Icon && <Icon className='w-4 h-4' />}
                      <span>{link.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Hire Me Modal */}
      <HireMe isOpen={showHireMe} onClose={() => setShowHireMe(false)} />
    </nav>
  )
}

export default Navbar