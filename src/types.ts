export interface ColorOption {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  badge?: 'NEW' | 'BESTSELLER' | 'LIMITED' | 'ORGANIC';
  rating: number;
  reviewsCount: number;
  category: 'men' | 'women';
  fit: 'Oversized' | 'Regular' | 'Relaxed' | 'Slim';
  colors: ColorOption[];
  description: string;
  sizes: string[];
  stock?: number;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  quantity: number;
}

export interface CategoryCard {
  id: string;
  title: string;
  badge: string;
  image: string;
  shape: 'pill' | 'arch' | 'rect' | 'tall';
  bgGradient: string;
  buttonText: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
  paymentMethod: 'cod' | 'card' | 'easypaisa' | 'jazzcash';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}
