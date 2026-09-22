import { Product, CustomerOrder } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const PRODUCTS_STORAGE_KEY = 'ilovetshirts_products_v1';
const ORDERS_STORAGE_KEY = 'ilovetshirts_orders_v1';
const ADMIN_AUTH_KEY = 'ilovetshirts_admin_session';

// Initial sample orders for admin preview if none exist
const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-78219',
    customerName: 'Muhammad Hamza',
    email: 'hamza.cloth@gmail.com',
    phone: '+92 301 4567890',
    address: 'House #42, Street 8, Gulberg III',
    city: 'Lahore',
    postalCode: '54000',
    notes: 'Please call before delivery',
    paymentMethod: 'cod',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        selectedSize: 'L',
        quantity: 2,
      },
      {
        product: INITIAL_PRODUCTS[1],
        selectedColor: INITIAL_PRODUCTS[1].colors[0],
        selectedSize: 'M',
        quantity: 1,
      },
    ],
    subtotal: 110,
    shipping: 0,
    total: 110,
    status: 'processing',
    createdAt: '2026-09-21T10:30:00.000Z',
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-78220',
    customerName: 'Ayesha Tariq',
    email: 'ayesha.tariq@outlook.com',
    phone: '+92 321 9876543',
    address: 'Flat 4B, Sunset Boulevard, Phase 6 DHA',
    city: 'Karachi',
    postalCode: '75500',
    paymentMethod: 'card',
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        selectedColor: INITIAL_PRODUCTS[3].colors[0],
        selectedSize: 'S',
        quantity: 1,
      },
    ],
    subtotal: 30,
    shipping: 4.99,
    total: 34.99,
    status: 'pending',
    createdAt: '2026-09-22T08:15:00.000Z',
  },
];

// Product Store functions
export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('products_updated'));
  } catch (err) {
    console.error('Error saving products:', err);
  }
}

// Order Store functions
export function getStoredOrders(): CustomerOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveStoredOrders(orders: CustomerOrder[]): void {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('orders_updated'));
  } catch (err) {
    console.error('Error saving orders:', err);
  }
}

export function addCustomerOrder(newOrder: Omit<CustomerOrder, 'id' | 'orderNumber' | 'createdAt'>): CustomerOrder {
  const current = getStoredOrders();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const created: CustomerOrder = {
    ...newOrder,
    id: `ord-${Date.now()}`,
    orderNumber: `ORD-${randomSuffix}`,
    createdAt: new Date().toISOString(),
  };

  const updated = [created, ...current];
  saveStoredOrders(updated);
  return created;
}

export function updateOrderStatus(orderId: string, status: CustomerOrder['status']): void {
  const current = getStoredOrders();
  const updated = current.map((ord) => (ord.id === orderId ? { ...ord, status } : ord));
  saveStoredOrders(updated);
}

export function deleteCustomerOrder(orderId: string): void {
  const current = getStoredOrders();
  const updated = current.filter((ord) => ord.id !== orderId);
  saveStoredOrders(updated);
}

// Admin Auth check
export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function setAdminLoggedIn(value: boolean): void {
  if (value) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
