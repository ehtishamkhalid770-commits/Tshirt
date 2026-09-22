import { ArrowUp, Mail, Check, Shield } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-white border-t border-neutral-200 text-neutral-800">
      
      {/* Top Banner: Newsletter signup with yellow border and clean white input */}
      <div className="bg-amber-50/70 border-b border-amber-200/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-300/80 border border-yellow-400 text-neutral-950 text-xs font-bold font-mono">
            <span>GET 15% OFF YOUR FIRST TEE</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-950">
            Join the ilovetshirts.store Movement
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
            Early access to limited heavyweight tee drops, seasonal colorways, and exclusive member discounts.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 border border-emerald-300 px-5 py-2.5 rounded-full text-xs font-bold">
              <Check className="w-4 h-4" />
              <span>You're in! Check your inbox for your 15% promo code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-2">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border border-amber-300 rounded-full px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 shadow-2xs"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="px-6 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold text-xs tracking-wider border border-amber-400 shadow-xs transition-colors cursor-pointer"
              >
                JOIN
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <BrandLogo />
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              We design minimalist, high-density 100% organic cotton t-shirts for men and women. No shortcuts, no toxic dyes, built to endure every day.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span>© {new Date().getFullYear()} ilovetshirts.store</span>
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1 text-neutral-400 hover:text-amber-600 transition-colors underline cursor-pointer"
                >
                  <Shield className="w-3 h-3" />
                  <span>Admin Panel (/admin)</span>
                </button>
              )}
            </div>
          </div>

          {/* Men's Tees */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-wider text-neutral-900 uppercase mb-3">
              Men's Tees
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><a href="#bestsellers-section" className="hover:text-amber-600 transition-colors">Heavyweight Box Cut</a></li>
              <li><a href="#bestsellers-section" className="hover:text-amber-600 transition-colors">Core Crewneck</a></li>
              <li><a href="#bestsellers-section" className="hover:text-amber-600 transition-colors">Vintage Graphic Tees</a></li>
              <li><a href="#bestsellers-section" className="hover:text-amber-600 transition-colors">Sunburst Yellow Editions</a></li>
            </ul>
          </div>

          {/* Women's Tees */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-wider text-neutral-900 uppercase mb-3">
              Women's Tees
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><a href="#bestsellers-section" className="hover:text-amber-600 transition-colors">Relaxed Drape Tees</a></li>
              <li><a href="#bestsellers-section" className="hover:text-amber-600 transition-colors">Boyfriend Oversized Cut</a></li>
              <li><a href="#bestsellers-section" className="hover:text-amber-600 transition-colors">Cropped Baby Tees</a></li>
              <li><a href="#bestsellers-section" className="hover:text-amber-600 transition-colors">Organic Pastels</a></li>
            </ul>
          </div>

          {/* Customer Care & Back to Top */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-wider text-neutral-900 uppercase mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><span className="hover:text-amber-600 transition-colors cursor-pointer">T-Shirt Size Guide</span></li>
              <li><span className="hover:text-amber-600 transition-colors cursor-pointer">30-Day Free Returns</span></li>
              <li><span className="hover:text-amber-600 transition-colors cursor-pointer">Cotton Care & Washing</span></li>
              <li>
                {onOpenAdmin ? (
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-amber-600 transition-colors text-left"
                  >
                    Merchant Login (/admin)
                  </button>
                ) : (
                  <span className="hover:text-amber-600 transition-colors cursor-pointer">Track T-Shirt Order</span>
                )}
              </li>
            </ul>

            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-amber-600 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
