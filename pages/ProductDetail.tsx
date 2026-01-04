import React from 'react';
import { useParams, Link } from 'react-router-dom';

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

  if (!product) return <div className="pt-32 text-center serif text-3xl">Spirits not found.</div>;

  return (
    <div className="py-24 px-8 max-w-screen-xl mx-auto fade-up">
      <Link to="/collection" className="text-[9px] uppercase tracking-[0.4em] text-[#555] hover:text-white transition-colors mb-16 inline-block">← Back to Range</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="lg:sticky lg:top-32 bg-white/5 p-20 product-glow">
          <img src={product.image} className="w-full h-[600px] object-contain" alt={product.name} />
        </div>

        <div className="space-y-16">
          <header>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#6d7e6d] font-bold mb-4 block">{product.tagline}</span>
            <h1 className="serif text-5xl md:text-7xl mb-6">{product.name}</h1>
            <p className="text-2xl font-light text-[#888] mb-10">{product.price}</p>
            <p className="text-[#aaa] text-lg leading-relaxed font-light italic">
              {product.description}
            </p>
          </header>

          <section>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-8 border-b border-white/10 pb-4">Botanical Profile</h3>
            <ul className="grid grid-cols-2 gap-4">
              {product.botanicals.map((b: string) => (
                <li key={b} className="text-xs uppercase tracking-widest text-[#666] flex items-center">
                  <span className="w-1 h-1 bg-[#2d3a2d] mr-3"></span> {b}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white/[0.03] p-10 space-y-10">
            <h3 className="serif text-2xl italic text-center">Tasting Notes</h3>
            <div className="grid grid-cols-1 gap-10">
                <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#555] block mb-2">The Nose</span>
                    <p className="text-[#888] font-light">{product.notes.nose}</p>
                </div>
                <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#555] block mb-2">The Palate</span>
                    <p className="text-[#888] font-light">{product.notes.palate}</p>
                </div>
                <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#555] block mb-2">The Finish</span>
                    <p className="text-[#888] font-light">{product.notes.finish}</p>
                </div>
            </div>
          </section>

          <section className="border border-white/10 p-10">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-6">Service Suggestion</h3>
            <p className="text-[#aaa] font-light leading-relaxed">
                {product.cocktail}
            </p>
          </section>

          <div className="pt-8">
             <Link to={`/checkout/${id}`} className="block w-full text-center py-6 bg-white text-black text-xs uppercase tracking-[0.4em] font-bold hover:bg-[#c0c0c0] transition-colors">
               Purchase Now
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;