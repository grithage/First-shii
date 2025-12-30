
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-black transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          {product.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          <p className="font-black text-lg">${product.price.toFixed(2)}</p>
        </div>
        
        <p className="text-zinc-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-zinc-400">
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-amber-500"></i>
            <span className="text-zinc-900">{product.rating}</span>
          </div>
          <span>•</span>
          <span>{product.reviews} REVIEWS</span>
        </div>

        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          ADD TO GEAR
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
