import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  items: string[];
  add: (productId: string) => void;
  remove: (productId: string) => void;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  count: number;
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('riva-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('riva-wishlist', JSON.stringify(items));
  }, [items]);

  const add = (productId: string) => {
    setItems(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const remove = (productId: string) => {
    setItems(prev => prev.filter(id => id !== productId));
  };

  const toggle = (productId: string) => {
    setItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const has = (productId: string) => items.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        items,
        add,
        remove,
        toggle,
        has,
        count: items.length,
        isOpen,
        openWishlist: () => setIsOpen(true),
        closeWishlist: () => setIsOpen(false),
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
