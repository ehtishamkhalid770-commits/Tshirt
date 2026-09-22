import { useState, useEffect } from 'react';
import { Product, ColorOption, CartItem } from './types';
import { getStoredProducts, isAdminLoggedIn } from './services/storageService';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryArches } from './components/CategoryArches';
import { BestSellers } from './components/BestSellers';
import { FeatureStories } from './components/FeatureStories';
import { ValuePillars } from './components/ValuePillars';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export function App() {
  // Products from local storage (synced with Admin changes)
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());

  // Route detection helper: checks pathname (/admin, /admin/), hash (#/admin, #admin), and query (?admin)
  const checkIsAdmin = () => {
    const p = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const h = window.location.hash.toLowerCase();
    const s = window.location.search.toLowerCase();
    return (
      p === '/admin' ||
      p.startsWith('/admin/') ||
      h === '#admin' ||
      h === '#/admin' ||
      s.includes('admin=true') ||
      s.includes('admin=1') ||
      s === '?admin'
    );
  };

  // URL Path routing for /admin
  const [isAdminView, setIsAdminView] = useState<boolean>(() => checkIsAdmin());
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => isAdminLoggedIn());

  // Listen for browser forward/back buttons, pushState & hash changes
  useEffect(() => {
    const handleRouteCheck = () => {
      setIsAdminView(checkIsAdmin());
      setIsAdminAuthenticated(isAdminLoggedIn());
    };
    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);
    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, []);

  // Sync products when admin creates/edits/deletes them
  useEffect(() => {
    const handleProductsUpdated = () => {
      setProducts(getStoredProducts());
    };
    window.addEventListener('products_updated', handleProductsUpdated);
    return () => window.removeEventListener('products_updated', handleProductsUpdated);
  }, []);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (products.length > 0 && products[0].colors.length > 0) {
      return [
        {
          product: products[0],
          selectedColor: products[0].colors[0],
          selectedSize: 'L',
          quantity: 1,
        },
      ];
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Active filter for t-shirts ('all' | 'men' | 'women' | 'new')
  const [activeFilter, setActiveFilter] = useState('all');

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Checkout banner notification
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);

  // Navigation helpers
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setIsAdminView(checkIsAdmin());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    navigateTo('/admin');
  };

  const handleBackToStore = () => {
    navigateTo('/');
  };

  // Cart operations
  const handleAddToCart = (product: Product, color: ColorOption, size: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: color,
            selectedSize: size,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderNumber: string) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setPlacedOrderNumber(orderNumber);
    setTimeout(() => {
      setPlacedOrderNumber(null);
    }, 7000);
  };

  // Filter products strictly for t-shirts
  const filteredProducts = products.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'men') return p.category === 'men';
    if (activeFilter === 'women') return p.category === 'women';
    if (activeFilter === 'new') return p.badge === 'NEW';
    return true;
  });

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToBestsellers = (filter: string) => {
    setActiveFilter(filter);
    const el = document.getElementById('bestsellers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ROUTE 1: If user navigates to /admin
  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setIsAdminAuthenticated(true)}
          onCancel={handleBackToStore}
        />
      );
    }
    return (
      <AdminDashboard
        onBackToStore={handleBackToStore}
        onLogout={() => setIsAdminAuthenticated(false)}
      />
    );
  }

  // ROUTE 2: Customer Storefront
  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col selection:bg-yellow-300 selection:text-neutral-900">
      
      {/* Order Placed Toast Banner */}
      {placedOrderNumber && (
        <div className="fixed top-5 right-5 z-50 bg-neutral-950 text-white border-2 border-yellow-400 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-sm">
          <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center font-bold text-neutral-950 flex-shrink-0 text-lg">
            ✓
          </div>
          <div>
            <p className="font-bold text-yellow-400 text-sm">Order Placed Successfully!</p>
            <p className="text-xs text-neutral-300">
              Order <strong className="text-white font-mono">{placedOrderNumber}</strong> has been received and saved to Admin Dashboard.
            </p>
          </div>
        </div>
      )}

      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={scrollToBestsellers}
        activeCategory={activeFilter}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 3. Hero Section (Cotton T-shirts, White theme with Yellow accents) */}
        <HeroSection
          onShopMen={() => scrollToBestsellers('men')}
          onShopWomen={() => scrollToBestsellers('women')}
        />

        {/* 4. Architectural Category Arches */}
        <CategoryArches onSelectCategory={scrollToBestsellers} />

        {/* 5. T-Shirt Products Grid with Yellow-Accented Cards */}
        <BestSellers
          products={filteredProducts}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* 6. Feature Lifestyle Stories */}
        <FeatureStories onSelectCategory={scrollToBestsellers} />

        {/* 7. Organic Cotton Value Pillars */}
        <ValuePillars />

      </main>

      {/* 8. Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Customer Checkout Order Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}

export default App;
