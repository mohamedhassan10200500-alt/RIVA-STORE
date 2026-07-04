import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, X, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totalItems,
  } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      setCouponCode('');
      setCouponError(false);
    } else {
      setCouponError(true);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-[420px] bg-white z-50 transform transition-transform duration-300 ease-out overflow-hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary-500" />
            <h2 className="text-lg font-bold">
              سلة التسوق ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              السلة فارغة
            </h3>
            <p className="text-gray-500 mb-6">
              اكتشف منتجاتنا الرائعة وأضفها لسلتك
            </p>
            <Button variant="primary" onClick={closeCart}>
              تصفح المنتجات
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="font-medium text-gray-900 hover:text-primary-500 line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                      <p>
                        اللون: {item.selectedColor.name}
                      </p>
                      <p>
                        المقاس: {item.selectedSize}
                      </p>
                      <p>
                        القصة: {item.selectedPantsStyle === 'regular' ? 'عادي' : item.selectedPantsStyle === 'wide-leg' ? 'واسع' : item.selectedPantsStyle === 'charleston' ? 'شارلستون' : 'جوجر'}
                      </p>
                      {item.embroidery?.name && (
                        <p className="text-primary-500">تطريز: {item.embroidery.name}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold text-primary-500">
                        {item.product.price * item.quantity} ر.س
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4 space-y-4 bg-white">
              {/* Coupon */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        كود {appliedCoupon.code} (-{appliedCoupon.discountPercent}
                        %)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-sm text-red-500 hover:underline"
                    >
                      إزالة
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => {
                        setCouponCode(e.target.value);
                        setCouponError(false);
                      }}
                      placeholder="كود الخصم"
                      className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        couponError
                          ? 'border-red-500'
                          : 'border-gray-200'
                      }`}
                    />
                    <Button variant="outline" onClick={handleApplyCoupon}>
                      تطبيق
                    </Button>
                  </div>
                )}
                {couponError && (
                  <p className="text-sm text-red-500">كود خصم غير صالح</p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">المجموع الفرعي</span>
                  <span className="text-gray-900">{subtotal} ر.س</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>-{discount} ر.س</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    الشحن {shipping === 0 && 'مجاني'}
                  </span>
                  <span className="text-gray-900">
                    {shipping > 0 ? `${shipping} ر.س` : 'مجاني'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-bold text-gray-900">الإجمالي</span>
                  <span className="font-bold text-primary-500 text-lg">
                    {total} ر.س
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Link to="/checkout" onClick={closeCart} className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    إتمام الشراء
                  </Button>
                </Link>
                <Link to="/shop" onClick={closeCart}>
                  <Button variant="ghost" className="w-full">
                    متابعة التسوق
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
