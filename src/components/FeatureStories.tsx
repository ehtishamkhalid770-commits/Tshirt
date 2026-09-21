import { ArrowRight, Sparkles } from 'lucide-react';
import { PROMO_STORIES } from '../data/products';

interface FeatureStoriesProps {
  onSelectCategory: (filter: string) => void;
}

export function FeatureStories({ onSelectCategory }: FeatureStoriesProps) {
  return (
    <section id="features-stories-section" className="py-12 bg-white border-t border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-amber-800 text-xs font-mono font-bold tracking-wider mb-2 border border-yellow-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            THE COTTON STANDARD
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Designed for Pure Everyday Comfort
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            No synthetic polyesters. No scratchy labels. Just breathable heavyweight ringspun organic cotton in fresh sunlit colors.
          </p>
        </div>

        {/* 3 Prominent feature story cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROMO_STORIES.map((story) => (
            <div
              key={story.id}
              id={`story-card-${story.id}`}
              className="group relative rounded-3xl overflow-hidden bg-white border-2 border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow bg-gradient-to-b from-white to-yellow-50/30">
                <div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {story.subtitle}
                  </p>
                </div>

                <button
                  id={`story-btn-${story.id}`}
                  onClick={() => onSelectCategory(story.filterTarget)}
                  className="inline-flex items-center justify-between w-full px-5 py-2.5 rounded-full bg-yellow-300/80 hover:bg-yellow-400 text-neutral-950 font-bold text-xs tracking-wider border border-yellow-400 transition-colors shadow-2xs"
                >
                  <span>{story.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
