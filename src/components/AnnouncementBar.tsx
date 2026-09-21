import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      id="announcement-bar" 
      className="relative bg-amber-300/90 text-xs sm:text-sm font-medium border-b border-amber-400 text-neutral-900 py-2.5 px-4 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center space-x-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 text-neutral-900 text-[11px] font-bold border border-amber-400/60 shadow-xs">
          <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
          SUMMER TEE DROP
        </span>
        <span className="text-neutral-900 font-medium">
          Free shipping on all t-shirt orders over <strong className="font-extrabold underline decoration-neutral-900/40">$50</strong>
        </span>
        <span className="hidden md:inline-block text-neutral-500">•</span>
        <span className="hidden md:inline-block text-neutral-800 font-normal">
          Use code <span className="font-mono font-bold text-neutral-950 bg-white px-2 py-0.5 rounded border border-amber-400/80 shadow-2xs">TEE15</span> for 15% off
        </span>
      </div>

      <button
        id="dismiss-announcement-btn"
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-neutral-950 p-1 rounded-full hover:bg-amber-400/50 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
