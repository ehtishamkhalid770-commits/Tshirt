import { ArrowRight, Sparkles, Flame, Shield, ArrowDown, Award } from 'lucide-react';

interface HeroSectionProps {
  onShopMen: () => void;
  onShopWomen: () => void;
}

export function HeroSection({ onShopMen, onShopWomen }: HeroSectionProps) {
  return (
    <section id="hero-section" className="relative bg-white border-b border-neutral-200 overflow-hidden">
      
      {/* Top Banner Tagline Strip */}
      <div className="bg-neutral-900 text-yellow-400 py-2 px-4 text-center text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-3">
        <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        <span>NEW DROP • 100% ORGANIC HEAVYWEIGHT COTTON TEES</span>
        <span className="hidden sm:inline-block">•</span>
        <span className="hidden sm:inline-block text-white">MEN & WOMEN ESSENTIALS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Big Impact Hero Card Frame */}
        <div className="relative rounded-3xl bg-gradient-to-b from-yellow-50/70 via-white to-amber-50/40 border-2 border-yellow-400/80 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          
          {/* Subtle background sun rays / circular glow */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: Brand Statement & Quality Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400 text-neutral-950 font-bold text-xs font-mono shadow-xs border border-amber-500">
              <Flame className="w-3.5 h-3.5 fill-neutral-950" />
              <span>SUMMER 2026 EDITION</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-2xs">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Heavyweight 280 GSM • Pre-Shrunk Ringspun</span>
            </div>
          </div>

          {/* Center Main Split: Big Bold Headline & 2 Hero Cards (Men & Women) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Clear, punchy typography & Instant Action */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.05]">
                  Premium <br />
                  <span className="inline-block px-3 py-0.5 rounded-xl bg-yellow-400 text-neutral-950 shadow-xs rotate-[-1deg]">
                    Cotton Tees
                  </span>
                  <br />
                  Built to Last.
                </h1>
                <p className="text-neutral-600 text-sm sm:text-base mt-4 leading-relaxed max-w-md">
                  Clean cuts, ultra-soft heavyweight feel, and colors that stay rich wash after wash. Discover your everyday favorite t-shirt.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  id="hero-shop-men-btn"
                  onClick={onShopMen}
                  className="flex-1 py-4 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-extrabold text-sm tracking-wider flex items-center justify-center gap-2 border-2 border-neutral-950 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>SHOP MEN'S TEES</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  id="hero-shop-women-btn"
                  onClick={onShopWomen}
                  className="flex-1 py-4 px-6 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-950 font-extrabold text-sm tracking-wider flex items-center justify-center gap-2 border-2 border-neutral-950 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>SHOP WOMEN'S TEES</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* 3 Quick Features */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-200">
                <div className="text-center p-2 rounded-xl bg-white/80 border border-yellow-200">
                  <span className="block font-display font-extrabold text-base text-neutral-950">280 GSM</span>
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold">Heavy Cotton</span>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/80 border border-yellow-200">
                  <span className="block font-display font-extrabold text-base text-neutral-950">0% Shrink</span>
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold">Pre-Washed</span>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/80 border border-yellow-200">
                  <span className="block font-display font-extrabold text-base text-neutral-950">30-Day</span>
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold">Free Returns</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Side-by-Side Cards (Men's & Women's Showcase) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Men's Tee Feature */}
              <div 
                onClick={onShopMen}
                className="group relative rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-400 p-4 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-neutral-950 text-[11px] font-bold font-mono uppercase">
                    Men's Collection
                  </span>
                  <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md">
                    $38
                  </span>
                </div>

                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-50 mb-3 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80"
                    alt="Men's Box Cut T-Shirt"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-mono font-bold text-yellow-300 uppercase tracking-wider">
                      Oversized Box Cut
                    </p>
                    <h3 className="font-display font-bold text-base leading-tight">
                      Volt Heavyweight Tee
                    </h3>
                  </div>
                </div>

                <div className="w-full py-2.5 rounded-xl bg-neutral-900 group-hover:bg-yellow-400 text-white group-hover:text-neutral-950 text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors">
                  <span>VIEW MEN TEES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 2: Women's Tee Feature */}
              <div 
                onClick={onShopWomen}
                className="group relative rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-400 p-4 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-neutral-950 text-[11px] font-bold font-mono uppercase">
                    Women's Collection
                  </span>
                  <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md">
                    $34
                  </span>
                </div>

                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-50 mb-3 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80"
                    alt="Women's Relaxed T-Shirt"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-mono font-bold text-yellow-300 uppercase tracking-wider">
                      Soft Relaxed Drape
                    </p>
                    <h3 className="font-display font-bold text-base leading-tight">
                      Aero Summer Vibe Tee
                    </h3>
                  </div>
                </div>

                <div className="w-full py-2.5 rounded-xl bg-neutral-900 group-hover:bg-yellow-400 text-white group-hover:text-neutral-950 text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors">
                  <span>VIEW WOMEN TEES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
