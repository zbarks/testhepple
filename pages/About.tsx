import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

const About: React.FC = () => {
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
    <div className="py-24">
      <div className="max-w-screen-md mx-auto px-8 text-center space-y-12">
        <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.5em] text-[#555] block">Our Philosophy</motion.span>
        <motion.h1 style={{ y: textShift }} className="serif text-6xl md:text-8xl italic">Distilling the Landscape.</motion.h1>
        <motion.p style={{ y: textShift }} className="text-xl text-[#aaa] font-light leading-relaxed">
            In the remote North of England, where the elements are at their most vibrant, we found our inspiration. Hepple is not just a brand; it is an experiment in capturing the impossible.
        </motion.p>
      </div>

      <section className="mt-40 px-8 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="relative aspect-square">
            <img src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" className="w-full h-full object-cover grayscale brightness-50" alt="Hepple Estate" />
            <div className="absolute inset-0 border-[30px] border-[#0d0d0d]"></div>
        </div>
        <div className="space-y-8">
            <motion.h2 style={{ y: textShift }} className="serif text-4xl italic">The Estate Heritage</motion.h2>
            <motion.p style={{ y: textShift }} className="text-[#888] leading-relaxed font-light">
                The Hepple Estate has been a bastion of wild nature for centuries. Situated 250m above sea level, the climate creates botanicals of unparalleled intensity. Here, the juniper grows wild, and the Douglas Fir stands tall against the Northumberland winds.
            </motion.p>
            <motion.p style={{ y: textShift }} className="text-[#888] leading-relaxed font-light">
                Our founders—a master distiller, a chef, and a forager—came together with one goal: to translate this raw beauty into a spirit that tastes of the moment it was picked.
            </motion.p>
        </div>
      </section>

      <section className="mt-40 bg-white/5 py-32 px-8">
        <div className="max-w-screen-lg mx-auto text-center space-y-16">
            <motion.h2 style={{ y: textShift }} className="serif text-5xl">Triple-Distillation Artistry</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <motion.h4 style={{ y: textShift }} className="serif text-2xl mb-4 italic">Copper Pot</motion.h4>
                    <motion.p style={{ y: textShift }} className="text-xs text-[#666] uppercase tracking-widest leading-relaxed">The classical heart. Richness and traditional depth created in our bespoke copper stills.</motion.p>
                </div>
                <div>
                    <motion.h4 style={{ y: textShift }} className="serif text-2xl mb-4 italic">Vacuum</motion.h4>
                    <motion.p style={{ y: textShift }} className="text-xs text-[#666] uppercase tracking-widest leading-relaxed">Capturing the fleeting. Low-temperature distillation preserves delicate aromatic botanical oils.</motion.p>
                </div>
                <div>
                    <motion.h4 style={{ y: textShift }} className="serif text-2xl mb-4 italic">CO2 Extraction</motion.h4>
                    <motion.p style={{ y: textShift }} className="text-xs text-[#666] uppercase tracking-widest leading-relaxed">Purity of essence. A pioneering technique used to extract the high-fidelity resins of juniper.</motion.p>
                </div>
            </div>
        </div>
      </section>

      <section className="mt-40 text-center px-8">
        <div className="editorial-line mx-auto mb-12"></div>
        <motion.p style={{ y: textShift }} className="serif text-3xl italic text-[#555] max-w-2xl mx-auto">
            "A bottle of Hepple is a direct link to the moors. It is the taste of the wild, captured forever."
        </motion.p>
      </section>
    </div>
  );
};

export default About;