import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useVelocity, useSpring, useMotionValue } from 'framer-motion';

const Bottle3D: React.FC<{ img: string, name: string }> = ({ img, name }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Refined pop-off logic for just the cork
  // Based on the provided bottle design, the cork (stopper) is roughly the top 10-12%
  const stopperY = useTransform(scrollYProgress, [0.35, 0.65], [0, -180]);
  const stopperRotate = useTransform(scrollYProgress, [0.4, 0.65], [0, 8]);
  const stopperScale = useTransform(scrollYProgress, [0.4, 0.65], [1, 1.05]);
  
  const bottleRotateX = useTransform(scrollYProgress, [0, 1], [3, -3]);
  const bottleRotateY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={targetRef}
      style={{ 
        opacity,
        scale: bottleScale,
        perspective: 1500
      }}
      className="relative w-full h-[700px] flex items-center justify-center"
    >
      <motion.div 
        style={{ rotateX: bottleRotateX, rotateY: bottleRotateY }}
        className="relative h-full w-full flex items-center justify-center transform-style-3d"
      >
        {/* Layer 1: The Wooden Cork (Stopper) */}
        <motion.div 
          style={{ y: stopperY, rotateZ: stopperRotate, scale: stopperScale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <img 
            src={img} 
            alt={`${name} Stopper`} 
            className="h-full object-contain drop-shadow-2xl"
            style={{ clipPath: 'inset(0 0 88% 0)' }}
          />
        </motion.div>

        {/* Layer 2: The Main Glass Bottle Body */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <img 
            src={img} 
            alt={`${name} Body`} 
            className="h-full object-contain drop-shadow-2xl"
            style={{ clipPath: 'inset(12% 0 0 0)' }}
          />
        </motion.div>

        {/* Subtle Atmospheric Glow when cork pops */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 0.2, 0]),
            scale: 1.2
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#6d7e6d]/20 blur-[80px] rounded-full pointer-events-none"
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

  const [activeProductIndex, setActiveProductIndex] = useState(0);

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
        <motion.div style={{ y: useTransform(scrollY, [0, 1000], [0, 250]) }} className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" 
            className="w-full h-full object-cover scale-110 brightness-[0.2]" 
            alt="The Hepple Moors"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.2, 0, 0, 1] }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.span 
            style={{ y: textShift }} 
            className="text-[10px] uppercase text-[#6d7e6d] mb-12 block font-bold tracking-[0.9em]"
          >
            Distilled in the Wild
          </motion.span>
          <motion.h1 
            style={{ y: textShift }} 
            className="text-7xl md:text-[11rem] serif mb-12 italic leading-[0.8] tracking-tighter"
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

      {/* 3D DECONSTRUCTION SECTION */}
      <section className="py-60 px-8 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative z-10 space-y-12">
                <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.5em] text-[#555] block">Structural Fidelity</motion.span>
                <motion.h2 style={{ y: textShift }} className="serif text-6xl md:text-8xl italic leading-none">The Open <br/> Distillery.</motion.h2>
                <motion.p style={{ y: textShift }} className="text-[#888] text-xl font-light leading-relaxed max-w-lg italic">
                    True luxury is transparency. As the stopper yields, we reveal the high-fidelity heart of our spirit—a surgical extraction of the wild landscape.
                </motion.p>
                <div className="pt-8">
                  <Link to="/about" className="text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 hover:border-white transition-all">
                    Explore Our Science
                  </Link>
                </div>
            </div>

            <div className="relative h-[800px] flex items-center justify-center">
                <Bottle3D 
                  img={products[activeProductIndex].img} 
                  name={products[activeProductIndex].name} 
                />
            </div>
        </div>
      </section>

      {/* Range Grid */}
      <section className="py-52 px-8">
        <div className="max-w-screen-xl mx-auto text-center mb-32">
            <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.5em] text-[#555] block mb-4">The Collection</motion.span>
            <motion.h2 style={{ y: textShift }} className="serif text-5xl md:text-7xl italic">Captured in Glass.</motion.h2>
        </div>
        
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p, i) => (
                <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 1 }}
                    className="group bg-white/[0.02] border border-white/5 p-12 hover:bg-white/[0.04] transition-all duration-1000"
                >
                    <div className="h-64 mb-12 flex justify-center items-center product-glow overflow-hidden">
                        <motion.img 
                            whileHover={{ scale: 1.12, rotate: -3 }}
                            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
                            src={p.img} 
                            className="h-full object-contain drop-shadow-xl" 
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