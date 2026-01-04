import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="py-24 px-8 max-w-screen-2xl mx-auto">
      <header className="mb-32 text-center fade-up">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#555] mb-6 block">The Distillery Range</span>
        <h1 className="serif text-6xl md:text-8xl italic">Distilled Excellence</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-32">
        {products.map((product) => (
          <div key={product.id} className="group fade-up">
            <div className="aspect-[4/5] bg-white/5 p-12 mb-10 flex justify-center items-center relative overflow-hidden transition-all duration-700 hover:bg-white/[0.08]">
              <img 
                src={product.image} 
                className="h-full object-contain transform group-hover:scale-105 transition-transform duration-1000" 
                alt={product.name} 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                 <Link to={`/product/${product.id}`} className="bg-white text-black px-8 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-[#c0c0c0]">
                    View Details
                 </Link>
              </div>
            </div>
            
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="serif text-3xl mb-2">{product.name}</h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#6d7e6d] font-bold">{product.tagline}</p>
                </div>
                <span className="text-sm font-light text-[#888]">{product.price}</span>
            </div>
            
            <p className="text-[#777] font-light text-sm leading-relaxed mb-8 max-w-sm">
                {product.description}
            </p>
            
            <div className="flex space-x-4">
                <Link to={`/checkout/${product.id}`} className="flex-1 text-center py-4 bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all">
                    Add to Collection
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;