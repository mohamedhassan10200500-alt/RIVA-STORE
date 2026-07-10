import React, { useState } from 'react';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isWishlisted = has(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, {
      color: product.colors[0],
      size: product.sizes[0],
      pantsStyle: product.pantsStyles[0],
    });
    showToast('تمت الإضافة إلى السلة بنجاح');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    showToast(
      isWishlisted ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة'
    );
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-[3/4] overflow-hidden"
      >
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-soft">
            خصم {product.discount}%
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-soft">
            جديد
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-1/2 -translate-y-1/2 left-3 p-3 rounded-full transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          } ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
          />
        </button>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className={`absolute top-1/2 -translate-y-1/2 mt-12 left-3 p-3 bg-white/90 text-gray-700 rounded-full transition-all duration-300 hover:bg-primary-500 hover:text-white ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            <Eye className="w-5 h-5" />
          </button>
        )}

        {/* Image Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-secondary-500 fill-secondary-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 mb-2 hover:text-primary-500 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-primary-500 text-lg">
            {product.price} ر.س
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              {product.oldPrice} ر.س
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5 mb-4">
          {product.colors.slice(0, 4).map((color, idx) => (
            <div
              key={idx}
              className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-400">
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 py-2.5 text-center text-sm font-medium border-2 border-primary-500 text-primary-500 rounded-xl hover:bg-primary-500 hover:text-white transition-all"
          >
            تفاصيل
          </Link>
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="flex-1 py-2.5 text-center text-sm font-medium bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            احجز الآن
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
              نفذت الكمية
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
