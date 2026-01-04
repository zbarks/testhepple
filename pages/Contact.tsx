import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="py-24 px-8 max-w-screen-md mx-auto fade-up">
      <header className="text-center mb-20 space-y-6">
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#555]">Communication</span>
        <h1 className="serif text-6xl md:text-7xl">Inquiries</h1>
        <p className="text-[#888] font-light">Join our story or request a stockist list.</p>
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
              <span className="text-[9px] uppercase tracking-widest text-[#444] block mb-4">Stockists</span>
              <p className="text-sm text-[#888]">Find us at Liberty, Berry Bros & Rudd, and selected boutiques.</p>
          </div>
          <div>
              <span className="text-[9px] uppercase tracking-widest text-[#444] block mb-4">Mailing</span>
              <p className="text-sm text-[#888]">Hepple Estate, Morpeth,<br/>Northumberland, NE65 7LH</p>
          </div>
          <div>
              <span className="text-[9px] uppercase tracking-widest text-[#444] block mb-4">Press</span>
              <p className="text-sm text-[#888]">For imagery and press packs:<br/>press@hepplespirits.com</p>
          </div>
      </div>
    </div>
  );
};

export default Contact;