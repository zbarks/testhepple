import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const { scrollY } = useScroll();
  
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 500
  });
  
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [-12, 12]);

  return (
    <div className="py-24">
      <div className="max-w-screen-md mx-auto px-8 text-center space-y-12">
        <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.5em] text-[#555] block">Hepple House</motion.span>
        <motion.h1 style={{ y: textShift }} className="serif text-6xl md:text-8xl italic">The Wild, Refined.</motion.h1>
        <motion.p style={{ y: textShift }} className="text-xl text-[#aaa] font-light leading-relaxed">
            Hepple is an experiment in capturing the impossible. Born in the wild moors of Northumberland, our distillery is a house of open doors and precise boundaries.
        </motion.p>
      </div>

      <section className="mt-40 px-8 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="relative aspect-square">
            <img src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" className="w-full h-full object-cover grayscale brightness-50" alt="The Estate" />
            <div className="absolute inset-0 border-[30px] border-[#0d0d0d]"></div>
        </div>
        <div className="space-y-8">
            <motion.h2 style={{ y: textShift }} className="serif text-4xl italic">The Wild Host</motion.h2>
            <motion.p style={{ y: textShift }} className="text-[#888] leading-relaxed font-light">
                Our home is the Hepple Estate, a place of intense silence and sudden, explosive growth. We don't tame the landscape; we host it. We translate the raw beauty of the moors into spirits that taste of the moment they were picked.
            </motion.p>
            <motion.p style={{ y: textShift }} className="text-[#888] leading-relaxed font-light">
                Founded by a master distiller, a chef, and a forager, our collective is built on creative confidence and a quiet obsession with fidelity.
            </motion.p>
        </div>
      </section>

      <section className="mt-40 bg-white/5 py-32 px-8">
        <div className="max-w-screen-lg mx-auto text-center space-y-16">
            <motion.h2 style={{ y: textShift }} className="serif text-5xl italic">Modern British Craft</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <motion.h4 style={{ y: textShift }} className="serif text-2xl mb-4 italic">Copper Heart</motion.h4>
                    <motion.p style={{ y: textShift }} className="text-xs text-[#666] uppercase tracking-widest leading-relaxed">Classical copper pot distillation provides the soul—rich, traditional, and grounded.</motion.p>
                </div>
                <div>
                    <motion.h4 style={{ y: textShift }} className="serif text-2xl mb-4 italic">Vacuum Chill</motion.h4>
                    <motion.p style={{ y: textShift }} className="text-xs text-[#666] uppercase tracking-widest leading-relaxed">Low-temperature distillation captures the fleeting, delicate notes of fresh green juniper.</motion.p>
                </div>
                <div>
                    <motion.h4 style={{ y: textShift }} className="serif text-2xl mb-4 italic">CO2 Purity</motion.h4>
                    <motion.p style={{ y: textShift }} className="text-xs text-[#666] uppercase tracking-widest leading-relaxed">Surgical extraction techniques reveal the high-fidelity resins of the wild forest.</motion.p>
                </div>
            </div>
        </div>
      </section>

      <section className="mt-40 text-center px-8">
        <div className="editorial-line mx-auto mb-12"></div>
        <motion.p style={{ y: textShift }} className="serif text-3xl italic text-[#555] max-w-2xl mx-auto">
            "We are not here to over-polish the wild. We are here to listen to it with absolute precision."
        </motion.p>
      </section>
    </div>
  );
};

export default About;