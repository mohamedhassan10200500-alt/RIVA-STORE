import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Check,
  Minus,
  Plus,
  ChevronLeft,
} from 'lucide-react';
import { products, pantsStyles } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';

export function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [selectedPantsStyle, setSelectedPantsStyle] = useState<PantsStyle>(
    product?.pantsStyles[0] as PantsStyle
  );
  const [pantsLength, setPantsLength] = useState('');
  const [topLength, setTopLength] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showEmbroidery, setShowEmbroidery] = useState(false);
  const [embroidery, setEmbroidery] = useState({
    name: '',
    jobTitle: '',
    notes: '',
  });
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            المنتج غير موجود
          </h1>
          <Link to="/shop" className="text-primary-500 hover:underline">
            العودة للمتجر
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = has(product.id);

  const handleAddToCart = () => {
    addItem(product, {
      color: selectedColor!,
      size: selectedSize!,
      pantsStyle: selectedPantsStyle,
      pantsLength,
      topLength,
      embroidery: showEmbroidery ? embroidery : undefined,
      quantity,
    });
    showToast('تمت الإضافة إلى السلة بنجاح');
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const reviews = [
    {
      id: '1',
      author: 'د. أحمد محمد',
      rating: 5,
      comment: 'جودة ممتازة وقماش مريح جداً. أنصح به بشدة.',
      date: '2024-01-15',
    },
    {
      id: '2',
      author: 'م. سارة العلي',
      rating: 4,
      comment: 'تصميم أنيق ومقاس مناسب. الشحن كان سريع.',
      date: '2024-01-10',
    },
    {
      id: '3',
      author: 'د. خالد الغامدي',
      rating: 5,
      comment: 'أفضل يونيفورم طبي اشتريته. يستحق كل ريال.',
      date: '2024-01-05',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-500">
              الرئيسية
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
            <Link to="/shop" className="text-gray-500 hover:text-primary-500">
              المتجر
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className={`relative aspect-[3/4] rounded-2xl overflow-hidden bg-white cursor-zoom-in ${
                isZoomed ? 'cursor-zoom-out' : ''
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              />
              {/* Badges */}
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  خصم {product.discount}%
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-primary-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  جديد
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-primary-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-500 mb-4">{product.nameEn}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-secondary-500 fill-secondary-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} تقييم)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary-500">
                  {product.price} ر.س
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.oldPrice} ر.س
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اللون
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor?.hex === color.hex
                        ? 'border-primary-500 scale-110'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor?.hex === color.hex && (
                      <Check
                        className={`w-5 h-5 ${
                          color.hex === '#ffffff' ? 'text-gray-900' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-500 mt-1">
                  {selectedColor.name}
                </p>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المقاس
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Pants Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                قصة البنطلون
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {pantsStyles.map(style => (
                  <button
                    key={style.id}
                    disabled={!product.pantsStyles.includes(style.id as PantsStyle)}
                    onClick={() => setSelectedPantsStyle(style.id as PantsStyle)}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      selectedPantsStyle === style.id
                        ? 'bg-primary-500 text-white border-primary-500'
                        : product.pantsStyles.includes(style.id as PantsStyle)
                        ? 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        : 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Lengths */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  طول البنطلون (اختياري)
                </label>
                <select
                  value={pantsLength}
                  onChange={e => setPantsLength(e.target.value)}
                  className="input-field"
                >
                  <option value="">اختر الطول</option>
                  {['S', 'M', 'L', 'XL', 'XXL'].map(len => (
                    <option key={len} value={len}>
                      {len}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  طول التيشيرت (اختياري)
                </label>
                <select
                  value={topLength}
                  onChange={e => setTopLength(e.target.value)}
                  className="input-field"
                >
                  <option value="">اختر الطول</option>
                  {['S', 'M', 'L', 'XL', 'XXL'].map(len => (
                    <option key={len} value={len}>
                      {len}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Embroidery */}
            <div className="border border-gray-200 rounded-xl p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEmbroidery}
                  onChange={e => setShowEmbroidery(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary-500"
                />
                <span className="font-medium text-gray-900">
                  إضافة تطريز مخصص (+50 ر.س)
                </span>
              </label>

              {showEmbroidery && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم
                    </label>
                    <input
                      type="text"
                      value={embroidery.name}
                      onChange={e =>
                        setEmbroidery(prev => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="د. أحمد"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المسمى الوظيفي
                    </label>
                    <input
                      type="text"
                      value={embroidery.jobTitle}
                      onChange={e =>
                        setEmbroidery(prev => ({
                          ...prev,
                          jobTitle: e.target.value,
                        }))
                      }
                      placeholder="طبيب"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ملاحظات
                    </label>
                    <textarea
                      value={embroidery.notes}
                      onChange={e =>
                        setEmbroidery(prev => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="تفاصيل إضافية..."
                      rows={2}
                      className="input-field"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الكمية
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <span className="text-gray-500">
                  {product.inStock ? 'متوفر' : 'نفذت الكمية'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                icon={<ShoppingCart className="w-5 h-5" />}
              >
                أضف للسلة
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                اشتري الآن
              </Button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  toggle(product.id);
                  showToast(
                    isWishlisted
                      ? 'تمت الإزالة من المفضلة'
                      : 'تمت الإضافة إلى المفضلة'
                  );
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isWishlisted
                    ? 'bg-red-50 text-red-500'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
                />
                <span>{isWishlisted ? 'إزالة من المفضلة' : 'أضف للمفضلة'}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>مشاركة</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                <p className="text-sm text-gray-600">توصيل مجاني</p>
                <p className="text-xs text-gray-400">لطلبات +1000 ر.س</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                <p className="text-sm text-gray-600">ضمان الجودة</p>
                <p className="text-xs text-gray-400">منتجات أصلية</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                <p className="text-sm text-gray-600">إرجاع سهل</p>
                <p className="text-xs text-gray-400">خلال 14 يوم</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              تفاصيل المنتج
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">المواصفات</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-500">القماش</span>
                    <span className="font-medium">{product.fabric}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">الفئة</span>
                    <span className="font-medium">
                      {product.gender === 'male'
                        ? 'رجالي'
                        : product.gender === 'female'
                        ? 'حريمي'
                        : 'للجنسين'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">التوفر</span>
                    <span
                      className={`font-medium ${
                        product.inStock ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {product.inStock ? 'متوفر' : 'نفذت الكمية'}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">الوصف</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description} هذا المنتج مصمم بعناية فائقة ليوفر لك
                  الراحة والأناقة طوال يوم العمل. الخامات المستخدمة عالية
                  الجودة ومقاومة للتجعد، مما يضمن لك مظهراً احترافياً في كل
                  الأوقات.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                آراء العملاء
              </h2>
              <Button variant="outline">أضف تقييمك</Button>
            </div>

            <div className="space-y-6">
              {reviews.map(review => (
                <div
                  key={review.id}
                  className="pb-6 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="font-bold text-primary-500">
                          {review.author[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {review.author}
                        </p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-secondary-500 fill-secondary-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              منتجات مشابهة
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type PantsStyle = 'regular' | 'wide-leg' | 'charleston' | 'jogger';
