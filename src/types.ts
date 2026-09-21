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
