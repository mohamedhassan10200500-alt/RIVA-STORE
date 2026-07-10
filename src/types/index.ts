export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  gender: 'male' | 'female' | 'unisex';
  colors: ProductColor[];
  sizes: string[];
  pantsStyles: PantsStyle[];
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  description: string;
  fabric: string;
}

export interface ProductColor {
  name: string;
  nameEn: string;
  hex: string;
}

export type PantsStyle = 'regular' | 'wide-leg' | 'charleston' | 'jogger';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: string;
  selectedPantsStyle: PantsStyle;
  pantsLength?: string;
  topLength?: string;
  embroidery?: Embroidery;
}

export interface Embroidery {
  name: string;
  jobTitle: string;
  notes: string;
}

export interface FilterState {
  category: string[];
  gender: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  fabric: string[];
  pantsStyle: string[];
  inStock: boolean | null;
  search: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
}

export type PaymentMethod = 'cash' | 'visa' | 'vodafone-cash';

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
