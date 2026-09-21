import { Sparkles, ShieldCheck, RotateCcw } from 'lucide-react';
import { VALUE_PILLARS } from '../data/products';

export function ValuePillars() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-500" />;
      case 'RotateCcw':
        return <RotateCcw className="w-6 h-6 text-amber-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="value-pillars-section" className="py-12 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_PILLARS.map((pillar, idx) => (
            <div 
              key={idx}
              id={`value-pillar-${idx}`}
              className="flex flex-col items-start p-6 rounded-2xl bg-gradient-to-b from-yellow-50/60 to-white border border-yellow-200/90 shadow-2xs hover:border-amber-300 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-300/80 border border-yellow-400 flex items-center justify-center mb-4 shadow-xs">
                {getIcon(pillar.icon)}
              </div>
              <h3 className="font-display font-extrabold text-sm sm:text-base tracking-tight text-neutral-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
