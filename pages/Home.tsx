import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useVelocity, useSpring } from 'framer-motion';

const Bottle3D: React.FC<{ img: string, name: string }> = ({ img, name }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Animation values for the cork pop
  const stopperY = useTransform(scrollYProgress, [0.3, 0.65], [0, -220]);
  const stopperRotate = useTransform(scrollYProgress, [0.35, 0.65], [0, 12]);
  const stopperScale = useTransform(scrollYProgress, [0.35, 0.65], [1, 1.08]);
  
  // Perspective and depth effects
  const corkDepthOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const bottleNeckShadow = useTransform(scrollYProgress, [0.35, 0.45], [0, 0.4]);

  const bottleRotateX = useTransform(scrollYProgress, [0, 1], [4, -4]);
  const bottleRotateY = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const bottleScale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]), { damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={targetRef}
      style={{ 
        opacity,
        scale: bottleScale,
        perspective: 1500
      }}
      className="relative w-full h-[750px] flex items-center justify-center"
    >
      <motion.div 
        style={{ rotateX: bottleRotateX, rotateY: bottleRotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full flex items-center justify-center"
      >
        {/* Layer 1: The Wooden Cork (Stopper) Fragment */}
        <motion.div 
          style={{ y: stopperY, rotateZ: stopperRotate, scale: stopperScale, transformStyle: 'preserve-3d' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            {/* The actual PNG fragment */}
            <img 
              src={img} 
              alt={`${name} Stopper`} 
              className="h-full object-contain drop-shadow-2xl"
              style={{ clipPath: 'inset(0 0 88% 0)' }}
            />
            
            {/* 3D Depth Simulation: The "Bottom" of the cork that appears as it lifts */}
            <motion.div 
              style={{ 
                opacity: corkDepthOpacity,
                top: '11.8%' // Positioned exactly at the cut line
              }}
              className="absolute w-20 h-6 bg-[#3d2b1f] rounded-[100%] blur-[2px] shadow-inner"
            />
          </div>
        </motion.div>

        {/* Layer 2: The Main Glass Bottle Body */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <img 
              src={img} 
              alt={`${name} Body`} 
              className="h-full object-contain drop-shadow-2xl"
              style={{ clipPath: 'inset(12% 0 0 0)' }}
            />
            
            {/* Shadow on the bottle rim where the cork used to be */}
            <motion.div 
              style={{ 
                opacity: bottleNeckShadow,
                top: '12.2%'
              }}
              className="absolute w-16 h-4 bg-black/60 rounded-[100%] blur-[4px] pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Atmospheric Bloom at the moment of "Pop" */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 0.15, 0]),
            scale: useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1.5]),
          }}
          className="absolute top-[12%] left-1/2 -translate-x-1/2 w-40 h-40 bg-white/20 blur-[100px] rounded-full pointer-events-none z-20"
        />
      </motion.div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 500 });
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [-10, 10]);

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
            className="w-full h-full object-cover scale-110 brightness-[0.15]" 
            alt="The Hepple Moors"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.2, 0, 0, 1] }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.span 
            style={{ y: textShift }} 
            className="text-[10px] uppercase text-[#6d7e6d] mb-12 block font-bold tracking-[1em]"
          >
            Distilled in the Wild
          </motion.span>
          <motion.h1 
            style={{ y: textShift }} 
            className="text-7xl md:text-[12rem] serif mb-12 italic leading-[0.75] tracking-tighter"
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

      {/* 3D CORK POP SECTION */}
      <section className="py-60 px-8 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative z-10 space-y-12">
                <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.5em] text-[#555] block">Unsealing the Moor</motion.span>
                <motion.h2 style={{ y: textShift }} className="serif text-6xl md:text-8xl italic leading-[0.9]">The Spirit <br/> of Place.</motion.h2>
                <motion.p style={{ y: textShift }} className="text-[#888] text-xl font-light leading-relaxed max-w-lg italic">
                    When the cork yields, the landscape speaks. Our distillation process isn't just about chemistry; it's about absolute fidelity to the raw, untamed botanicals of Northumberland.
                </motion.p>
                <div className="pt-8">
                  <Link to="/about" className="text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 hover:border-white transition-all">
                    Discover the Philosophy
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
      <section className="py-52 px-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p, i) => (
                <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 1.2 }}
                    className="group bg-white/[0.02] border border-white/5 p-12 hover:bg-white/[0.04] transition-all duration-1000"
                >
                    <div className="h-64 mb-12 flex justify-center items-center product-glow overflow-hidden">
                        <motion.img 
                            whileHover={{ scale: 1.15, rotate: -3 }}
                            transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
                            src={p.img} 
                            className="h-full object-contain drop-shadow-2xl" 
                            alt={p.name} 
                        />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#6d7e6d] block mb-4">{p.tag}</span>
                    <h3 className="serif text-3xl italic mb-6">{p.name}</h3>
                    <p className="text-[#555] text-sm leading-relaxed mb-8">{p.desc}</p>
                    <Link to={`/product/${p.id}`} className="text-[9px] uppercase tracking-widest border-b border-white/10 pb-1 group-hover:border-white transition-all">
                        Details
                    </Link>
                </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;