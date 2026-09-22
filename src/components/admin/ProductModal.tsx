import { useState } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { Product, ColorOption } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct?: Product | null;
}

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const PRESET_COLORS: { name: string; hex: string }[] = [
  { name: 'Sunburst Yellow', hex: '#EAB308' },
  { name: 'Bright Canary', hex: '#FACC15' },
  { name: 'Crisp White', hex: '#FFFFFF' },
  { name: 'Jet Onyx', hex: '#18181B' },
  { name: 'Charcoal Grey', hex: '#374151' },
  { name: 'Navy Blue', hex: '#1E3A8A' },
  { name: 'Olive Green', hex: '#3F6212' },
  { name: 'Terracotta Rust', hex: '#9A3412' },
];

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}: ProductModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState(initialProduct?.name || '');
  const [subtitle, setSubtitle] = useState(initialProduct?.subtitle || '');
  const [price, setPrice] = useState(initialProduct?.price?.toString() || '35');
  const [originalPrice, setOriginalPrice] = useState(initialProduct?.originalPrice?.toString() || '');
  const [category, setCategory] = useState<'men' | 'women'>(initialProduct?.category || 'men');
  const [fit, setFit] = useState<'Oversized' | 'Regular' | 'Relaxed' | 'Slim'>(initialProduct?.fit || 'Oversized');
  const [badge, setBadge] = useState<'NEW' | 'BESTSELLER' | 'LIMITED' | 'ORGANIC' | ''>(initialProduct?.badge || 'NEW');
  const [description, setDescription] = useState(
    initialProduct?.description || '100% Organic heavyweight combed cotton t-shirt with premium pre-shrunk finish.'
  );
  const [sizes, setSizes] = useState<string[]>(initialProduct?.sizes || ['S', 'M', 'L', 'XL']);
  const [stock, setStock] = useState(initialProduct?.stock?.toString() || '50');

  // Color variants array
  const [colors, setColors] = useState<ColorOption[]>(
    initialProduct?.colors && initialProduct.colors.length > 0
      ? initialProduct.colors
      : [
          {
            name: 'Sunburst Yellow',
            hex: '#EAB308',
            image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
          },
          {
            name: 'Crisp White',
            hex: '#FFFFFF',
            image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
          },
        ]
  );

  const [error, setError] = useState('');

  const handleAddColor = () => {
    setColors([
      ...colors,
      {
        name: 'New Color',
        hex: '#18181B',
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80',
      },
    ]);
  };

  const handleUpdateColor = (index: number, field: keyof ColorOption, value: string) => {
    const updated = [...colors];
    updated[index] = { ...updated[index], [field]: value };
    setColors(updated);
  };

  const handleRemoveColor = (index: number) => {
    if (colors.length <= 1) {
      setError('Kam az kam ek color variant lazmi hona chahiye!');
      return;
    }
    setError('');
    setColors(colors.filter((_, i) => i !== index));
  };

  const toggleSize = (sizeVal: string) => {
    if (sizes.includes(sizeVal)) {
      if (sizes.length === 1) return;
      setSizes(sizes.filter((s) => s !== sizeVal));
    } else {
      setSizes([...sizes, sizeVal]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product ka naam enter karein');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Sahi price enter karein');
      return;
    }
    if (colors.length === 0) {
      setError('Kam az kam ek color variant zaroori hai');
      return;
    }

    const savedProduct: Product = {
      id: initialProduct?.id || `tee-${Date.now()}`,
      name: name.trim().toUpperCase(),
      subtitle: subtitle.trim() || '100% Organic Heavyweight Cotton',
      price: numPrice,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      category,
      fit,
      badge: badge ? (badge as 'NEW' | 'BESTSELLER' | 'LIMITED' | 'ORGANIC') : undefined,
      description: description.trim(),
      sizes,
      colors,
      rating: initialProduct?.rating || 5.0,
      reviewsCount: initialProduct?.reviewsCount || 1,
      stock: parseInt(stock, 10) || 50,
      createdAt: initialProduct?.createdAt || new Date().toISOString(),
    };

    onSave(savedProduct);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-2 border-yellow-400 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-yellow-100 via-amber-50 to-white border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center border border-amber-500 font-bold text-neutral-950 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-neutral-950">
                {initialProduct ? 'Edit T-Shirt Product' : 'Add New T-Shirt'}
              </h2>
              <p className="text-xs text-neutral-600">
                Set color swatches, images, sizes, pricing & categories
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-extrabold tracking-wider uppercase text-neutral-500 border-b pb-1">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VOLT SUNBURST OVERSIZED TEE"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                  Subtitle / Material Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. 280 GSM Combed Ringspun Cotton"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="38.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="48.00 (Optional)"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                  Stock Units
                </label>
                <input
                  type="number"
                  placeholder="50"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                  Badge
                </label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value as any)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs font-bold focus:border-amber-500 focus:outline-none"
                >
                  <option value="">No Badge</option>
                  <option value="NEW">NEW DROP</option>
                  <option value="BESTSELLER">BESTSELLER</option>
                  <option value="LIMITED">LIMITED</option>
                  <option value="ORGANIC">ORGANIC</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                  Target Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('men')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      category === 'men'
                        ? 'bg-yellow-400 border-amber-500 text-neutral-950 shadow-xs'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                    }`}
                  >
                    MEN'S TEES
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('women')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      category === 'women'
                        ? 'bg-yellow-400 border-amber-500 text-neutral-950 shadow-xs'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                    }`}
                  >
                    WOMEN'S TEES
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                  Fit Type *
                </label>
                <select
                  value={fit}
                  onChange={(e) => setFit(e.target.value as any)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:border-amber-500 focus:outline-none"
                >
                  <option value="Oversized">Oversized Boxy Cut</option>
                  <option value="Regular">Regular Classic Fit</option>
                  <option value="Relaxed">Relaxed Slouchy Fit</option>
                  <option value="Slim">Slim / Cropped Fit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description and fabric highlights..."
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2: Available Sizes */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-extrabold tracking-wider uppercase text-neutral-500 border-b pb-1">
              2. Available Sizes
            </h3>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_SIZES.map((sz) => {
                const selected = sizes.includes(sz);
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                      selected
                        ? 'bg-neutral-950 text-yellow-400 border-neutral-950 shadow-xs'
                        : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {sz} {selected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Color Variants & Images */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-1">
              <h3 className="text-xs font-mono font-extrabold tracking-wider uppercase text-neutral-500">
                3. Color Variants & Product Images
              </h3>
              <button
                type="button"
                onClick={handleAddColor}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-full border border-amber-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Color Variant</span>
              </button>
            </div>

            <div className="space-y-3">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-700 font-mono">
                      Color Variant #{idx + 1}
                    </span>
                    {colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="text-neutral-400 hover:text-red-500 transition-colors"
                        title="Remove Variant"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    {/* Swatch & Hex */}
                    <div className="sm:col-span-4 flex items-center gap-2">
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => handleUpdateColor(idx, 'hex', e.target.value)}
                        className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-300 p-0.5 bg-white"
                        title="Pick color"
                      />
                      <input
                        type="text"
                        placeholder="Color Name (e.g. Sun Yellow)"
                        value={color.name}
                        onChange={(e) => handleUpdateColor(idx, 'name', e.target.value)}
                        className="flex-1 bg-white border border-neutral-300 rounded-xl px-2.5 py-2 text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* Image URL & Thumbnail preview */}
                    <div className="sm:col-span-8 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {color.image ? (
                          <img
                            src={color.image}
                            alt="preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as any).src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>
                      <input
                        type="url"
                        required
                        placeholder="Image URL (e.g. Unsplash URL or /public image)"
                        value={color.image}
                        onChange={(e) => handleUpdateColor(idx, 'image', e.target.value)}
                        className="flex-1 bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:border-amber-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Preset quick colors */}
                  <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1 text-[11px] text-neutral-500">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Quick:</span>
                    {PRESET_COLORS.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => {
                          handleUpdateColor(idx, 'name', p.name);
                          handleUpdateColor(idx, 'hex', p.hex);
                        }}
                        className="px-2 py-0.5 rounded-full bg-white border border-neutral-200 hover:border-amber-400 flex items-center gap-1 text-[10px]"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: p.hex }}
                        />
                        <span>{p.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-extrabold text-xs tracking-wider flex items-center gap-1.5 border border-amber-400 shadow-md transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{initialProduct ? 'SAVE CHANGES' : 'CREATE PRODUCT'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
