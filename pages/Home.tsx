import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

// Refined 3D background elements
const FloatingDistillationMap = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Drifting Lens Flare/Mist */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-[#6d7e6d]/10 blur-[150px] rounded-full"
      />
      
      {/* Geometric Lab Grid */}
      <motion.div 
        style={{ y: y1, rotate, opacity: 0.05 }}
        className="absolute top-[15%] right-[-5%] w-[800px] h-[800px] border border-white/40 rounded-full"
      />

      {/* Vertical Distillation Line */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-0 right-[20%] w-[1px] h-screen bg-gradient-to-b from-transparent via-white/10 to-transparent"
      />

      {/* Drifting Botanical Fragment */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [200, -200]), x: -50 }}
        className="absolute bottom-[20%] left-[5%] w-64 h-64 border border-white/5 rotate-12 flex items-center justify-center"
      >
          <div className="w-full h-[1px] bg-white/5 -rotate-45"></div>
      </motion.div>
    </div>
  );
};

const Home: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  const skew = useTransform(smoothVelocity, [-2000, 2000], [-1.5, 1.5]);
  const scale = useTransform(smoothVelocity, [-2000, 2000], [0.99, 1.01]);

  const titleWords = ["The", "Wild,", "Refined."];

  const products = [
    { 
      name: 'Hepple Gin', 
      tag: 'High-Fidelity Spirit', 
      img: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png', 
      id: 'hepple-gin'
    },
    { 
      name: 'Douglas Fir', 
      tag: 'Botanical Extraction', 
      img: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png', 
      id: 'douglas-fir-vodka'
    },
    { 
      name: 'Sloe & Hawthorn', 
      tag: 'Hedgerow Resonance', 
      img: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png', 
      id: 'sloe-hawthorn-gin'
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0d0d0d]">
      <FloatingDistillationMap />

      {/* Hero Section */}
      <section className="relative h-[110vh] flex items-center justify-center perspective-container overflow-hidden">
        <motion.div 
          style={{ skewY: skew, scale }}
          className="relative z-10 text-center space-y-16 px-8"
        >
          <div className="overflow-hidden py-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.2, 0, 0, 1], delay: 0.2 }}
              className="text-[10px] uppercase tracking-[0.9em] text-[#6d7e6d] font-bold block"
            >
              Distilled in the Wild
            </motion.span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {titleWords.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0, rotate: 5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.4 + (i * 0.15), 
                    ease: [0.2, 0, 0, 1] 
                  }}
                  className="text-7xl md:text-[11rem] serif italic leading-[0.8] tracking-tighter text-white"
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <div className="editorial-line mb-12"></div>
            <Link to="/collection" className="group relative inline-block px-14 py-6 border border-white/10 overflow-hidden">
              <span className="relative z-10 text-[9px] uppercase tracking-[0.5em] font-bold group-hover:text-black transition-colors duration-700">
                Enter the Range
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.2, 0, 0, 1]"></div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Parallax Background Background */}
        <motion.div 
          style={{ 
            y: useTransform(scrollY, [0, 1000], [0, 150]),
            scale: useTransform(scrollY, [0, 1000], [1, 1.1]),
            opacity: useTransform(scrollY, [0, 1000], [0.25, 0.1])
          }}
          className="absolute inset-0 z-0 grayscale pointer-events-none"
        >
          <img 
            src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" 
            className="w-full h-full object-cover"
            alt=""
          />
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="py-64 px-8 relative z-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
            className="space-y-12"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#555] block">Structural Integrity</span>
            <h2 className="serif text-5xl md:text-7xl italic leading-[1.1] tracking-tight">Triple Distilled.<br/>Zero Compromise.</h2>
            <p className="text-xl text-[#888] font-light leading-relaxed max-w-md italic border-l border-white/10 pl-10">
              Capturing the resinous top-notes of fresh juniper using a surgical combination of copper, vacuum, and CO2 extraction.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.2, 0, 0, 1] }}
            className="relative perspective-container"
          >
            <div className="aspect-[4/5] bg-white/[0.03] overflow-hidden group">
              <img 
                src="https://i.postimg.cc/dtvXkXvX/Hepple-1080x1080-ad-12.png" 
                className="w-full h-full object-cover grayscale brightness-50 transition-transform duration-[4s] group-hover:scale-105"
                alt="Hepple Juniper"
              />
              <div className="absolute inset-0 border-[1px] border-white/10 m-8"></div>
            </div>
            {/* Drifting Caption Block */}
            <motion.div 
              style={{ y: useTransform(scrollY, [600, 1800], [80, -80]) }}
              className="absolute -bottom-16 -left-16 bg-white text-black p-12 hidden lg:block shadow-2xl"
            >
                <p className="serif text-3xl italic tracking-tighter">Wild Fidelity.</p>
                <div className="w-12 h-[1px] bg-black/20 my-6"></div>
                <span className="text-[9px] uppercase tracking-widest block opacity-60">Estate Harvest 2024</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Display */}
      <section className="py-64 bg-[#0a0a0a]">
        <div className="max-w-screen-2xl mx-auto px-8">
            <div className="mb-40 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
                <h2 className="serif text-6xl md:text-8xl italic tracking-tighter">The Essentials.</h2>
                <Link to="/collection" className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white/20 pb-2 hover:border-white transition-all">Browse Collection</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-32">
                {products.map((p, i) => (
                    <motion.div 
                        key={p.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="group flex flex-col items-center"
                    >
                        <div className="relative aspect-[3/4] w-full bg-white/[0.015] border border-white/5 flex items-center justify-center p-20 mb-12 overflow-hidden product-glow transition-all duration-1000 group-hover:bg-white/[0.04]">
                            <motion.img 
                                whileHover={{ scale: 1.08, y: -20 }}
                                transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
                                src={p.img} 
                                className="h-full object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.7)]" 
                                alt={p.name} 
                            />
                            <Link 
                                to={`/product/${p.id}`}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]"
                            >
                                <span className="bg-white text-black px-10 py-5 text-[10px] uppercase font-bold tracking-[0.3em]">Examine</span>
                            </Link>
                        </div>
                        <div className="text-center space-y-4">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#6d7e6d] font-bold block">{p.tag}</span>
                            <h3 className="serif text-4xl italic text-white">{p.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="h-screen relative flex flex-col items-center justify-center px-8">
         <motion.div 
            style={{ opacity: useTransform(scrollY, [3000, 3800], [0, 1]) }}
            className="text-center space-y-12 relative z-10"
         >
            <h2 className="serif text-6xl md:text-[10rem] italic leading-none tracking-tighter">Heritage & Future.</h2>
            <Link to="/contact" className="inline-block text-[11px] uppercase tracking-[0.6em] font-bold border border-white/10 px-20 py-10 hover:bg-white hover:text-black transition-all duration-1000">
                Book a Private Tasting
            </Link>
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0d0d0d]/80 to-transparent"></div>
      </section>
    </div>
  );
};

export default Home;