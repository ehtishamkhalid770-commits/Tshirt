import { Product, CategoryCard } from '../types';

export const CATEGORY_ARCHES: CategoryCard[] = [
  {
    id: 'cat-men-tee',
    title: "MEN'S OVERSIZED TEES",
    badge: 'MENS',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    shape: 'pill',
    bgGradient: 'from-amber-100/90 via-yellow-50 to-white',
    buttonText: 'SHOP MEN TEES'
  },
  {
    id: 'cat-women-tee',
    title: "WOMEN'S RELAXED TEES",
    badge: 'WOMENS',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
    shape: 'arch',
    bgGradient: 'from-yellow-100/80 via-amber-50 to-white',
    buttonText: 'SHOP WOMEN TEES'
  },
  {
    id: 'cat-heavyweight',
    title: 'HEAVYWEIGHT GRAPHIC TEES',
    badge: 'NEW DROP',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80',
    shape: 'rect',
    bgGradient: 'from-yellow-200/60 via-yellow-50 to-white',
    buttonText: 'HEAVYWEIGHT TEES'
  },
  {
    id: 'cat-organic',
    title: 'ORGANIC COTTON ESSENTIALS',
    badge: 'BEST SELLERS',
    image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=700&q=80',
    shape: 'tall',
    bgGradient: 'from-amber-200/50 via-yellow-100/40 to-white',
    buttonText: 'ORGANIC ESSENTIALS'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'tee-1',
    name: "VOLT HEAVYWEIGHT BOX TEE",
    subtitle: "Sunburst Yellow & Jet Accent",
    price: 38,
    originalPrice: 48,
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewsCount: 284,
    category: 'men',
    fit: 'Oversized',
    description: "Crafted from 280 GSM heavyweight combed cotton with drop shoulders, ribbed crew collar, and high-density minimal Volt crest print.",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Electric Yellow',
        hex: '#EAB308',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Crisp White',
        hex: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Onyx Black',
        hex: '#18181B',
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'tee-2',
    name: "AERO RELAXED VIBE TEE",
    subtitle: "Warm Buttercup Yellow",
    price: 34,
    badge: 'NEW',
    rating: 4.8,
    reviewsCount: 162,
    category: 'women',
    fit: 'Relaxed',
    description: "Ultra-soft washed organic cotton tee featuring relaxed drape cut, pre-shrunk finish, and breathable weave for warm summer days.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      {
        name: 'Warm Buttercup',
        hex: '#FDE047',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Soft Pearl',
        hex: '#F4F4F5',
        image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Anthracite',
        hex: '#27272A',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'tee-3',
    name: "RAW EDGE URBAN GRAPHIC TEE",
    subtitle: "Amber Fade & Typography Graphic",
    price: 42,
    originalPrice: 50,
    badge: 'LIMITED',
    rating: 4.9,
    reviewsCount: 198,
    category: 'men',
    fit: 'Oversized',
    description: "Vintage enzyme stone-washed finish with water-based geometric typography print that gets softer with every wash.",
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      {
        name: 'Sun Gold',
        hex: '#FACC15',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'True White',
        hex: '#FAFAFA',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'tee-4',
    name: "MODERN BABY-TEE ESSENTIAL",
    subtitle: "Canary Yellow & Contrast Stitch",
    price: 30,
    badge: 'ORGANIC',
    rating: 4.7,
    reviewsCount: 114,
    category: 'women',
    fit: 'Slim',
    description: "Form-flattering cropped baby tee silhouette crafted from ribbed organic cotton with slight stretch and yellow micro-piping.",
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      {
        name: 'Canary Yellow',
        hex: '#EAB308',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Chalk White',
        hex: '#F8FAFC',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'tee-5',
    name: "CORE CREWNECK HEAVY TEE",
    subtitle: "Golden Maize & Minimal Tag",
    price: 36,
    badge: 'NEW',
    rating: 4.8,
    reviewsCount: 88,
    category: 'men',
    fit: 'Regular',
    description: "The everyday staple. 100% sustainable organic cotton with seamless tubular body construction and reinforced flatlock seams.",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Golden Maize',
        hex: '#CA8A04',
        image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Midnight Black',
        hex: '#09090B',
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Clean White',
        hex: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'tee-6',
    name: "OVERSIZED BOYFRIEND TEE",
    subtitle: "Pastel Lemon & Butter Yellow",
    price: 35,
    originalPrice: 42,
    badge: 'BESTSELLER',
    rating: 5.0,
    reviewsCount: 231,
    category: 'women',
    fit: 'Oversized',
    description: "Slouchy, effortless drape with wide sleeves and clean drop collar. Designed for casual layering or tucking into high-rise bottoms.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      {
        name: 'Pastel Lemon',
        hex: '#FEF08A',
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Bright Yellow',
        hex: '#EAB308',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Pure White',
        hex: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export const PROMO_STORIES = [
  {
    id: 'story-1',
    title: "Men's Heavyweight Tees",
    subtitle: '280 GSM premium combed cotton with durable structured silhouette.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    primaryCta: "SHOP MEN'S TEES",
    filterTarget: 'men'
  },
  {
    id: 'story-2',
    title: "Women's Relaxed Tees",
    subtitle: 'Featherlight organic cotton tees with effortless drape and soft touch.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    primaryCta: "SHOP WOMEN'S TEES",
    filterTarget: 'women'
  },
  {
    id: 'story-3',
    title: 'Bright Sunburst Drops',
    subtitle: 'Bold yellow hues and clean white staples for everyday style.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
    primaryCta: 'EXPLORE ALL TEES',
    filterTarget: 'all'
  }
];

export const VALUE_PILLARS = [
  {
    title: "100% ORGANIC COMBED COTTON",
    description: "Silky soft, pre-shrunk ringspun cotton that retains shape, vibrant color, and soft drape through hundreds of wash cycles.",
    icon: "Sparkles"
  },
  {
    title: "REINFORCED SEAMS & DROP FIT",
    description: "Built with double-needle hems, high-density ribbed collars, and tailored shoulder drops that never stretch out or sag.",
    icon: "ShieldCheck"
  },
  {
    title: "ETHICAL & SUSTAINABLE CRAFT",
    description: "Eco-certified natural dyes, zero plastic microfibers, zero harsh toxic bleaches, and 100% biodegradable recyclable packaging.",
    icon: "RotateCcw"
  }
];
