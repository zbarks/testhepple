import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="animate-in">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/Wz0BLcVD/Hepple-1200x200-ad-15-(1).png" 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt="Northumberland Landscape"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl fade-up">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#c0c0c0] mb-8 block">Distilled in the Wild</span>
          <h1 className="text-5xl md:text-8xl serif mb-12 italic leading-tight">
            Nature, Refined.
          </h1>
          <Link to="/collection" className="inline-block px-12 py-5 border border-white/20 hover:bg-white hover:text-black transition-all duration-700 text-[10px] uppercase tracking-[0.4em] font-bold">
            Explore the Collection
          </Link>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
            <div className="editorial-line"></div>
        </div>
      </section>

      {/* Intro Editorial */}
      <section className="py-40 px-8">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#555] mb-6 block">Our Home</span>
                <h2 className="serif text-4xl md:text-5xl mb-10 italic">Provenance at its purest.</h2>
                <p className="text-[#888] text-lg leading-[1.8] font-light mb-8">
                    Hepple is more than a name; it is a location. Nestled in the remote moors of Northumberland, our distillery is surrounded by the very botanicals that define our spirits.
                </p>
                <Link to="/about" className="text-[10px] uppercase tracking-widest border-b border-white/20 pb-2 hover:border-white transition-all">The Hepple Heritage</Link>
            </div>
            <div className="relative group overflow-hidden">
                <img src="https://i.postimg.cc/dtvXkXvX/Hepple-1080x1080-ad-12.png" className="w-full grayscale brightness-75 group-hover:scale-105 transition-transform duration-[2s]" alt="Wild Botanicals" />
                <div className="absolute inset-0 border-[20px] border-[#0d0d0d] pointer-events-none"></div>
            </div>
        </div>
      </section>

      {/* Range Highlights */}
      <section className="bg-[#0a0a0a] py-40 px-8">
        <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-24">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#555] mb-4 block">Selected Works</span>
                <h2 className="serif text-5xl">The Award Winners</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { 
                        name: 'Hepple Gin', 
                        tag: 'Modern Classic', 
                        img: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png', 
                        id: 'hepple-gin' 
                    },
                    { 
                        name: 'Douglas Fir Vodka', 
                        tag: 'Zesty & Tropical', 
                        img: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png', 
                        id: 'douglas-fir-vodka' 
                    },
                    { 
                        name: 'Sloe & Hawthorn', 
                        tag: 'Juicy & Peppery', 
                        img: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png', 
                        id: 'sloe-hawthorn-gin' 
                    }
                ].map(item => (
                    <Link key={item.id} to={`/product/${item.id}`} className="group block text-center">
                        <div className="bg-[#0d0d0d] p-12 mb-8 product-glow relative overflow-hidden flex justify-center items-center h-[500px]">
                            <img src={item.img} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                        </div>
                        <h3 className="serif text-2xl mb-2 group-hover:italic transition-all">{item.name}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#555]">{item.tag}</p>
                    </Link>
                ))}
            </div>
            
            <div className="text-center mt-24">
                <Link to="/collection" className="bg-white text-black px-12 py-5 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-[#c0c0c0] transition-colors">
                    View Entire Range
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;