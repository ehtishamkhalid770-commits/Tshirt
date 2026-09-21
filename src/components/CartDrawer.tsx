import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingThreshold = 50;
  const isFreeShipping = subtotal >= shippingThreshold;
  const neededForFreeShipping = Math.max(0, shippingThreshold - subtotal);

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden bg-neutral-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel" 
          className="w-screen max-w-md bg-white border-l border-neutral-200 shadow-2xl flex flex-col justify-between"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="font-display font-extrabold text-lg text-neutral-900">
                Your T-Shirt Bag ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-amber-50/90 border-b border-amber-200/80">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 mb-1.5">
              <span>
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-bold">🎉 You unlocked FREE Shipping!</span>
                ) : (
                  <span>Add <strong className="text-neutral-950">${neededForFreeShipping.toFixed(2)}</strong> more for FREE shipping</span>
                )}
              </span>
              <span className="text-neutral-600 font-mono text-[11px]">Threshold $50</span>
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center text-amber-500 border border-yellow-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-neutral-900 text-lg">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Find your favorite heavyweight and relaxed cotton t-shirts in our summer lineup.
                </p>
                <button
                  id="browse-tees-cart-btn"
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-full bg-yellow-400 text-neutral-950 font-bold text-xs tracking-wider border border-amber-400 shadow-xs hover:bg-yellow-300 transition-colors"
                >
                  START BROWSING TEES
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                  id={`cart-item-${index}`}
                  className="flex gap-4 p-3 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-amber-300 transition-colors"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-xl bg-neutral-50 flex-shrink-0 flex items-center justify-center overflow-hidden border border-neutral-200">
                    <img
                      src={item.selectedColor.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-display font-bold text-sm text-neutral-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          id={`remove-cart-item-${index}`}
                          onClick={() => onRemoveItem(index)}
                          className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-600">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                        <span>•</span>
                        <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded text-[11px]">
                          Size {item.selectedSize}
                        </span>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100">
                      <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="p-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="p-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-mono font-bold text-sm text-neutral-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Total & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-neutral-900">
                    {isFreeShipping ? <span className="text-emerald-600 font-bold">FREE</span> : '$4.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total Due</span>
                  <span className="font-mono text-base font-extrabold text-neutral-950">
                    ${(subtotal + (isFreeShipping ? 0 : 4.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                id="checkout-action-btn"
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold text-sm tracking-wider flex items-center justify-center gap-2 border border-amber-400 shadow-md transition-all cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <p className="text-[11px] text-center text-neutral-500">
                🔒 Guaranteed 100% Organic Cotton • 30-Day Free Exchanges
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
