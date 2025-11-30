import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { X, Send, User, Phone, Mail, Briefcase, FileText } from 'lucide-react';
import AlertDialog from './AlertDialog';

const HireMe = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    natureOfWork: '',
    workDescription: ''
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        "service_hxty45a",
        "template_jqf4zhx",
        {
          from_name: form.name,
          to_name: 'Ayush Gupta',
          from_email: form.email,
          to_email: 'ayushkumarshaw980@gmail.com',
          message: `Hire Me Request Details:\n\nName: ${form.name}\nContact: ${form.contact}\nEmail: ${form.email}\nNature of Work: ${form.natureOfWork}\nWork Description: ${form.workDescription}`
        },
        "UWKeBqUDXONVOQ_hu"
      );

      setLoading(false);
      
      // Reset form
      setForm({
        name: '',
        contact: '',
        email: '',
        natureOfWork: '',
        workDescription: ''
      });

      // Close modal immediately
      onClose();

      // Show success message
      setAlert({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Thank you! Your details have been sent. Opening my Freelancer profile...'
      });

      // Open freelance profile in new tab
      window.open('https://www.freelancer.in/u/theayushgupta08', '_blank');

    } catch (error) {
      setLoading(false);
      console.log(error);
      setAlert({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Something went wrong! Please try again later.'
      });
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-tertiary rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-purple-500/20 mx-auto my-auto"
              style={{ 
                position: 'relative',
                margin: 'auto'
              }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-md border-b border-purple-500/20 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Hire Me</h2>
                  <p className="text-sm text-secondary mt-1">Fill in your details and I'll get back to you</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-white font-medium mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="bg-black/50 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium"
                  />
                </div>

                {/* Contact */}
                <div className="flex flex-col">
                  <label htmlFor="contact" className="text-white font-medium mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-400" />
                    Contact Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    required
                    className="bg-black/50 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-white font-medium mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="bg-black/50 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium"
                  />
                </div>

                {/* Nature of Work */}
                <div className="flex flex-col">
                  <label htmlFor="natureOfWork" className="text-white font-medium mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    Nature of Work <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="natureOfWork"
                    name="natureOfWork"
                    value={form.natureOfWork}
                    onChange={handleChange}
                    required
                    className="bg-black/50 py-3 px-4 text-white rounded-lg outline-none border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium"
                  >
                    <option value="" className="bg-tertiary">Select nature of work</option>
                    <option value="Web Development" className="bg-tertiary">Web Development</option>
                    <option value="Mobile App Development" className="bg-tertiary">Mobile App Development</option>
                    <option value="Full Stack Development" className="bg-tertiary">Full Stack Development</option>
                    <option value="Data Analysis" className="bg-tertiary">Data Analysis</option>
                    <option value="Machine Learning" className="bg-tertiary">Machine Learning</option>
                    <option value="UI/UX Design" className="bg-tertiary">UI/UX Design</option>
                    <option value="Other" className="bg-tertiary">Other</option>
                  </select>
                </div>

                {/* Work Description */}
                <div className="flex flex-col">
                  <label htmlFor="workDescription" className="text-white font-medium mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Work Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="workDescription"
                    name="workDescription"
                    rows={5}
                    value={form.workDescription}
                    onChange={handleChange}
                    placeholder="Describe your project requirements, timeline, and any specific details..."
                    required
                    className="bg-black/50 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-6 rounded-lg bg-gray-700/50 text-white font-semibold hover:bg-gray-700 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alert.isOpen}
        onClose={() => setAlert({ ...alert, isOpen: false })}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        duration={alert.type === 'success' ? 3000 : 4000}
      />
    </AnimatePresence>
  );
};

export default HireMe;

