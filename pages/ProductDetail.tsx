import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';

const productData: Record<string, any> = {
  'hepple-gin': {
    name: 'Hepple Gin',
    price: '£38.00',
    tagline: 'High-Fidelity Modern Classic',
    description: 'A surgical reinvention. We use a three-stage distillation process—copper, vacuum, and CO2—to capture the bright, green, piney notes of fresh juniper that traditional methods simply leave behind.',
    botanicals: ['Italian Juniper', 'Estate Douglas Fir', 'Amalfi Lemon', 'Bog Myrtle', 'Lovage', 'Fennel Seed'],
    notes: {
        nose: 'Intense pine, bright citrus, and a subtle hum of white pepper.',
        palate: 'Silky and full. A wave of cool juniper freshness that feels like a moorland breeze.',
        finish: 'Exceptionally clean. No clutter, just the hum of the botanicals.'
    },
    cocktail: 'The Perfect Martini: 50ml Hepple Gin, 10ml Dry Vermouth. Stir with ice for exactly 30 seconds. Strain into a chilled glass. Garnish with a lemon twist and a quiet sense of accomplishment.',
    image: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png'
  },
  'douglas-fir-vodka': {
    name: 'Douglas Fir Vodka',
    price: '£34.00',
    tagline: 'The Zesty Forest Floor',
    description: 'A botanical vodka that transports you to our ancient pine forests. We hand-harvest the needles at their seasonal peak to capture citrus-like oils that are unexpectedly tropical.',
    botanicals: ['Douglas Fir Needles', 'Pure Northumberland Spring Water', 'Grain Spirit'],
    notes: {
        nose: 'Vivid lime zest and fresh pine needles. Invigorating.',
        palate: 'Bright and tropical. Subtle forest sweetness without the weight.',
        finish: 'Crisp. A palette cleanser for the soul.'
    },
    cocktail: 'The Fir & Tonic: 50ml Douglas Fir Vodka, premium tonic, plenty of ice. Garnish with pink grapefruit and a view of something green.',
    image: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png'
  },
  'sloe-hawthorn-gin': {
    name: 'Sloe & Hawthorn Gin',
    price: '£36.00',
    tagline: 'The Wild Hedgerow Harvest',
    description: 'A sophisticated take on a British tradition. We pair sun-ripened sloes with peppery hawthorn berries to create a sloe gin that is elegantly dry and unapologetically bold.',
    botanicals: ['Wild Sloes', 'Hawthorn Berries', 'Hepple Gin Base', 'Winter Spices'],
    notes: {
        nose: 'Almond and dark plum. The scent of a winter afternoon.',
        palate: 'Rich but balanced. Tart acidity met by an earthy, peppery dryness.',
        finish: 'Warming. Like a wool coat for your internal organs.'
    },
    cocktail: 'The Hepple Royale: 25ml Sloe & Hawthorn Gin topped with chilled Champagne. One for the thinkers.',
    image: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png'
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = productData[id || 'hepple-gin'];
  const { scrollY } = useScroll();
  
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 500
  });
  
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [-12, 12]);
  const bottleY = useTransform(scrollY, [0, 1000], [0, 80]);

  if (!product) return <div className="pt-32 text-center serif text-3xl">Spirits not found.</div>;

  return (
    <div className="py-24 px-8 max-w-screen-xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Link to="/collection" className="group inline-flex items-center text-[9px] uppercase tracking-[0.4em] text-[#555] hover:text-white transition-colors mb-16">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Range
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <div className="lg:sticky lg:top-32 bg-white/5 p-24 product-glow flex justify-center items-center min-h-[700px]">
            <motion.img 
              style={{ y: bottleY }}
              src={product.image} 
              className="max-h-[600px] object-contain drop-shadow-2xl" 
              alt={product.name} 
            />
          </div>

          <div className="space-y-20 py-12">
            <motion.header 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
            >
              <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.4em] text-[#6d7e6d] font-bold mb-6 block">{product.tagline}</motion.span>
              <motion.h1 style={{ y: textShift }} className="serif text-5xl md:text-8xl mb-8 leading-tight italic">{product.name}</motion.h1>
              <motion.p style={{ y: textShift }} className="text-2xl font-light text-[#888] mb-12">{product.price}</motion.p>
              <motion.p style={{ y: textShift }} className="text-[#aaa] text-xl leading-relaxed font-light border-l border-white/5 pl-8 italic">
                {product.description}
              </motion.p>
            </motion.header>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.h3 style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-10 border-b border-white/10 pb-4">Botanical Fidelity</motion.h3>
              <ul className="grid grid-cols-2 gap-6">
                {product.botanicals.map((b: string) => (
                  <motion.li key={b} style={{ y: textShift }} className="text-xs uppercase tracking-[0.2em] text-[#555] flex items-center hover:text-white transition-colors">
                    <span className="w-1 h-1 bg-[#2d3a2d] mr-4"></span> {b}
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] p-12 space-y-12 border border-white/5"
            >
              <motion.h3 style={{ y: textShift }} className="serif text-3xl italic text-center text-[#999]">Sense Analysis</motion.h3>
              <div className="grid grid-cols-1 gap-12">
                  <div className="group">
                      <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-[0.4em] text-[#444] block mb-4 group-hover:text-[#888] transition-colors">Aromatic</motion.span>
                      <motion.p style={{ y: textShift }} className="text-[#888] font-light text-lg leading-relaxed">{product.notes.nose}</motion.p>
                  </div>
                  <div className="group">
                      <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-[0.4em] text-[#444] block mb-4 group-hover:text-[#888] transition-colors">Structural</motion.span>
                      <motion.p style={{ y: textShift }} className="text-[#888] font-light text-lg leading-relaxed">{product.notes.palate}</motion.p>
                  </div>
                  <div className="group">
                      <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-[0.4em] text-[#444] block mb-4 group-hover:text-[#888] transition-colors">Resonant</motion.span>
                      <motion.p style={{ y: textShift }} className="text-[#888] font-light text-lg leading-relaxed">{product.notes.finish}</motion.p>
                  </div>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border border-white/5 p-12"
            >
              <motion.h3 style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-8">Service Intelligence</motion.h3>
              <motion.p style={{ y: textShift }} className="text-[#aaa] font-light leading-relaxed text-lg italic">
                  {product.cocktail}
              </motion.p>
            </motion.section>

            <div className="pt-12">
               <Link to={`/checkout/${id}`} className="group relative block w-full text-center py-7 bg-white overflow-hidden transition-all duration-700">
                 <span className="relative z-10 text-black text-xs uppercase tracking-[0.5em] font-bold group-hover:text-white transition-colors duration-500">Secure a Bottle</span>
                 <div className="absolute inset-0 bg-[#111] -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"></div>
               </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;