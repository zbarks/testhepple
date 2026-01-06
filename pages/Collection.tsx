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
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 500 });
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [-12, 12]);

  return (
    <div className="py-24 px-8 max-w-screen-2xl mx-auto bg-[#0d0d0d]">
      <header className="mb-40 text-center">
        <motion.span 
          style={{ y: textShift }}
          className="text-[10px] uppercase tracking-[0.5em] text-[#555] mb-8 block"
        >
          Intelligence of the Land
        </motion.span>
        <motion.h1 
          style={{ y: textShift }}
          className="serif text-7xl md:text-[10rem] italic leading-none tracking-tight"
        >
          The Range
        </motion.h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-32">
        {products.map((product, index) => (
          <motion.div 
            key={product.id} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: index * 0.2, ease: [0.2, 0, 0, 1] }}
            className="group"
          >
            <div className="perspective-container aspect-[3/4] bg-white/[0.02] border border-white/5 mb-12 flex justify-center items-center relative overflow-hidden transition-all duration-1000 group-hover:bg-white/[0.06] group-hover:border-white/10">
              <motion.img 
                whileHover={{ rotateY: 15, rotateX: -5, scale: 1.05, z: 50 }}
                transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
                src={product.image} 
                className="h-3/4 object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]" 
                alt={product.name} 
              />
              <div className="absolute bottom-10 left-0 w-full px-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                 <Link to={`/product/${product.id}`} className="block bg-white text-black py-5 text-[10px] uppercase font-bold tracking-[0.3em] text-center hover:bg-[#e5e5e5] transition-colors">
                    View Fidelity
                 </Link>
              </div>
            </div>
            
            <div className="space-y-4 px-2">
                <div className="flex justify-between items-baseline">
                    <motion.h2 style={{ y: textShift }} className="serif text-3xl group-hover:italic transition-all duration-700">{product.name}</motion.h2>
                    <motion.span style={{ y: textShift }} className="text-xs font-light text-[#555]">{product.price}</motion.span>
                </div>
                <motion.p style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.2em] text-[#6d7e6d] font-bold">{product.tagline}</motion.p>
                <motion.p style={{ y: textShift }} className="text-[#666] font-light text-base leading-relaxed line-clamp-2 italic">
                    {product.description}
                </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collection;