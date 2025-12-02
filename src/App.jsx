import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About, Contact, Experience, Education, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, Statistics, Blog, Footer } from './components';
import Certificates from './components/Certificates';
import Chatbot from './components/Chatbot';
import Awards from './components/Awards';
import BlogsList from './pages/BlogsList';
import BlogPost from './pages/BlogPost';

const HomePage = () => {
  return (
    <>
      <Chatbot />
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Education />
      <Experience />
      <Tech />
      <Statistics />
      <Works />
      <Certificates />
      <Awards />
      <Blog />
      {/* <Feedbacks /> */}
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
