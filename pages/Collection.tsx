import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

const products = [
  {
    id: 'hepple-gin',
    name: 'HEPPLE GIN',
    tagline: 'The Pursuit of Freshness',
    description: 'An intense yet elegant reinvention of a classic gin, elevated through our use of botanicals picked fresh from our home.',
    price: '£38.00',
    image: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png'
  },
  {
    id: 'douglas-fir-vodka',
    name: 'HEPPLE DOUGLAS FIR VODKA',
    tagline: 'Zesty, Refreshing and Tropical',
    description: 'Transport yourself to our ancient pine forests through our hand-harvested Douglas fir needles.',
    price: '£34.00',
    image: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png'
  },
  {
    id: 'sloe-hawthorn-gin',
    name: 'HEPPLE SLOE & HAWTHORN GIN',
    tagline: 'Juicy, Peppery and Distinctly Drier',
    description: 'As beloved by bartenders in a summer cocktail as by Sloe Gin purists to sip on a cold winter’s day.',
    price: '£36.00',
    image: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png'
  }
];

const Collection: React.FC = () => {
  const { scrollY } = useScroll();
  
  // -- SCROLL DIRECTION MOTION LOGIC --
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const textShift = useTransform(smoothVelocity, [-3000, 3000], [15, -15]);
  // -----------------------------------

  return (
    <div className="py-24 px-8 max-w-screen-2xl mx-auto">
      <header className="mb-40 text-center">
        <motion.span 
          style={{ y: textShift }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-[#555] mb-6 block"
        >
          The Distillery Range
        </motion.span>
        <motion.h1 
          style={{ y: textShift }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
          className="serif text-7xl md:text-9xl italic"
        >
          Distilled Excellence
        </motion.h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-32">
        {products.map((product, index) => (
          <motion.div 
            key={product.id} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: index * 0.15, ease: [0.2, 0, 0, 1] }}
            className="group"
          >
            <div className="aspect-[4/5] bg-white/5 p-16 mb-12 flex justify-center items-center relative overflow-hidden transition-all duration-1000 group-hover:bg-white/[0.08]">
              <motion.img 
                whileHover={{ scale: 1.08, rotate: -2 }}
                transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
                src={product.image} 
                className="h-full object-contain drop-shadow-2xl" 
                alt={product.name} 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-black/10 backdrop-blur-[1px]">
                 <Link to={`/product/${product.id}`} className="bg-white text-black px-10 py-5 text-[10px] uppercase font-bold tracking-[0.3em] shadow-xl hover:scale-105 transition-transform duration-500">
                    View Details
                 </Link>
              </div>
            </div>
            
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                    <motion.h2 style={{ y: textShift }} className="serif text-3xl group-hover:italic transition-all duration-500">{product.name}</motion.h2>
                    <motion.p style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.2em] text-[#6d7e6d] font-bold">{product.tagline}</motion.p>
                </div>
                <motion.span style={{ y: textShift }} className="text-sm font-light text-[#555] italic">{product.price}</motion.span>
            </div>
            
            <motion.p style={{ y: textShift }} className="text-[#777] font-light text-base leading-relaxed mb-10 max-w-sm">
                {product.description}
            </motion.p>
            
            <Link to={`/checkout/${product.id}`} className="relative block w-full text-center py-5 border border-white/10 group-hover:border-white/30 overflow-hidden transition-all duration-700">
                <span className="relative z-10 text-[9px] uppercase tracking-[0.4em] font-bold group-hover:text-black transition-colors duration-500">Add to Collection</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collection;