import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-700 glass-nav">
      <div className="max-w-screen-2xl mx-auto px-10 py-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-[0.4em] serif uppercase text-white hover:italic transition-all duration-700 group">
          H<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700">epple</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-16">
          {[
            { name: 'Collection', path: '/collection' },
            { name: 'The Story', path: '/about' },
            { name: 'Inquiries', path: '/contact' },
            { name: 'Intel', path: '/analytics' } // Added subtle dashboard link
          ].map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[9px] uppercase tracking-[0.3em] font-semibold transition-all duration-700 nav-link-effect ${
                isActive(link.path) ? 'text-white italic underline underline-offset-8 decoration-white/30' : 'text-[#777] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link to="/collection" className="group relative bg-white text-black px-8 py-3 text-[10px] uppercase font-bold tracking-[0.2em] overflow-hidden transition-all duration-700">
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">Shop</span>
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"></div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;