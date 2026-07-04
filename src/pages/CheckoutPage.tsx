import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Banknote,
  Smartphone,
  ChevronLeft,
  Check,
  Package,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';

const paymentMethods = [
  { id: 'cash', name: 'الدفع عند الاستلام', icon: Banknote },
  { id: 'visa', name: 'بطاقة ائتمان (Visa/Mastercard)', icon: CreditCard },
  { id: 'vodafone-cash', name: 'Vodafone Cash', icon: Smartphone },
];

const regions = [
  { value: '', label: 'اختر المنطقة' },
  { value: 'riyadh', label: 'الرياض' },
  { value: 'jeddah', label: 'جدة' },
  { value: 'makkah', label: 'مكة المكرمة' },
  { value: 'madinah', label: 'المدينة المنورة' },
  { value: 'dammam', label: 'الدمام' },
  { value: 'other', label: 'منطقة أخرى' },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, total, discount, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'مطلوب';
    if (!formData.lastName) newErrors.lastName = 'مطلوب';
    if (!formData.email) newErrors.email = 'مطلوب';
    if (!formData.phone) newErrors.phone = 'مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.address) newErrors.address = 'مطلوب';
    if (!formData.city) newErrors.city = 'مطلوب';
    if (!formData.region) newErrors.region = 'مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            سلة التسوق فارغة
          </h1>
          <Link to="/shop">
            <Button variant="primary">تصفح المنتجات</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              تم الطلب بنجاح!
            </h1>
            <p className="text-gray-600 mb-6">
              شكراً لك على طلبك. سيتم التواصل معك قريباً لتأكيد الطلب.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              رقم الطلب: #{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <div className="space-y-2">
              <Link to="/">
                <Button variant="primary" className="w-full">
                  العودة للرئيسية
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" className="w-full">
                  متابعة التسوق
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary-500 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white">
              الرئيسية
            </Link>
            <ChevronLeft className="w-4 h-4" />
            <Link to="/cart" className="hover:text-white">
              السلة
            </Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-white">الدفع</span>
          </nav>
          <h1 className="text-3xl font-bold text-white">إتمام الشراء</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: 'البيانات' },
                { num: 2, label: 'العنوان' },
                { num: 3, label: 'الدفع' },
              ].map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= s.num
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {s.num}
                    </div>
                    <span
                      className={`hidden sm:block ${
                        step >= s.num ? 'text-primary-500 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className="flex-1 h-0.5 bg-gray-200">
                      <div
                        className={`h-full bg-primary-500 transition-all ${
                          step > s.num ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step 1: Customer Info */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">البيانات الشخصية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="الاسم الأول"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  <Input
                    label="الاسم الأخير"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                  <Input
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Input
                    label="رقم الجوال"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">عنوان الشحن</h2>
                <div className="space-y-4">
                  <Input
                    label="العنوان"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="المدينة"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                    />
                    <Select
                      label="المنطقة"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      options={regions}
                    />
                  </div>
                  <Input
                    label="الرمز البريدي (اختياري)"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    dir="ltr"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ملاحظات (اختياري)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="input-field"
                      placeholder="تعليمات خاصة للتوصيل..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">طريقة الدفع</h2>
                <div className="space-y-4">
                  {paymentMethods.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-primary-500"
                      />
                      <method.icon className="w-6 h-6 text-gray-600" />
                      <span className="font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  السابق
                </Button>
              )}
              <Button
                variant="primary"
                onClick={handleNext}
                loading={isProcessing}
                className="flex-1"
              >
                {step < 3 ? 'التالي' : 'تأكيد الطلب'}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
              <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × {item.product.price} ر.س
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">المجموع الفرعي</span>
                  <span>{subtotal} ر.س</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>الخصم</span>
                    <span>-{discount} ر.س</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الشحن</span>
                  <span>{shipping > 0 ? `${shipping} ر.س` : 'مجاني'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-100">
                  <span>الإجمالي</span>
                  <span className="text-primary-500">{total} ر.س</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>التوصيل خلال 2-5 أيام عمل</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>ضمان استرجاع 14 يوم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
