import { useState } from 'react';
import { X, CheckCircle, ShoppingBag, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { addCustomerOrder } from '../services/storageService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (orderNumber: string) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= 50;
  const shipping = isFreeShipping ? 0 : 4.99;
  const total = subtotal + shipping;

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'easypaisa' | 'jazzcash'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError('Baraye meherbani tamaam zaroori fields (Naam, Phone, Address, City) fill karein.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      try {
        const order = addCustomerOrder({
          customerName: customerName.trim(),
          email: email.trim() || 'customer@example.com',
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          postalCode: postalCode.trim() || '00000',
          notes: notes.trim(),
          paymentMethod,
          items: cartItems,
          subtotal,
          shipping,
          total,
          status: 'pending',
        });

        setIsSubmitting(false);
        onOrderSuccess(order.orderNumber);
      } catch (err) {
        console.error('Order creation error:', err);
        setIsSubmitting(false);
        setError('Order place karne mein masla aya, baraye meherbani dobara koshish karein.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-yellow-400 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-yellow-100 via-amber-50 to-white border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center border border-amber-400 text-neutral-950 font-bold shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-neutral-900">
                Complete Your Order
              </h2>
              <p className="text-xs text-neutral-600">
                Fast shipping • 100% Organic Cotton T-Shirts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Customer Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 border-b pb-1">
              1. Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ali"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="ali@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 border-b pb-1">
              2. Shipping Address
            </h4>
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Street Address / House No. *
              </label>
              <input
                type="text"
                required
                placeholder="House #, Street name, Sector / Area"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lahore, Karachi, etc."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="54000"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Order Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Special delivery instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 border-b pb-1">
              3. Payment Method
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'cod', label: 'Cash on Delivery' },
                { id: 'card', label: 'Card Payment' },
                { id: 'easypaisa', label: 'Easypaisa' },
                { id: 'jazzcash', label: 'JazzCash' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-2 rounded-xl text-center border text-xs font-bold transition-all ${
                    paymentMethod === m.id
                      ? 'bg-yellow-400 border-amber-500 text-neutral-950 shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary Snapshot */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Items Total ({cartItems.reduce((s, i) => s + i.quantity, 0)} tees)</span>
              <span className="font-mono font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span className="font-mono text-neutral-900">
                {isFreeShipping ? <strong className="text-emerald-700">FREE</strong> : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-1.5 border-t border-amber-200">
              <span>Total Payable</span>
              <span className="font-mono text-base font-black text-amber-700">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-extrabold text-sm tracking-wider flex items-center justify-center gap-2 border-2 border-amber-500 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>CONFIRM & PLACE ORDER</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
