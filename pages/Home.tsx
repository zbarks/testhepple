import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const HE_IMAGE = "data:image/png;base64,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";

const Bottle3D = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Layer Animations
  const stopperY = useTransform(scrollYProgress, [0.4, 0.6], [0, -220]);
  const neckY = useTransform(scrollYProgress, [0.45, 0.65], [0, -80]);
  const rotationZ = useTransform(scrollYProgress, [0.4, 0.7], [0, 12]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.7, 0.85], [0, 1, 1, 0]);
  const scale = useSpring(useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1.1]), { stiffness: 100, damping: 20 });

  return (
    <section ref={ref} className="relative h-[200vh] w-full flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center justify-center px-12 gap-20">
        
        {/* Callout Text Left */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.45, 0.55], [0, 1]) }}
          className="hidden lg:block space-y-12 max-w-xs"
        >
          <div className="border-l border-white/20 pl-6">
            <span className="text-[9px] uppercase tracking-widest text-[#6d7e6d] font-bold">Phase 01</span>
            <h4 className="serif text-2xl italic text-white mt-2">The Stopper</h4>
            <p className="text-sm text-[#555] leading-relaxed mt-4">Pressure-sealed integrity. As we deconstruct the wild, the resins are released first.</p>
          </div>
        </motion.div>

        {/* The Animated Bottle Assembly */}
        <motion.div 
          style={{ opacity, scale, perspective: 2000 }}
          className="relative w-[300px] h-[600px] flex items-center justify-center"
        >
          {/* Layer 1: Stopper (The Cap) */}
          <motion.div 
            style={{ y: stopperY, rotateZ: rotationZ }}
            className="absolute inset-0 z-30 pointer-events-none"
          >
            <img 
              src={HE_IMAGE} 
              className="w-full h-full object-contain" 
              style={{ clipPath: 'inset(0 0 78% 0)' }} 
              alt="Cap"
            />
          </motion.div>

          {/* Layer 2: Neck (The Shoulder) */}
          <motion.div 
            style={{ y: neckY, rotateZ: useTransform(scrollYProgress, [0.4, 0.7], [0, 5]) }}
            className="absolute inset-0 z-20"
          >
            <img 
              src={HE_IMAGE} 
              className="w-full h-full object-contain" 
              style={{ clipPath: 'inset(22% 0 55% 0)' }} 
              alt="Neck"
            />
            {/* Vapor Glow */}
            <motion.div 
              animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#6d7e6d]/20 blur-3xl rounded-full"
            />
          </motion.div>

          {/* Layer 3: Main Body */}
          <motion.div className="absolute inset-0 z-10">
            <img 
              src={HE_IMAGE} 
              className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]" 
              style={{ clipPath: 'inset(45% 0 0 0)' }} 
              alt="Body"
            />
          </motion.div>
        </motion.div>

        {/* Callout Text Right */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.55, 0.65], [0, 1]) }}
          className="hidden lg:block space-y-12 max-w-xs"
        >
          <div className="border-r border-white/20 pr-6 text-right">
            <span className="text-[9px] uppercase tracking-widest text-[#6d7e6d] font-bold">Phase 02</span>
            <h4 className="serif text-2xl italic text-white mt-2">CO2 Purity</h4>
            <p className="text-sm text-[#555] leading-relaxed mt-4">Deep structural fidelity. We extract the impossible green notes using surgical precision.</p>
          </div>
        </motion.div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
            <motion.p 
                style={{ opacity: useTransform(scrollYProgress, [0.35, 0.5], [1, 0]) }}
                className="text-[10px] uppercase tracking-[0.5em] text-white/40"
            >
                Scroll to Deconstruct
            </motion.p>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 500 });
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [-12, 12]);

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
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: useTransform(scrollY, [0, 1000], [0, 300]) }} className="absolute inset-0 z-0">
          <img src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" className="w-full h-full object-cover scale-110 brightness-[0.2]" alt="Moors" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.span style={{ y: textShift }} className="text-[10px] uppercase text-[#6d7e6d] mb-12 block font-bold tracking-[0.8em]">The Elegant Wild</motion.span>
          <motion.h1 style={{ y: textShift }} className="text-7xl md:text-[13rem] serif italic leading-[0.8] tracking-tighter">High<br/>Fidelity.</motion.h1>
          <div className="mt-16">
            <Link to="/collection" className="group relative inline-block px-14 py-6 border border-white/10 overflow-hidden">
                <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-black">Enter House</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3D Bottle Scroll Section */}
      <Bottle3D />

      {/* Grid */}
      <section className="py-52 px-8 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-32">
                <h2 className="serif text-6xl italic">Selected Spirits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {products.map((p, i) => (
                    <motion.div 
                        key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white/[0.02] border border-white/5 p-12 hover:bg-white/[0.05] transition-all duration-700"
                    >
                        <div className="h-72 mb-10 flex justify-center items-center product-glow">
                            <img src={p.img} className="h-full object-contain group-hover:scale-110 transition-transform duration-1000" alt={p.name} />
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-[#555] block mb-4">{p.tag}</span>
                        <h3 className="serif text-3xl italic mb-6">{p.name}</h3>
                        <Link to={`/product/${p.id}`} className="inline-block text-[10px] uppercase tracking-widest border-b border-white/10 pb-1 hover:border-white">Details</Link>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;