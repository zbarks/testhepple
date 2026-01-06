import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll logic for the horizontal carousel
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const products = [
    { 
      name: 'Hepple Gin', 
      tag: 'Phase 01', 
      img: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png', 
      id: 'hepple-gin',
      description: 'The surgical extraction of juniper heart.'
    },
    { 
      name: 'Douglas Fir', 
      tag: 'Phase 02', 
      img: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png', 
      id: 'douglas-fir-vodka',
      description: 'A liquid pine forest, captured in high-fidelity.'
    },
    { 
      name: 'Sloe & Hawthorn', 
      tag: 'Phase 03', 
      img: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png', 
      id: 'sloe-hawthorn-gin',
      description: 'The peppery resonance of the autumn harvest.'
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0d0d0d] text-white">
      
      {/* Ambient Background - Just Mist, no shapes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2d3a2d_0%,_transparent_70%)]"
        />
      </div>

      {/* Hero: Refined Minimalism */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 0.4, letterSpacing: "0.8em" }}
            transition={{ duration: 2, ease: [0.2, 0, 0, 1] }}
            className="text-[10px] uppercase text-[#6d7e6d] font-bold mb-12"
          >
            Distilled in the Wild
          </motion.p>
          
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 2.5, ease: [0.2, 0, 0, 1] }}
              className="text-7xl md:text-[12rem] serif italic tracking-tighter leading-none"
            >
              The Wild,
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 2.5, ease: [0.2, 0, 0, 1], delay: 0.3 }}
              className="text-7xl md:text-[12rem] serif italic tracking-tighter leading-none pl-20"
            >
              Refined.
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="mt-20"
          >
            <div className="editorial-line mx-auto mb-12 opacity-20"></div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 animate-pulse">Scroll to explore</p>
          </motion.div>
        </div>

        {/* Backdrop Image - Highly desaturated and subtle */}
        <div className="absolute inset-0 z-0 opacity-10 grayscale brightness-50">
          <img src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" className="w-full h-full object-cover" alt="" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-60 px-8 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="max-w-2xl text-center space-y-10"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#444]">The Extraction</span>
          <h2 className="serif text-5xl italic leading-tight">"We don't tame the moorland; we listen to its vibration."</h2>
          <p className="text-[#666] font-light leading-relaxed text-lg italic">
            Using triple-distillation to capture the fleeting resinous heart of fresh juniper.
          </p>
        </motion.div>
      </section>

      {/* Horizontal Pinned Scroll Collection */}
      <div ref={carouselRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: smoothX }} className="flex h-full items-center">
            {products.map((p, i) => (
              <div key={p.id} className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-12 md:px-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-screen-2xl mx-auto">
                  
                  {/* Product Image Wrapper */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
                    className="relative aspect-[3/4] bg-white/[0.01] border border-white/5 flex items-center justify-center p-12 group overflow-hidden"
                  >
                    <img 
                      src={p.img} 
                      className="h-[90%] object-contain drop-shadow-[0_45px_65px_rgba(0,0,0,0.8)] transition-transform duration-[2s] group-hover:scale-105" 
                      alt={p.name} 
                    />
                    <div className="absolute top-8 left-8 text-[10px] uppercase tracking-[0.4em] text-[#444]">
                      Specimen No. 00{i + 1}
                    </div>
                  </motion.div>

                  {/* Product Text */}
                  <div className="space-y-12">
                    <div>
                      <motion.span 
                        whileInView={{ x: [20, 0], opacity: [0, 1] }}
                        className="text-[10px] uppercase tracking-[0.6em] text-[#6d7e6d] font-bold block mb-6"
                      >
                        {p.tag}
                      </motion.span>
                      <h3 className="serif text-7xl md:text-9xl italic tracking-tighter leading-none mb-8">{p.name}</h3>
                      <p className="text-xl text-[#888] italic font-light max-w-md">{p.description}</p>
                    </div>
                    
                    <div className="pt-10">
                      <Link to={`/product/${p.id}`} className="group inline-flex items-center space-x-6 text-[10px] uppercase tracking-[0.4em] font-bold">
                        <span className="border-b border-white/20 pb-2 group-hover:border-white transition-all">Examine Spirit</span>
                        <span className="text-xl group-hover:translate-x-2 transition-transform duration-500">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Legacy Section */}
      <section className="py-60 px-8 bg-[#0a0a0a] text-center">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 2 }}
           className="space-y-12"
        >
          <h2 className="serif text-5xl md:text-8xl italic opacity-30">Patience is the Distiller.</h2>
          <div className="editorial-line mx-auto"></div>
          <Link to="/about" className="inline-block text-[10px] uppercase tracking-[0.6em] font-bold py-10 px-20 border border-white/10 hover:bg-white hover:text-black transition-all duration-1000">
            Learn Our Process
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;