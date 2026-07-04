import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CartItem, Product, ProductColor, PantsStyle } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, options: AddItemOptions) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discount: number;
}

interface AddItemOptions {
  color: ProductColor;
  size: string;
  pantsStyle: PantsStyle;
  pantsLength?: string;
  topLength?: string;
  embroidery?: { name: string; jobTitle: string; notes: string };
  quantity?: number;
}

interface Coupon {
  code: string;
  discountPercent: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_COST = 50;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('riva-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('riva-coupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('riva-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('riva-coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('riva-coupon');
    }
  }, [appliedCoupon]);

  const addItem = useCallback((product: Product, options: AddItemOptions) => {
    const id = `${product.id}-${options.color.hex}-${options.size}-${options.pantsStyle}-${Date.now()}`;
    const newItem: CartItem = {
      id,
      product,
      quantity: options.quantity || 1,
      selectedColor: options.color,
      selectedSize: options.size,
      selectedPantsStyle: options.pantsStyle,
      pantsLength: options.pantsLength,
      topLength: options.topLength,
      embroidery: options.embroidery,
    };
    setItems(prev => [...prev, newItem]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const discount = appliedCoupon
    ? Math.round(subtotal * (appliedCoupon.discountPercent / 100))
    : 0;

  const total = subtotal - discount + shipping;

  const applyCoupon = useCallback((code: string): boolean => {
    const validCoupons: Record<string, number> = {
      'RIVA10': 10,
      'WELCOME15': 15,
      'VIP20': 20,
    };
    const discountPercent = validCoupons[code.toUpperCase()];
    if (discountPercent) {
      setAppliedCoupon({ code: code.toUpperCase(), discountPercent });
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        total,
        discount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen(prev => !prev),
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
