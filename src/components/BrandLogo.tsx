import { Shirt } from 'lucide-react';
import { useState } from 'react';

// You can use any image URL or upload your own file (e.g., /logo.png, /logo.svg, or external URL)
export const BRAND_LOGO_URL = '/logo.svg';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  fallbackIconSize?: number;
  showText?: boolean;
}

export function BrandLogo({
  className = '',
  imageClassName = 'w-9 h-9',
  fallbackIconSize = 20,
  showText = true,
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Logo container: displays <img> if available, with graceful stylish fallback */}
      <div
        className={`${imageClassName} rounded-xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 flex items-center justify-center shadow-md shadow-amber-400/25 border border-amber-300 overflow-hidden flex-shrink-0 transition-transform hover:scale-105`}
      >
        {!imageError ? (
          <img
            src={BRAND_LOGO_URL}
            alt="VoltTee Brand Logo"
            className="w-full h-full object-contain p-1"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <Shirt
            size={fallbackIconSize}
            className="text-neutral-950 stroke-[2.2]"
          />
        )}
      </div>

      {showText && (
        <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-neutral-900 transition-colors">
          volt<span className="text-amber-500 underline decoration-yellow-400 decoration-wavy decoration-2">tee</span>
        </span>
      )}
    </div>
  );
}
