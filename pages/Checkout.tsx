import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const products: Record<string, any> = {
  'hepple-gin': { name: 'Hepple Gin', price: 38.00, img: 'https://i.postimg.cc/t4z9nPLF/Untitleddesign-Photoroom.png' },
  'douglas-fir-vodka': { name: 'Douglas Fir Vodka', price: 34.00, img: 'https://i.postimg.cc/SsSqGsbr/Generated-Image-January-04-2026-8-39PM-Photoroom.png' },
  'sloe-hawthorn-gin': { name: 'Sloe & Hawthorn Gin', price: 36.00, img: 'https://i.postimg.cc/QMjv2yYK/Untitled-design-3-Photoroom.png' }
};

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products[id || 'hepple-gin'];
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const total = (product.price * quantity).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-40 px-8 text-center fade-up">
        <h1 className="serif text-6xl mb-8 italic">Thank You.</h1>
        <p className="text-[#888] mb-12 max-w-md mx-auto">Your order for {quantity}x {product.name} has been received. A confirmation will follow shortly.</p>
        <Link to="/" className="text-[10px] uppercase tracking-widest border-b border-white/20 pb-2">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="py-24 px-8 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 fade-up">
      <div>
        <h2 className="serif text-4xl mb-12 italic">Your Selection</h2>
        <div className="bg-white/5 p-12 flex items-center space-x-8 mb-12">
            <img src={product.img} className="h-40 object-contain" alt={product.name} />
            <div>
                <h3 className="serif text-2xl">{product.name}</h3>
                <p className="text-sm text-[#555] uppercase tracking-widest mt-2">£{product.price.toFixed(2)} per unit</p>
                <div className="mt-6 flex items-center space-x-4">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 border border-white/10 hover:bg-white/10">-</button>
                    <span className="text-lg font-light">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 border border-white/10 hover:bg-white/10">+</button>
                </div>
            </div>
        </div>
        
        <div className="flex justify-between items-end border-t border-white/10 pt-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#555]">Subtotal</span>
            <span className="serif text-3xl">£{total}</span>
        </div>
      </div>

      <div className="bg-[#0a0a0a] p-12">
        <h2 className="serif text-4xl mb-12 italic">Billing Details</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-[#555]">Full Name</label>
            <input required type="text" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors font-light" placeholder="Alexander Hepple" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-[#555]">Email Address</label>
            <input required type="email" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors font-light" placeholder="alex@domain.com" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-[#555]">Shipping Address</label>
            <input required type="text" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors font-light" placeholder="Street Name, City" />
          </div>
          
          <div className="pt-8">
            <button type="submit" className="w-full py-6 bg-white text-black text-xs uppercase tracking-[0.5em] font-bold hover:bg-[#c0c0c0] transition-colors">
                Complete Purchase
            </button>
          </div>
          
          <p className="text-[9px] uppercase tracking-widest text-[#333] text-center mt-6">
            Secure checkout. All transactions are encrypted.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Checkout;