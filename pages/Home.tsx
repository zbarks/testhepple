import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

// Decorative 3D elements that drift in the background/foreground
const FloatingBotanicals = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Science/Lab Element */}
      <motion.div 
        style={{ y: y1, rotate, opacity: 0.1 }}
        className="absolute top-[20%] -left-20 w-96 h-96 border border-white rounded-full flex items-center justify-center"
      >
        <div className="w-[1px] h-full bg-white/20 rotate-45"></div>
      </motion.div>
      
      {/* Wild Element - Blurred Greenery */}
      <motion.div 
        style={{ y: y2, x: 100 }}
        className="absolute top-[60%] -right-40 w-[500px] h-[500px] bg-[#2d3a2d]/20 blur-[120px] rounded-full"
      />
      
      {/* Shimmering Particle */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[40%] left-[30%] w-[1px] h-40 bg-gradient-to-b from-transparent via-white/40 to-transparent"
      />
    </div>
  );
};

const Home: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Dynamic skew/tilt based on scroll speed
  const skew = useTransform(smoothVelocity, [-2000, 2000], [-2, 2]);
  const scale = useTransform(smoothVelocity, [-2000, 2000], [0.98, 1.02]);

  const products = [
    { 
      name: 'Hepple Gin', 
      tag: 'Phase 01: The Heart', 
      img: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png', 
      id: 'hepple-gin'
    },
    { 
      name: 'Douglas Fir', 
      tag: 'Phase 02: Extraction', 
      img: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png', 
      id: 'douglas-fir-vodka'
    },
    { 
      name: 'Sloe & Hawthorn', 
      tag: 'Phase 03: Resonance', 
      img: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png', 
      id: 'sloe-hawthorn-gin'
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0d0d0d]">
      <FloatingBotanicals />

      {/* Hero Section with 3D Depth */}
      <section className="relative h-[120vh] flex items-center justify-center perspective-container overflow-hidden">
        <motion.div 
          style={{ skewY: skew, scale }}
          className="relative z-10 text-center space-y-12 px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#6d7e6d] font-bold block mb-8">
              Northumberland • High Fidelity
            </span>
            <h1 className="text-7xl md:text-[13rem] serif leading-[0.85] italic tracking-tighter text-white">
              The Wild,<br/>Refined.
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="editorial-line"></div>
            <Link to="/collection" className="group relative inline-block px-12 py-5 border border-white/10 overflow-hidden">
              <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-black transition-colors duration-500">
                Explore the Range
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.2, 0, 0, 1]"></div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Ambient background image with depth scroll */}
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 1000], [0, 200]), scale: 1.1 }}
          className="absolute inset-0 z-0 opacity-30 grayscale"
        >
          <img 
            src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" 
            className="w-full h-full object-cover"
            alt=""
          />
        </motion.div>
      </section>

      {/* 3D Content Section: The Philosophy */}
      <section className="py-60 px-8 relative z-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
            className="space-y-10"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#555] block">01 / The Ethos</span>
            <h2 className="serif text-5xl md:text-7xl italic leading-tight">A Surgical Pursuit of Nature.</h2>
            <p className="text-xl text-[#888] font-light leading-relaxed max-w-lg italic">
              "We don't just distill; we capture the fleeting vibration of the landscape. Using triple-distillation methods, we preserve the green heart of the moorland."
            </p>
            <div className="pt-8">
                <Link to="/about" className="text-[10px] uppercase tracking-widest border-b border-white/20 pb-2 hover:border-white transition-all">Our Science</Link>
            </div>
          </motion.div>

          <motion.div 
            style={{ rotateY: 15, perspective: 1000 }}
            whileInView={{ rotateY: 0 }}
            transition={{ duration: 2, ease: [0.2, 0, 0, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-white/5 relative overflow-hidden group">
              <img 
                src="https://i.postimg.cc/dtvXkXvX/Hepple-1080x1080-ad-12.png" 
                className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-[3s] group-hover:scale-110"
                alt="Wild Botanicals"
              />
              <div className="absolute inset-0 border-[40px] border-[#0d0d0d] pointer-events-none"></div>
            </div>
            {/* Floating 3D Caption */}
            <motion.div 
              style={{ y: useTransform(scrollY, [800, 1500], [50, -50]) }}
              className="absolute -bottom-10 -right-10 bg-white text-black p-10 hidden lg:block shadow-2xl"
            >
                <p className="serif text-2xl italic tracking-tight">The Juniper Grove.</p>
                <span className="text-[9px] uppercase tracking-widest mt-2 block opacity-50">Hepple Estate, 2024</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D Product Carousel */}
      <section className="py-60 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
            <div className="mb-32 flex justify-between items-end">
                <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#555]">02 / The Collection</span>
                    <h2 className="serif text-6xl italic">Selected Spirits.</h2>
                </div>
                <Link to="/collection" className="hidden md:block text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-2">View Entire Range</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                {products.map((p, i) => (
                    <motion.div 
                        key={p.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className="group flex flex-col items-center text-center space-y-12"
                    >
                        <div className="relative aspect-[3/4] w-full bg-white/[0.02] flex items-center justify-center p-12 overflow-hidden product-glow">
                            <motion.img 
                                whileHover={{ scale: 1.1, rotateY: 20, rotateX: -10 }}
                                transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
                                src={p.img} 
                                className="h-[80%] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]" 
                                alt={p.name} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <Link 
                                to={`/product/${p.id}`}
                                className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-4 text-[9px] uppercase font-bold tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                            >
                                Details
                            </Link>
                        </div>
                        <div className="space-y-4">
                            <span className="text-[9px] uppercase tracking-[0.4em] text-[#6d7e6d] font-bold">{p.tag}</span>
                            <h3 className="serif text-3xl italic">{p.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Closing Call to Action with 3D Depth */}
      <section className="h-screen relative flex items-center justify-center">
         <motion.div 
            style={{ y: useTransform(scrollY, [2500, 4000], [100, -100]) }}
            className="text-center relative z-10"
         >
            <h2 className="serif text-5xl md:text-9xl italic mb-16">Enter the Manor.</h2>
            <Link to="/contact" className="text-[10px] uppercase tracking-[0.5em] font-bold border border-white/20 px-16 py-8 hover:bg-white hover:text-black transition-all duration-700">
                Book a Visit
            </Link>
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      </section>
    </div>
  );
};

export default Home;