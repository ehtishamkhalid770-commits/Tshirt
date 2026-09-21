import { ArrowUpRight, Shirt } from 'lucide-react';
import { CATEGORY_ARCHES } from '../data/products';

interface CategoryArchesProps {
  onSelectCategory: (category: string) => void;
}

export function CategoryArches({ onSelectCategory }: CategoryArchesProps) {
  return (
    <section id="category-section" className="py-10 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-600 uppercase mb-1">
              <Shirt className="w-3.5 h-3.5 text-amber-500" />
              <span>COLLECTIONS ARCHIVE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Pick Your Signature <span className="text-amber-500 underline decoration-yellow-400 decoration-wavy decoration-2">T-Shirt Cut</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md">
            Heavyweight drops, relaxed slouchy cuts, and tailored baby tees made with premium 100% organic cotton.
          </p>
        </div>

        {/* 4 Architectural arch cards with yellow gradients and borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORY_ARCHES.map((card, idx) => {
            const targetFilter = idx === 0 ? 'men' : idx === 1 ? 'women' : 'all';
            return (
              <div
                key={card.id}
                id={`category-card-${card.id}`}
                onClick={() => onSelectCategory(targetFilter)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border-2 border-amber-300 hover:border-amber-400 shadow-md hover:shadow-xl bg-gradient-to-b from-yellow-50 via-white to-amber-50/40"
              >
                {/* Yellow glowing accent blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                {/* Top: Pill badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold font-mono tracking-wider bg-yellow-400 text-neutral-950 shadow-xs border border-amber-400">
                    {card.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-xs border border-neutral-200 group-hover:bg-yellow-400 group-hover:text-neutral-950 group-hover:border-amber-400 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Center: Image in architectural arch frame */}
                <div className="my-5 relative flex items-center justify-center">
                  <div className="w-full aspect-square max-w-[210px] mx-auto rounded-2xl overflow-hidden bg-white shadow-sm border border-yellow-200 group-hover:border-amber-300 transition-colors">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Bottom: Typography & CTA */}
                <div className="z-10 text-center">
                  <h3 className="font-display text-base font-extrabold text-neutral-900 tracking-tight mb-3 group-hover:text-amber-600 transition-colors">
                    {card.title}
                  </h3>
                  <div className="w-full py-2.5 rounded-full bg-neutral-900 group-hover:bg-yellow-400 text-white group-hover:text-neutral-950 text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-1 shadow-sm">
                    <span>{card.buttonText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
