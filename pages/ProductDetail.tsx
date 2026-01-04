import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';

const productData: Record<string, any> = {
  'hepple-gin': {
    name: 'Hepple Gin',
    price: '£38.00',
    tagline: 'A High-Fidelity Modern Classic',
    description: 'Hepple Gin is the result of years of work to create a spirit that captures the true essence of a juniper bush. Unlike many gins that lose flavor during distillation, we use a three-stage process involving copper pot stills, vacuum distillation, and CO2 extraction to preserve the bright, green, and piney notes of fresh juniper.',
    botanicals: ['Italian Juniper', 'Estate Douglas Fir', 'Amalfi Lemon', 'Bog Myrtle', 'Lovage', 'Fennel Seed'],
    notes: {
        nose: 'Intense pine, bright citrus, and a hint of white pepper.',
        palate: 'Silky and full. A wave of cool juniper freshness followed by spicy, herbal depth.',
        finish: 'Exceptionally clean with a lingering botanical hum.'
    },
    cocktail: 'The Perfect Martini: 50ml Hepple Gin, 10ml Dry Vermouth. Stir with ice for 30 seconds. Strain into a chilled glass. Garnish with a twist of lemon.',
    image: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png'
  },
  'douglas-fir-vodka': {
    name: 'Douglas Fir Vodka',
    price: '£34.00',
    tagline: 'Zesty & Tropical Forest Essence',
    description: 'A botanical vodka that transports you to the ancient pine forests of Northumberland. We hand-harvest Douglas Fir needles at their seasonal peak to capture the unique, citrus-like oils that make this spirit truly tropical.',
    botanicals: ['Douglas Fir Needles', 'Pure Northumberland Spring Water', 'Grain Spirit'],
    notes: {
        nose: 'Vivid grapefruit and lime zest with a cooling evergreen undertone.',
        palate: 'Bright, tropical, and refreshing. Subtle sweetness of the forest floor.',
        finish: 'Crisp and invigorating.'
    },
    cocktail: 'Fir & Tonic: 50ml Douglas Fir Vodka, premium tonic water, plenty of ice, and a slice of pink grapefruit.',
    image: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png'
  },
  'sloe-hawthorn-gin': {
    name: 'Sloe & Hawthorn Gin',
    price: '£36.00',
    tagline: 'The Wild Hedgerow Harvest',
    description: 'A sophisticated take on a British classic. We combine sun-ripened sloes with peppery hawthorn berries to create a sloe gin that is rich, balanced, and elegantly dry.',
    botanicals: ['Wild Sloes', 'Hawthorn Berries', 'Hepple Gin Base', 'Winter Spices'],
    notes: {
        nose: 'Almond, dark plum, and forest fruits with a hint of cinnamon.',
        palate: 'Rich and velvety. Tart acidity balanced by earthy, peppery dryness.',
        finish: 'Long, warming, and remarkably dry.'
    },
    cocktail: 'Hepple Royale: 25ml Sloe & Hawthorn Gin, topped with chilled Champagne. Garnish with a fresh raspberry.',
    image: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png'
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = productData[id || 'hepple-gin'];
  const { scrollY } = useScroll();
  
  // -- CORRECTED SCROLL DIRECTION MOTION LOGIC --
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 500
  });
  // Scroll DOWN (+) -> Text UP (-). Max 12px.
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [12, -12]);
  // ---------------------------------------------

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
              <motion.h3 style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-10 border-b border-white/10 pb-4">Botanical Profile</motion.h3>
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
              <motion.h3 style={{ y: textShift }} className="serif text-3xl italic text-center text-[#999]">Tasting Notes</motion.h3>
              <div className="grid grid-cols-1 gap-12">
                  <div className="group">
                      <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-[0.4em] text-[#444] block mb-4 group-hover:text-[#888] transition-colors">The Nose</motion.span>
                      <motion.p style={{ y: textShift }} className="text-[#888] font-light text-lg leading-relaxed">{product.notes.nose}</motion.p>
                  </div>
                  <div className="group">
                      <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-[0.4em] text-[#444] block mb-4 group-hover:text-[#888] transition-colors">The Palate</motion.span>
                      <motion.p style={{ y: textShift }} className="text-[#888] font-light text-lg leading-relaxed">{product.notes.palate}</motion.p>
                  </div>
                  <div className="group">
                      <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-[0.4em] text-[#444] block mb-4 group-hover:text-[#888] transition-colors">The Finish</motion.span>
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
              <motion.h3 style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-8">Service Suggestion</motion.h3>
              <motion.p style={{ y: textShift }} className="text-[#aaa] font-light leading-relaxed text-lg italic">
                  {product.cocktail}
              </motion.p>
            </motion.section>

            <div className="pt-12">
               <Link to={`/checkout/${id}`} className="group relative block w-full text-center py-7 bg-white overflow-hidden transition-all duration-700">
                 <span className="relative z-10 text-black text-xs uppercase tracking-[0.5em] font-bold group-hover:text-white transition-colors duration-500">Purchase Now</span>
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