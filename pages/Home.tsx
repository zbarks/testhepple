import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useVelocity, useSpring } from 'framer-motion';

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  
  // -- CORRECTED SCROLL DIRECTION MOTION LOGIC --
  // We calculate velocity and apply a tight spring to remove lag
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60, // Increased damping for weighted, non-jittery settle
    stiffness: 500 // Increased stiffness for immediate response (low latency)
  });
  
  /** 
   * DIRECTION FIX: 
   * Scroll DOWN (Velocity +) -> Text moves UP (Y -)
   * Scroll UP (Velocity -) -> Text moves DOWN (Y +)
   * Max offset limited to 12px for luxury subtlety.
   */
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [12, -12]);
  // ---------------------------------------------

  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const introY = useTransform(scrollY, [400, 1200], [40, -40]);

  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const products = [
    { 
      name: 'Hepple Gin', 
      tag: 'Modern Classic', 
      img: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png', 
      id: 'hepple-gin',
      desc: 'An intense yet elegant reinvention of a classic gin.'
    },
    { 
      name: 'Douglas Fir Vodka', 
      tag: 'Zesty & Tropical', 
      img: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png', 
      id: 'douglas-fir-vodka',
      desc: 'Transportive essence of ancient pine forests.'
    },
    { 
      name: 'Sloe & Hawthorn', 
      tag: 'Juicy & Peppery', 
      img: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png', 
      id: 'sloe-hawthorn-gin',
      desc: 'A sophisticated take on a British tradition.'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" 
            className="w-full h-full object-cover scale-110 brightness-[0.35]" 
            alt="Northumberland Landscape"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.span 
            style={{ y: textShift }} 
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-[10px] uppercase text-[#c0c0c0] mb-8 block"
          >
            Distilled in the Wild
          </motion.span>
          <motion.h1 
            style={{ y: textShift }} 
            className="text-6xl md:text-9xl serif mb-12 italic leading-tight tracking-tight"
          >
            Nature, Refined.
          </motion.h1>
          <Link to="/collection" className="group relative inline-block px-14 py-6 border border-white/10 overflow-hidden transition-all duration-700">
            <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-black transition-colors duration-500">
              Explore the Collection
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"></div>
          </Link>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30"
        >
          <div className="editorial-line"></div>
        </motion.div>
      </section>

      {/* Intro Editorial */}
      <section className="py-52 px-8">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
            >
                <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.4em] text-[#555] mb-6 block">Our Home</motion.span>
                <motion.h2 style={{ y: textShift }} className="serif text-4xl md:text-6xl mb-10 italic leading-tight">Provenance at its purest.</motion.h2>
                <motion.p style={{ y: textShift }} className="text-[#888] text-lg leading-[1.9] font-light mb-10">
                    Hepple is more than a name; it is a location. Nestled in the remote moors of Northumberland, our distillery is surrounded by the very botanicals that define our spirits.
                </motion.p>
                <Link to="/about" className="group inline-flex items-center text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 hover:border-white transition-all">
                  The Hepple Heritage
                  <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">→</span>
                </Link>
            </motion.div>
            
            <motion.div 
              style={{ y: introY }}
              className="relative group overflow-hidden shadow-2xl"
            >
                <img src="https://i.postimg.cc/dtvXkXvX/Hepple-1080x1080-ad-12.png" className="w-full grayscale brightness-75 group-hover:scale-110 transition-transform duration-[3s] ease-out" alt="Wild Botanicals" />
                <div className="absolute inset-0 border-[20px] border-[#0d0d0d] pointer-events-none"></div>
            </motion.div>
        </div>
      </section>

      {/* Interactive Range Hero Switcher */}
      <section className="bg-[#0a0a0a] py-52 px-8">
        <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-32">
                <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.4em] text-[#555] mb-4 block">Selected Works</motion.span>
                <motion.h2 style={{ y: textShift }} className="serif text-5xl italic">The Award Winners</motion.h2>
            </div>
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
                {/* Main Interactive Product View */}
                <div className="w-full lg:w-3/4 relative h-[600px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={products[activeProductIndex].id}
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
                      className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 items-center"
                    >
                      <div className="flex justify-center items-center h-[500px] product-glow">
                        <motion.img 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          src={products[activeProductIndex].img} 
                          className="max-h-full object-contain drop-shadow-2xl" 
                          alt={products[activeProductIndex].name} 
                        />
                      </div>
                      <div className="text-left space-y-8 pl-0 lg:pl-12">
                        <div>
                          <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.3em] text-[#6d7e6d] block mb-2">{products[activeProductIndex].tag}</motion.span>
                          <motion.h3 style={{ y: textShift }} className="serif text-5xl italic mb-4">{products[activeProductIndex].name}</motion.h3>
                          <motion.p style={{ y: textShift }} className="text-[#666] text-lg font-light leading-relaxed max-w-sm">{products[activeProductIndex].desc}</motion.p>
                        </div>
                        <Link to={`/product/${products[activeProductIndex].id}`} className="inline-block border border-white/20 px-10 py-4 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500">
                          View Specifications
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Sidebar Product Selection */}
                <div className="w-full lg:w-1/4 flex lg:flex-col gap-4 lg:gap-8 justify-center">
                  {products.map((item, idx) => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveProductIndex(idx)}
                      className={`group relative flex items-center p-4 transition-all duration-700 ${activeProductIndex === idx ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
                    >
                      <div className="h-20 w-20 bg-white/5 p-2 flex items-center justify-center mr-4 transition-transform duration-500 group-hover:scale-110">
                        <img src={item.img} className="max-h-full object-contain" alt={item.name} />
                      </div>
                      <div className="text-left hidden lg:block">
                        <h4 className="serif text-sm italic">{item.name}</h4>
                        <div className={`h-[1px] bg-white transition-all duration-700 ${activeProductIndex === idx ? 'w-full' : 'w-0'}`}></div>
                      </div>
                    </button>
                  ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;