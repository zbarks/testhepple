import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

const Contact: React.FC = () => {
  const { scrollY } = useScroll();
  
  // -- REVERSED SCROLL DIRECTION MOTION LOGIC --
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 500
  });
  
  // Scroll DOWN (+) -> Text DOWN (+). Max 12px.
  const textShift = useTransform(smoothVelocity, [-2000, 2000], [-12, 12]);
  // ---------------------------------------------

  return (
    <div className="py-24 px-8 max-w-screen-md mx-auto">
      <header className="text-center mb-20 space-y-6">
        <motion.span style={{ y: textShift }} className="text-[10px] uppercase tracking-[0.5em] text-[#555] block">Communication</motion.span>
        <motion.h1 style={{ y: textShift }} className="serif text-6xl md:text-7xl">Inquiries</motion.h1>
        <motion.p style={{ y: textShift }} className="text-[#888] font-light">Join our story or request a stockist list.</motion.p>
      </header>

      <form className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-b border-white/10 py-4 focus-within:border-white transition-colors">
                <label className="text-[9px] uppercase tracking-widest text-[#555] block mb-2">Your Name</label>
                <input type="text" className="w-full bg-transparent border-none outline-none text-xl font-light" placeholder="Julian Hepple" />
            </div>
            <div className="border-b border-white/10 py-4 focus-within:border-white transition-colors">
                <label className="text-[9px] uppercase tracking-widest text-[#555] block mb-2">Email Address</label>
                <input type="email" className="w-full bg-transparent border-none outline-none text-xl font-light" placeholder="name@luxury.com" />
            </div>
        </div>
        
        <div className="border-b border-white/10 py-4 focus-within:border-white transition-colors">
            <label className="text-[9px] uppercase tracking-widest text-[#555] block mb-2">Subject</label>
            <select className="w-full bg-transparent border-none outline-none text-xl font-light text-[#555]">
                <option>General Inquiry</option>
                <option>Wholesale Opportunity</option>
                <option>Press & Media</option>
                <option>Cocktail Advice</option>
            </select>
        </div>

        <div className="border-b border-white/10 py-4 focus-within:border-white transition-colors">
            <label className="text-[9px] uppercase tracking-widest text-[#555] block mb-2">Message</label>
            <textarea className="w-full bg-transparent border-none outline-none text-xl font-light min-h-[150px] resize-none" placeholder="Your message..."></textarea>
        </div>

        <button type="button" className="w-full py-6 bg-white text-black text-xs uppercase tracking-[0.5em] font-bold hover:bg-[#c0c0c0] transition-colors">
            Send Message
        </button>
      </form>
      
      <div className="mt-32 text-center grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-12">
          <div>
              <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-widest text-[#444] block mb-4">Stockists</motion.span>
              <motion.p style={{ y: textShift }} className="text-sm text-[#888]">Find us at Liberty, Berry Bros & Rudd, and selected boutiques.</motion.p>
          </div>
          <div>
              <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-widest text-[#444] block mb-4">Mailing</motion.span>
              <motion.p style={{ y: textShift }} className="text-sm text-[#888]">Hepple Estate, Morpeth,<br/>Northumberland, NE65 7LH</motion.p>
          </div>
          <div>
              <motion.span style={{ y: textShift }} className="text-[9px] uppercase tracking-widest text-[#444] block mb-4">Press</motion.span>
              <motion.p style={{ y: textShift }} className="text-sm text-[#888]">For imagery and press packs:<br/>press@hepplespirits.com</motion.p>
          </div>
      </div>
    </div>
  );
};

export default Contact;