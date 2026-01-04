import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-24 px-8 mt-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="serif text-3xl mb-8">Hepple Spirits</h2>
          <p className="text-[#666] max-w-sm text-sm leading-relaxed mb-8">
            Crafted in the wild heart of Northumberland. Every bottle is a signature of the landscape, born from patience and pioneering distillation.
          </p>
          <div className="flex space-x-6 text-[10px] uppercase tracking-widest text-[#444]">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white mb-6">Explore</h4>
          <ul className="space-y-3 text-sm text-[#555]">
            <li><Link to="/collection" className="hover:text-white transition-colors">The Range</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Stockists</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white mb-6">Contact</h4>
          <address className="not-italic text-sm text-[#555] leading-relaxed">
            Hepple Estate<br />
            Morpeth, Northumberland<br />
            NE65 7LH, UK
          </address>
        </div>
      </div>
      
      <div className="max-w-screen-xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-[#333]">
        <p>© 2024 Hepple Spirits. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Please enjoy responsibly.</p>
      </div>
    </footer>
  );
};

export default Footer;