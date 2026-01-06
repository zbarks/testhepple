import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useVelocity, useSpring } from 'framer-motion';

const Bottle3D: React.FC<{ img: string, name: string }> = ({ img, name }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Dedicated Cork Asset provided by the user
  const corkImg = "https://i.postimg.cc/9Fm8L8Vn/image.png";

  // Animation values for the cork pop
  // We use a spring for a more "snappy" pop feel
  const springConfig = { damping: 25, stiffness: 120 };
  const rawStopperY = useTransform(scrollYProgress, [0.35, 0.6], [0, -250]);
  const stopperY = useSpring(rawStopperY, springConfig);
  
  const stopperRotate = useTransform(scrollYProgress, [0.38, 0.6], [0, 15]);
  const stopperScale = useTransform(scrollYProgress, [0.4, 0.6], [1, 1.1]);
  
  // Perspective and depth effects
  const corkOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0.42, 0.48, 0.55], [0, 0.4, 0]);
  const mistScale = useTransform(scrollYProgress, [0.42, 0.6], [0.5, 2]);

  const bottleRotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const bottleRotateY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const bottleScale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]), { damping: 30 });
  const containerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={targetRef}
      style={{ 
        opacity: containerOpacity,
        scale: bottleScale,
        perspective: 1500
      }}
      className="relative w-full h-[800px] flex items-center justify-center"
    >
      <motion.div 
        style={{ rotateX: bottleRotateX, rotateY: bottleRotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full flex items-center justify-center"
      >
        {/* Layer 1: The High-Fidelity Cork (Pop Animation) */}
        <motion.div 
          style={{ 
            y: stopperY, 
            rotateZ: stopperRotate, 
            scale: stopperScale, 
            opacity: corkOpacity,
            transformStyle: 'preserve-3d' 
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            {/* The Dedicated Cork Asset */}
            <img 
              src={corkImg} 
              alt="Hand-crafted Hepple Cork" 
              className="h-[120px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] -translate-y-[280px]"
            />
          </div>
        </motion.div>

        {/* Layer 2: The Main Glass Bottle Body (Clipped to be open) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Base Bottle with original top hidden */}
            <img 
              src={img} 
              alt={`${name} Body`} 
              className="h-full object-contain drop-shadow-2xl"
              style={{ clipPath: 'inset(14% 0 0 0)' }}
            />
            
            {/* Interior shadow for the open bottle neck */}
            <motion.div 
              style={{ 
                opacity: useTransform(scrollYProgress, [0.4, 0.5], [0, 0.6]),
                top: '14.2%'
              }}
              className="absolute w-16 h-4 bg-black/80 rounded-[100%] blur-[6px] pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Atmospheric "Pop" Mist Effect */}
        <motion.div 
          style={{ 
            opacity: mistOpacity,
            scale: mistScale,
            top: '14%'
          }}
          className="absolute left-1/2 -translate-x-1/2 w-48 h-48 bg-white/30 blur-[120px] rounded-full pointer-events-none z-20"
        />
        
        {/* Secondary vapor trail */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.45, 0.55], [0, 0.1]),
            scale: useTransform(scrollYProgress, [0.45, 0.65], [1, 2.5]),
            top: '10%'
          }}
          className="absolute left-1/2 -translate-x-1/2 w-20 h-60 bg-gradient-to-t from-white/20 to-transparent blur-[60px] rounded-full pointer-events-none z-20"
        />
      </motion.div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 500 });
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [-8, 8]);

  const products = [
    { 
      name: 'Hepple Gin', 
      tag: 'High-Fidelity Spirit', 
      img: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png', 
      id: 'hepple-gin',
      desc: 'Our flagship. A surgical extraction of the wild juniper heart.'
    },
    { 
      name: 'Douglas Fir Vodka', 
      tag: 'Liquid Pine Forest', 
      img: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png', 
      id: 'douglas-fir-vodka',
      desc: 'Transportive, zesty, and unashamedly bold.'
    },
    { 
      name: 'Sloe & Hawthorn', 
      tag: 'The Wild Hedgerow', 
      img: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png', 
      id: 'sloe-hawthorn-gin',
      desc: 'A dry, peppery British classic with a modern edge.'
    }
  ];

  return (
    <div className="overflow-hidden bg-[#0d0d0d]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: useTransform(scrollY, [0, 1000], [0, 300]) }} className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" 
            className="w-full h-full object-cover scale-110 brightness-[0.12]" 
            alt="The Hepple Moors"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, ease: [0.2, 0, 0, 1] }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.span 
            style={{ y: textShift }} 
            className="text-[10px] uppercase text-[#6d7e6d] mb-12 block font-bold tracking-[1.2em]"
          >
            Distilled in the Wild
          </motion.span>
          <motion.h1 
            style={{ y: textShift }} 
            className="text-7xl md:text-[13rem] serif mb-12 italic leading-[0.7] tracking-tighter"
          >
            Refined <br/> by Nature.
          </motion.h1>
          <Link to="/collection" className="group relative inline-block px-14 py-6 border border-white/10 overflow-hidden transition-all duration-1000">
            <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-black transition-colors duration-500">
              Enter the House
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"></div>
          </Link>
        </motion.div>
      </section>

      {/* HIGH FIDELITY CORK POP SECTION */}
      <section className="py-72 px-8 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative z-10 space-y-12">
                <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.6em] text-[#555] block">Unsealing the North</motion.span>
                <motion.h2 style={{ y: textShift }} className="serif text-6xl md:text-8xl italic leading-[0.85]">Released <br/> Potential.</motion.h2>
                <motion.p style={{ y: textShift }} className="text-[#888] text-xl font-light leading-relaxed max-w-lg italic">
                    The moment the seal is broken, years of landscape patience are released. We capture the resinous top-notes of fresh juniper through surgical vacuum distillation—notes that traditional methods simply cannot reach.
                </motion.p>
                <div className="pt-8">
                  <Link to="/about" className="text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 hover:border-white transition-all">
                    The Three-Stage Method
                  </Link>
                </div>
            </div>

            <div className="relative h-[900px] flex items-center justify-center">
                <Bottle3D 
                  img={products[0].img} 
                  name={products[0].name} 
                />
            </div>
        </div>
      </section>

      {/* Range Grid */}
      <section className="py-52 px-8 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((p, i) => (
                <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 1.4, ease: [0.2, 0, 0, 1] }}
                    className="group bg-white/[0.01] border border-white/5 p-16 hover:bg-white/[0.03] transition-all duration-1000"
                >
                    <div className="h-72 mb-12 flex justify-center items-center product-glow overflow-hidden">
                        <motion.img 
                            whileHover={{ scale: 1.12, rotate: -2 }}
                            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
                            src={p.img} 
                            className="h-full object-contain drop-shadow-2xl" 
                            alt={p.name} 
                        />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#6d7e6d] block mb-4 font-bold">{p.tag}</span>
                    <h3 className="serif text-4xl italic mb-6">{p.name}</h3>
                    <p className="text-[#666] text-sm leading-relaxed mb-8 font-light italic">{p.desc}</p>
                    <Link to={`/product/${p.id}`} className="text-[9px] uppercase tracking-widest border-b border-white/10 pb-1 group-hover:border-white transition-all">
                        Experience
                    </Link>
                </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;