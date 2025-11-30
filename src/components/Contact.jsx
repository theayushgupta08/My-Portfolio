import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import AlertDialog from './AlertDialog';


const Contact = () => {
  const formRef = useRef();
  const [form, setform] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setloading] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    emailjs.send("service_hxty45a", "template_jqf4zhx", {
      from_name: form.name,
      to_name: 'Ayush Gupta',
      from_email: form.email,
      to_email: 'ayushkumarshaw980@gmail.com',
      message: form.message
    }, "UWKeBqUDXONVOQ_hu")
      .then(() => {
        setloading(false);
        setAlert({
          isOpen: true,
          type: 'success',
          title: 'Message Sent!',
          message: 'Thank You! I will get back to you as soon as possible.'
        });
        setform({
          name: "",
          email: "",
          message: ""
        })
      }, (error) => {
        setloading(false);
        console.log(error);
        setAlert({
          isOpen: true,
          type: 'error',
          title: 'Error',
          message: 'Something went wrong! Try again later.'
        });
      })
  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 rounded-2xl p-8'>
        <p className={styles.sectionSubText}>Get in Touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-8 mt-12'>
          <label htmlFor="" className='flex flex-col'>
            <span className='text-white font-medium mb-4 '>Your Name</span>
            <input name='name' type="text" value={form.name} onChange={handleChange} placeholder="What's your name?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>

          <label htmlFor="" className='flex flex-col'>
            <span className='text-white font-medium mb-4 '>Your Email</span>
            <input name='email' type="email" value={form.email} onChange={handleChange} placeholder="What's your email?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>

          <label htmlFor="" className='flex flex-col'>
            <span className='text-white font-medium mb-4 '>Your Message</span>
            <textarea rows={7} name='message' type="text" value={form.message} onChange={handleChange} placeholder="What do you want to say?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>

          <button type='submit' className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'>
            {
              loading ? 'Sending...' : 'Send Message'
            }
          </button>

        </form>
      </motion.div>
      {/* for earth canvas  */}
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alert.isOpen}
        onClose={() => setAlert({ ...alert, isOpen: false })}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        duration={alert.type === 'success' ? 3000 : 4000}
      />
    </div>
  )
}

export default SectionWrapper(Contact, "contact")