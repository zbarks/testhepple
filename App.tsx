import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import { motion, AnimatePresence } from 'framer-motion';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AgeGate = ({ onVerify }: { onVerify: () => void }) => {
  const [error, setError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
      className="fixed inset-0 z-[100] bg-[#0d0d0d] flex items-center justify-center p-8 overflow-hidden"
    >
      <div className="max-w-xl w-full text-center space-y-12">
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          src="https://i.postimg.cc/CdytLhY4/image-Photoroom.png" 
          className="h-24 mx-auto mb-16 grayscale brightness-200" 
          alt="Hepple Spirits" 
        />
        
        <AnimatePresence mode="wait">
          {!error ? (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <h1 className="serif text-4xl md:text-5xl italic leading-tight">Are you of legal drinking age?</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#555] max-w-sm mx-auto leading-loose">
                You must be at least 18 years of age to enter the world of Hepple Spirits.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button 
                  onClick={onVerify}
                  className="w-full md:w-48 py-5 border border-white/20 hover:bg-white hover:text-black transition-all duration-700 text-[10px] uppercase tracking-widest font-bold"
                >
                  Yes, I am 18+
                </button>
                <button 
                  onClick={() => setError(true)}
                  className="w-full md:w-48 py-5 text-[#444] hover:text-white transition-all text-[10px] uppercase tracking-widest font-bold"
                >
                  No, I am not
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <h2 className="serif text-3xl italic">Access Restricted.</h2>
              <div className="text-sm text-[#888] font-light leading-relaxed space-y-4">
                <p>We're sorry, but you must be of legal drinking age to access this site.</p>
                <p className="text-xs italic opacity-70">Hepple Spirits is a brand dedicated to the craft of fine distillation. In compliance with UK regulations and global alcohol advertising standards, we strictly limit access to those who have reached the legal age to consume and purchase alcohol.</p>
              </div>
              <div className="pt-8">
                <a href="https://www.drinkaware.co.uk" className="text-[9px] uppercase tracking-widest border-b border-white/10 pb-2 hover:border-white transition-all">Learn more at Drinkaware</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Decorative side lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [isVerified, setIsVerified] = useState(() => {
    return localStorage.getItem('hepple_age_verified') === 'true';
  });

  const handleVerify = () => {
    setIsVerified(true);
    localStorage.setItem('hepple_age_verified', 'true');
  };

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence>
        {!isVerified && <AgeGate onVerify={handleVerify} />}
      </AnimatePresence>
      
      {isVerified && (
        <div className="flex flex-col min-h-screen bg-[#0d0d0d]">
          <Navbar />
          <main className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout/:id" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
};

export default App;