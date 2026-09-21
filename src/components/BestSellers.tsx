import { useState } from 'react';
import { Product, ColorOption } from '../types';
import { ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';

interface BestSellersProps {
  products: Product[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string) => void;
  onQuickView: (product: Product) => void;
}

export function BestSellers({
  products,
  activeFilter,
  onFilterChange,
  onAddToCart,
  onQuickView
}: BestSellersProps) {
  // Local state to track chosen color for each product card
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, ColorOption>>({});
  // Selected size per card
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<string, string>>({});
  // Feedback notification
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const filterTabs = [
    { id: 'all', label: 'ALL T-SHIRTS' },
    { id: 'men', label: "MEN'S TEES" },
    { id: 'women', label: "WOMEN'S TEES" }
  ];

  const handleColorPick = (productId: string, color: ColorOption) => {
    setSelectedColorMap((prev) => ({ ...prev, [productId]: color }));
  };

  const handleSizePick = (productId: string, size: string) => {
    setSelectedSizeMap((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddWithSelection = (product: Product) => {
    const color = selectedColorMap[product.id] || product.colors[0];
    const size = selectedSizeMap[product.id] || product.sizes[0];
    onAddToCart(product, color, size);
    
    setAddedItemNotice(product.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1500);
  };

  return (
    <section id="bestsellers-section" className="py-12 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-neutral-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-600 uppercase mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span>100% COTTON TEES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Essential T-Shirt Lineup
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-full border border-neutral-200 shadow-2xs">
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`filter-tab-${tab.id}`}
                  onClick={() => onFilterChange(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${
                    isSelected
                      ? 'bg-yellow-400 text-neutral-950 shadow-xs border border-yellow-500 font-extrabold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid: Beautiful Yellow Accent Styling on White Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {products.map((product) => {
            const activeColor = selectedColorMap[product.id] || product.colors[0];
            const activeSize = selectedSizeMap[product.id] || product.sizes[0];
            const isJustAdded = addedItemNotice === product.id;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border-2 border-amber-300 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Yellow accent top header bar */}
                <div className="h-2 w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />

                {/* Top bar: Badge & Quick View button */}
                <div className="p-4 pb-0 flex items-center justify-between z-10">
                  {product.badge ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold font-mono tracking-wider bg-yellow-400 text-neutral-950 border border-amber-400 shadow-2xs">
                      <Sparkles className="w-3 h-3 fill-amber-500 text-amber-700" />
                      {product.badge}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono uppercase text-neutral-500 font-semibold tracking-wider">
                      {product.fit} Cut
                    </span>
                  )}

                  <button
                    id={`quickview-${product.id}`}
                    onClick={() => onQuickView(product)}
                    className="p-2 rounded-full bg-neutral-100 hover:bg-yellow-300 text-neutral-700 hover:text-neutral-950 transition-colors shadow-xs"
                    title="Quick preview"
                    aria-label={`Quick preview ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Image Stage with soft warm yellow glow */}
                <div 
                  className="relative px-6 py-4 flex items-center justify-center cursor-pointer min-h-[260px] overflow-hidden"
                  onClick={() => onQuickView(product)}
                >
                  {/* Subtle warm glow background */}
                  <div className="absolute inset-4 bg-gradient-to-br from-yellow-100/50 via-amber-50/40 to-transparent rounded-2xl pointer-events-none group-hover:scale-105 transition-transform duration-500" />

                  <img
                    src={activeColor.image}
                    alt={`${product.name} in ${activeColor.name}`}
                    className="relative z-10 max-h-56 w-auto object-contain transition-transform duration-500 group-hover:scale-105 select-none drop-shadow-sm"
                  />

                  {/* Rating tag in image corner */}
                  <div className="absolute bottom-3 left-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-amber-300/80 text-neutral-900 text-xs font-semibold shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-500 text-[10px]">({product.reviewsCount})</span>
                  </div>

                  {/* Category pill */}
                  <div className="absolute bottom-3 right-4 z-20 px-2.5 py-1 rounded-full bg-yellow-100 border border-yellow-300 text-neutral-900 text-[11px] font-bold uppercase tracking-wider">
                    {product.category === 'men' ? "Men's Tee" : "Women's Tee"}
                  </div>
                </div>

                {/* Card Body: Title, Subtitle, Price */}
                <div className="p-5 pt-2 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display font-bold text-base text-neutral-950 tracking-tight group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-right">
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                        <span className="text-lg font-mono font-extrabold text-neutral-950">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Color Swatches */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-medium text-neutral-600 mb-1.5">
                      <span>Color: <strong className="text-neutral-900">{activeColor.name}</strong></span>
                      <span className="text-amber-600 font-semibold">{product.colors.length} shades</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => {
                        const isSelected = activeColor.name === c.name;
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => handleColorPick(product.id, c)}
                            className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                              isSelected 
                                ? 'ring-2 ring-amber-500 ring-offset-2 scale-110' 
                                : 'border border-neutral-300 hover:scale-105'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            aria-label={`Select color ${c.name}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selector Pills */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-medium text-neutral-600 mb-1.5">
                      <span>Size: <strong className="text-neutral-900">{activeSize}</strong></span>
                      <span className="text-neutral-500">{product.fit} fit</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map((size) => {
                        const isChosen = activeSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => handleSizePick(product.id, size)}
                            className={`min-w-8 py-1 px-2 text-xs font-mono font-bold rounded-md transition-all ${
                              isChosen
                                ? 'bg-yellow-400 text-neutral-950 border border-amber-500 shadow-2xs scale-105'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add to Bag Action Button with bright yellow styling */}
                  <button
                    id={`add-to-bag-${product.id}`}
                    type="button"
                    onClick={() => handleAddWithSelection(product)}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm ${
                      isJustAdded
                        ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                        : 'bg-yellow-400 hover:bg-yellow-300 active:bg-amber-400 text-neutral-950 hover:shadow-md border border-amber-400'
                    }`}
                  >
                    {isJustAdded ? (
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
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
