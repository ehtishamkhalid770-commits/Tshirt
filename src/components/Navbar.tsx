import { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
}

export function Navbar({ cartCount, onOpenCart, onSelectCategory, activeCategory }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'ALL TEES', id: 'all' },
    { label: "MEN'S TEES", id: 'men' },
    { label: "WOMEN'S TEES", id: 'women' },
    { label: 'NEW ARRIVALS', id: 'new' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Left: Mobile Menu Button + Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-amber-600 rounded-lg hover:bg-neutral-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a 
            href="#" 
            className="group block select-none"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
            }}
          >
            <BrandLogo />
          </a>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeCategory === link.id;
            return (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => onSelectCategory(link.id)}
                className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-bold tracking-wider transition-all rounded-full cursor-pointer ${
                  isActive 
                    ? 'text-neutral-950 bg-yellow-300/80 shadow-xs border border-yellow-400' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-yellow-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Admin Quick Link, Cart) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-neutral-100 border border-amber-400 rounded-full pl-3 pr-2 py-1 shadow-xs transition-all">
                <Search className="w-4 h-4 text-amber-600 mr-2" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search t-shirts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-neutral-900 focus:outline-none w-28 sm:w-44"
                  autoFocus
                />
                <button
                  id="close-search-btn"
                  onClick={() => setSearchOpen(false)}
                  className="text-neutral-500 hover:text-neutral-800 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="open-search-btn"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-neutral-600 hover:text-amber-600 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Search t-shirts"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Cart Bag Icon with dynamic badge */}
          <button
            id="cart-bag-btn"
            onClick={onOpenCart}
            className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white transition-all shadow-sm hover:shadow-md cursor-pointer"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-yellow-300 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold tracking-wider">
              Bag
            </span>
            {cartCount > 0 && (
              <span 
                id="cart-badge-count" 
                className="ml-0.5 w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 text-[11px] font-extrabold flex items-center justify-center shadow-xs"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden bg-white border-b border-neutral-200 px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectCategory(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-bold tracking-wider ${
                activeCategory === link.id
                  ? 'bg-yellow-300/80 text-neutral-950 border-l-4 border-amber-500'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Free shipping over $50</span>
            <span className="text-amber-600 font-semibold">100% Organic Cotton</span>
          </div>
        </div>
      )}
    </header>
  );
}
