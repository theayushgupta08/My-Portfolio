import { motion } from 'framer-motion';
import { socialLinksicons } from '../constants';
import { fadeIn } from '../utils/motion';
import { Heart, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-primary border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            variants={fadeIn("up", "spring", 0.1, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-white text-xl font-bold mb-4">Ayush Gupta</h3>
            <p className="text-secondary text-sm leading-relaxed mb-4">
              Software Developer, Data Scientist & Tech Content Creator. 
              Building innovative solutions and sharing knowledge with the community.
            </p>
            <a
              href="mailto:mrayushg08@gmail.com"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              <span>mrayushg08@gmail.com</span>
            </a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-secondary hover:text-white transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="text-secondary hover:text-white transition-colors text-sm"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-secondary hover:text-white transition-colors text-sm"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#certificates"
                  className="text-secondary hover:text-white transition-colors text-sm"
                >
                  Certificates
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-secondary hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-white text-xl font-bold mb-4">Connect With Me</h3>
            <p className="text-secondary text-sm mb-4">
              Follow me on social media for updates, tech insights, and more!
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinksicons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeIn("up", "spring", 0.4 + index * 0.1, 0.75)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-lg bg-tertiary hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.alt}
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/20 my-8"></div>

        {/* Bottom Section */}
        <motion.div
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-secondary text-sm text-center md:text-left">
            © {currentYear} Ayush Gupta. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-secondary text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by</span>
            <a
              href="https://github.com/theayushgupta08"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Ayush Gupta
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;

