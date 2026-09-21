import { Shirt } from 'lucide-react';
import { useState } from 'react';

// Path for your logo file in the /public folder
export const BRAND_LOGO_URL = '/logo.png';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
}

export function BrandLogo({
  className = '',
  imageClassName = 'h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px]',
  showText = false, // Since your logo.png already has the full brand name "ilovetshirts.store"
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {!imageError ? (
        <img
          src={BRAND_LOGO_URL}
          alt="ilovetshirts.store"
          className={`${imageClassName} object-contain transition-transform hover:scale-105 drop-shadow-xs`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 flex items-center justify-center border border-amber-300 shadow-xs">
            <Shirt className="w-5 h-5 text-neutral-950 stroke-[2.2]" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-neutral-900">
            ilovetshirts<span className="text-amber-500">.store</span>
          </span>
        </div>
      )}

      {showText && (
        <span className="font-display font-bold text-xl tracking-tight text-neutral-900">
          ilovetshirts<span className="text-amber-500">.store</span>
        </span>
      )}
    </div>
  );
}
