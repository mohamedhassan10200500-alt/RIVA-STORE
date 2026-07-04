import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ui/ProductCard';
import { products } from '../data/products';
import { Button } from '../components/ui/Button';

export function WishlistPage() {
  const { items, remove, count } = useWishlist();
  const wishlistProducts = products.filter(p => items.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            قائمة المفضلة فارغة
          </h1>
          <p className="text-gray-500 mb-6">
            أضف منتجاتك المفضلة لزيارتها لاحقاً
          </p>
          <Link to="/shop">
            <Button variant="primary">تصفح المنتجات</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
            قائمة المفضلة
          </h1>
          <p className="text-primary-100 text-center">
            {count} منتج في قائمة المفضلة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
