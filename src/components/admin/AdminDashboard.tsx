import { useState, useMemo } from 'react';
import {
  Package,
  ShoppingBag,
  Plus,
  Search,
  LogOut,
  Edit2,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Eye,
  X,
  Phone,
  MapPin,
  Mail,
  Calendar,
} from 'lucide-react';
import { Product, CustomerOrder } from '../../types';
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredOrders,
  saveStoredOrders,
  updateOrderStatus,
  deleteCustomerOrder,
  setAdminLoggedIn,
} from '../../services/storageService';
import { ProductModal } from './ProductModal';
import { BrandLogo } from '../BrandLogo';

interface AdminDashboardProps {
  onBackToStore: () => void;
  onLogout: () => void;
}

export function AdminDashboard({ onBackToStore, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics'>('products');
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  const [orders, setOrders] = useState<CustomerOrder[]>(() => getStoredOrders());

  // Search & Filter state
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'men' | 'women'>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Selected Order Detail Modal
  const [viewingOrder, setViewingOrder] = useState<CustomerOrder | null>(null);

  // Success / notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reload data
  const refreshData = () => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
  };

  // Product Operations
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (savedProd: Product) => {
    let updated: Product[];
    if (editingProduct) {
      updated = products.map((p) => (p.id === savedProd.id ? savedProd : p));
      showToast(`Product "${savedProd.name}" updated successfully!`);
    } else {
      updated = [savedProd, ...products];
      showToast(`New Product "${savedProd.name}" created!`);
    }
    setProducts(updated);
    saveStoredProducts(updated);
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (productId: string, name: string) => {
    if (window.confirm(`Kya aap waqai product "${name}" ko delete karna chahte hain?`)) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      saveStoredProducts(updated);
      showToast(`Product "${name}" deleted.`);
    }
  };

  // Order Operations
  const handleStatusChange = (orderId: string, newStatus: CustomerOrder['status']) => {
    updateOrderStatus(orderId, newStatus);
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    if (viewingOrder && viewingOrder.id === orderId) {
      setViewingOrder({ ...viewingOrder, status: newStatus });
    }
    showToast(`Order status updated to "${newStatus.toUpperCase()}"`);
  };

  const handleDeleteOrder = (orderId: string, orderNumber: string) => {
    if (window.confirm(`Kya aap order ${orderNumber} ko delete karna chahte hain?`)) {
      deleteCustomerOrder(orderId);
      const updated = orders.filter((o) => o.id !== orderId);
      setOrders(updated);
      if (viewingOrder?.id === orderId) setViewingOrder(null);
      showToast(`Order ${orderNumber} deleted.`);
    }
  };

  const handleLogoutAdmin = () => {
    setAdminLoggedIn(false);
    onLogout();
  };

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCat =
        selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, productSearch, selectedCategory]);

  // Filtering orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.email.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.phone.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.city.toLowerCase().includes(orderSearch.toLowerCase());
      const matchesStatus =
        orderStatusFilter === 'all' || o.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Analytics Stats
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const totalItemsSold = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col selection:bg-yellow-400 selection:text-neutral-950 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-yellow-400 text-neutral-950 border-2 border-amber-500 font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4 duration-300 text-xs">
          <CheckCircle2 className="w-4 h-4 fill-neutral-950 text-yellow-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-neutral-950/95 border-b border-neutral-800 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand & Badge */}
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-xl">
            <BrandLogo showText={false} imageClassName="h-8 w-auto" />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white text-base">
                Admin Control Center
              </span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 text-[10px] font-mono font-bold">
                ROOT ADMIN
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Manage Products, Variants & Customer Orders
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-bold transition-all border border-neutral-700 cursor-pointer"
            title="Open customer view"
          >
            <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden sm:inline">Live Store</span>
          </button>

          <button
            onClick={handleLogoutAdmin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800/80 text-red-200 text-xs font-bold transition-all cursor-pointer"
            title="Logout admin session"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Analytics Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">
                Total Products
              </p>
              <h3 className="text-2xl font-black text-white mt-1">
                {products.length}
              </h3>
              <p className="text-[11px] text-yellow-400 mt-1">
                {products.reduce((acc, p) => acc + p.colors.length, 0)} Color Swatches Live
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">
                Total Customer Orders
              </p>
              <h3 className="text-2xl font-black text-white mt-1">
                {orders.length}
              </h3>
              <p className="text-[11px] text-amber-400 mt-1">
                {pendingOrdersCount} Pending fulfillment
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">
                Total Sales Revenue
              </p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                ${totalRevenue.toFixed(2)}
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                Across all completed & pending orders
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider">
                T-Shirts Ordered
              </p>
              <h3 className="text-2xl font-black text-yellow-400 mt-1 font-mono">
                {totalItemsSold} Units
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                Combed organic cotton tees
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-yellow-400 text-neutral-950 font-extrabold shadow-sm'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>PRODUCTS CATALOG ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer relative ${
                activeTab === 'orders'
                  ? 'bg-yellow-400 text-neutral-950 font-extrabold shadow-sm'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>CUSTOMER ORDERS ({orders.length})</span>
              {pendingOrdersCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-black text-xs tracking-wider flex items-center gap-1.5 border border-amber-400 shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>ADD NEW T-SHIRT</span>
            </button>
          )}
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search t-shirts by name, fit..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-yellow-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">Category:</span>
                {(['all', 'men', 'women'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      selectedCategory === cat
                        ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/60'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {cat === 'all' ? 'All Tees' : cat}
                  </button>
                ))}
              </div>

            </div>

            {/* Products Table / Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-neutral-950 rounded-3xl border border-neutral-800 p-8">
                  <Package className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">No T-Shirts Found</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
                    Search query match nahi hui ya koi product mojood nahi hai. "ADD NEW T-SHIRT" par click karein.
                  </p>
                </div>
              ) : (
                filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-neutral-950 border border-neutral-800 hover:border-yellow-400/60 rounded-2xl p-4 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 text-[10px] font-mono font-bold uppercase">
                          {prod.category}'s • {prod.fit}
                        </span>
                        {prod.badge && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-400 text-neutral-950 text-[10px] font-extrabold uppercase">
                            {prod.badge}
                          </span>
                        )}
                      </div>

                      {/* Main Showcase Image & Swatches */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 mb-3 border border-neutral-800 flex items-center justify-center">
                        <img
                          src={prod.colors[0]?.image}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-neutral-900/80 backdrop-blur-xs px-2 py-1 rounded-lg border border-neutral-700 text-xs font-mono font-bold text-yellow-400">
                          ${prod.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Name & Subtitle */}
                      <h4 className="font-display font-bold text-base text-white leading-tight">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                        {prod.subtitle}
                      </p>

                      {/* Color variants preview pills */}
                      <div className="mt-3 pt-2 border-t border-neutral-800/80">
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5 font-mono">
                          <span>{prod.colors.length} Color Swatches:</span>
                          <span>{prod.sizes.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                          {prod.colors.map((c, i) => (
                            <div
                              key={i}
                              className="group/c relative flex items-center gap-1 bg-neutral-900 px-2 py-1 rounded-lg border border-neutral-800 text-[11px]"
                              title={c.name}
                            >
                              <span
                                className="w-3 h-3 rounded-full border border-neutral-600"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="text-neutral-300 text-[10px] truncate max-w-[80px]">
                                {c.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenEditProduct(prod)}
                        className="flex-1 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Edit Product</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="p-2 rounded-xl bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 border border-neutral-800 hover:border-red-800 transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: CUSTOMER ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Orders Filter Bar */}
            <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by order #, customer, city, phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-yellow-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap ${
                        orderStatusFilter === st
                          ? 'bg-yellow-400 text-neutral-950 font-extrabold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>

            </div>

            {/* Orders List / Table */}
            {filteredOrders.length === 0 ? (
              <div className="py-16 text-center bg-neutral-950 rounded-3xl border border-neutral-800 p-8">
                <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No Orders Found</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
                  Abhi koi matching order nahi mila. Jab koi customer live store se order place karega, wo yahan real-time show hoga.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((ord) => {
                  const statusColors = {
                    pending: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
                    processing: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
                    shipped: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
                    delivered: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
                    cancelled: 'bg-red-500/20 text-red-300 border-red-500/50',
                  };

                  return (
                    <div
                      key={ord.id}
                      className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
                    >
                      {/* Top Row: Order ID, Status, Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-extrabold text-sm text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg border border-yellow-400/30">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(ord.createdAt).toLocaleString()}
                          </span>
                        </div>

                        {/* Status selector directly on card */}
                        <div className="flex items-center gap-2">
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              handleStatusChange(ord.id, e.target.value as CustomerOrder['status'])
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border focus:outline-none cursor-pointer uppercase ${
                              statusColors[ord.status]
                            }`}
                          >
                            <option value="pending" className="bg-neutral-900 text-white">Pending</option>
                            <option value="processing" className="bg-neutral-900 text-white">Processing</option>
                            <option value="shipped" className="bg-neutral-900 text-white">Shipped</option>
                            <option value="delivered" className="bg-neutral-900 text-white">Delivered</option>
                            <option value="cancelled" className="bg-neutral-900 text-white">Cancelled</option>
                          </select>

                          <button
                            onClick={() => setViewingOrder(ord)}
                            className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                            title="View Full Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteOrder(ord.id, ord.orderNumber)}
                            className="p-1.5 rounded-xl bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Middle: Customer & Address Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-neutral-500 font-mono uppercase text-[10px]">Customer</p>
                          <p className="font-bold text-white text-sm">{ord.customerName}</p>
                          <p className="text-neutral-400">{ord.phone}</p>
                          <p className="text-neutral-400">{ord.email}</p>
                        </div>

                        <div>
                          <p className="text-neutral-500 font-mono uppercase text-[10px]">Shipping Address</p>
                          <p className="text-neutral-200">{ord.address}</p>
                          <p className="text-neutral-400">{ord.city} - {ord.postalCode}</p>
                        </div>

                        <div>
                          <p className="text-neutral-500 font-mono uppercase text-[10px]">Payment & Total</p>
                          <p className="font-mono text-base font-extrabold text-yellow-400">
                            ${ord.total.toFixed(2)}
                          </p>
                          <p className="text-neutral-400 uppercase font-mono text-[11px]">
                            {ord.paymentMethod === 'cod' ? 'Cash On Delivery' : ord.paymentMethod.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="pt-2 border-t border-neutral-900 flex flex-wrap items-center gap-3">
                        <span className="text-[11px] font-mono text-neutral-500 uppercase">
                          Items ({ord.items.reduce((s, i) => s + i.quantity, 0)}):
                        </span>
                        {ord.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs"
                          >
                            <div className="w-7 h-7 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700 flex-shrink-0">
                              <img
                                src={item.selectedColor.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-white font-medium truncate max-w-[140px]">
                              {item.product.name}
                            </span>
                            <span className="text-yellow-400 font-mono font-bold text-[11px]">
                              {item.quantity}x
                            </span>
                            <span className="text-neutral-400 font-mono text-[10px]">
                              ({item.selectedSize} / {item.selectedColor.name})
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </main>

      {/* Product Add/Edit Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

      {/* Customer Order Full Detail Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-neutral-900 border-2 border-yellow-400 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-white">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono text-yellow-400 uppercase font-bold tracking-wider">
                  Customer Order Details
                </span>
                <h2 className="text-2xl font-black font-display text-white mt-0.5">
                  {viewingOrder.orderNumber}
                </h2>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs">
              <div className="space-y-1.5">
                <p className="text-neutral-400 font-mono uppercase text-[10px]">Recipient</p>
                <p className="font-bold text-sm text-white">{viewingOrder.customerName}</p>
                <p className="flex items-center gap-1.5 text-neutral-300">
                  <Phone className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{viewingOrder.phone}</span>
                </p>
                <p className="flex items-center gap-1.5 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{viewingOrder.email}</span>
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-neutral-400 font-mono uppercase text-[10px]">Delivery Address</p>
                <p className="flex items-start gap-1.5 text-neutral-200">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>{viewingOrder.address}, {viewingOrder.city} ({viewingOrder.postalCode})</span>
                </p>
                {viewingOrder.notes && (
                  <p className="text-neutral-400 italic text-[11px] pt-1 border-t border-neutral-800">
                    "Note: {viewingOrder.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase text-neutral-400 font-bold">
                Ordered T-Shirts ({viewingOrder.items.length})
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {viewingOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700 flex-shrink-0">
                        <img
                          src={item.selectedColor.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white">{item.product.name}</p>
                        <p className="text-neutral-400 text-[11px]">
                          Color: <strong className="text-neutral-200">{item.selectedColor.name}</strong> • Size: <strong className="text-neutral-200">{item.selectedSize}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono font-bold text-white">
                        {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                      <p className="font-mono text-yellow-400 font-bold text-xs">
                        ${(item.quantity * item.product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Summary */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">${viewingOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping Fee</span>
                <span className="font-mono text-white">
                  {viewingOrder.shipping === 0 ? 'FREE' : `$${viewingOrder.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-yellow-400 pt-2 border-t border-neutral-800">
                <span>Grand Total</span>
                <span className="font-mono">${viewingOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Status Change Footer in Detail Modal */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-mono">Current Status:</span>
                <select
                  value={viewingOrder.status}
                  onChange={(e) =>
                    handleStatusChange(viewingOrder.id, e.target.value as CustomerOrder['status'])
                  }
                  className="px-3 py-1.5 rounded-xl bg-neutral-800 text-yellow-400 border border-neutral-700 text-xs font-bold uppercase focus:outline-none cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => setViewingOrder(null)}
                className="px-5 py-2 rounded-xl bg-yellow-400 text-neutral-950 font-bold text-xs tracking-wider hover:bg-yellow-300 transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
