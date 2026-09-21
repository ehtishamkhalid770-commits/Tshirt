import { useState } from 'react';
import { Product, ColorOption, CartItem } from './types';
import { PRODUCTS } from './data/products';
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

export function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colors[0],
      selectedSize: 'L',
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active filter for t-shirts ('all' | 'men' | 'women' | 'new')
  const [activeFilter, setActiveFilter] = useState('all');

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Checkout banner simulation
  const [checkoutNotification, setCheckoutNotification] = useState(false);

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
            quantity: 1
          }
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
    setCheckoutNotification(true);
    setTimeout(() => {
      setCheckoutNotification(false);
    }, 4000);
  };

  // Filter products strictly for t-shirts
  const filteredProducts = PRODUCTS.filter((p) => {
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

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col selection:bg-yellow-300 selection:text-neutral-900">
      
      {/* Checkout Success Notification */}
      {checkoutNotification && (
        <div className="fixed top-5 right-5 z-50 bg-white border-2 border-amber-400 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-neutral-950">
            ✓
          </div>
          <div>
            <p className="font-bold text-neutral-900 text-sm">Order Simulation Placed!</p>
            <p className="text-xs text-neutral-600">Your organic cotton t-shirts are being packed.</p>
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
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
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
