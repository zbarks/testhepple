import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500 glass-nav">
      <div className="max-w-screen-2xl mx-auto px-8 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-[0.3em] serif uppercase text-white hover:opacity-70 transition-opacity">
          Hepple
        </Link>
        
        <div className="hidden md:flex items-center space-x-12">
          {[
            { name: 'Collection', path: '/collection' },
            { name: 'The Story', path: '/about' },
            { name: 'Inquiries', path: '/contact' }
          ].map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                isActive(link.path) ? 'text-white border-b border-white pb-1' : 'text-[#888] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link to="/collection" className="bg-white text-black px-6 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-[#c0c0c0] transition-colors">
          Shop
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;