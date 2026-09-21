import { useState } from 'react';
import { X, Star, ShoppingBag, Check, Shield, Sparkles } from 'lucide-react';
import { Product, ColorOption } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ColorOption, size: string) => void;
}

export function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div 
      id="quick-view-backdrop" 
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div 
        id="quick-view-modal-content" 
        className="relative w-full max-w-3xl bg-white border-2 border-amber-300 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Yellow top accent bar */}
        <div className="h-2 w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />

        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-100 hover:bg-yellow-300 text-neutral-600 hover:text-neutral-950 transition-colors shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Visual */}
          <div className="relative p-8 bg-gradient-to-br from-yellow-50/60 via-amber-50/40 to-white flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
              <img
                src={selectedColor.image}
                alt={product.name}
                className="max-h-72 w-auto object-contain drop-shadow-sm select-none"
              />
            </div>

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-yellow-400 text-neutral-950 border border-amber-400 shadow-2xs">
                <Sparkles className="w-3 h-3 fill-amber-500 text-amber-700" />
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Column: Information & Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-neutral-900 text-[11px] font-bold uppercase tracking-wider border border-yellow-300">
                  {product.category === 'men' ? "Men's T-Shirt" : "Women's T-Shirt"}
                </span>
                <span className="text-xs text-neutral-500 font-semibold">•</span>
                <span className="text-xs font-mono font-bold text-amber-600">
                  {product.fit} Cut
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-neutral-950 tracking-tight">
                {product.name}
              </h3>
              
              <p className="text-xs text-neutral-600 mt-1">
                {product.subtitle}
              </p>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-extrabold text-neutral-950">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-50 border border-yellow-300 text-neutral-900 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-500 text-[11px]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Selectors */}
            <div className="space-y-4">
              {/* Color Select */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Selected Color: <span className="text-neutral-950 font-bold">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        selectedColor.name === c.name 
                          ? 'ring-2 ring-amber-500 ring-offset-2 scale-110' 
                          : 'border border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Select */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Select Size ({product.fit} Cut):
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-10 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedSize === sz
                          ? 'bg-yellow-400 text-neutral-950 border border-amber-500 shadow-xs'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                id="quickview-add-cart-btn"
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-neutral-950 border border-amber-400'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                    <span>ADD TO BAG • ${product.price}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>Pre-washed, pre-shrunk 100% organic cotton guarantee</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
