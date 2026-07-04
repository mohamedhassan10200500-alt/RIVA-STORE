import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { products, categories } from '../data/products';

const features = [
  {
    icon: Truck,
    title: 'توصيل مجاني',
    desc: 'للطلبات فوق 1000 ر.س',
  },
  {
    icon: Shield,
    title: 'ضمان الجودة',
    desc: 'منتجات أصلية ومضمونة',
  },
  {
    icon: RefreshCw,
    title: 'إرجاع سهل',
    desc: 'استرجاع خلال 14 يوم',
  },
];

export function HomePage() {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const saleProducts = products.filter(p => p.discount).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1631217868744-256c0d6e8a0c?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-primary-500/80 via-primary-600/60 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          <div className="max-w-xl animate-slide-up">
            <span className="inline-block mb-4 px-4 py-2 bg-secondary-500 text-white text-sm font-medium rounded-full">
              مجموعة جديدة 2024
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              اكتشف الفخامة
              <br />
              في كل تفصيل
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              ملابس طبية فاخرة تجمع بين الأناقة والاحترافية. تصميمات حصرية
              لأطباء وممرضي المستقبل.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary-500 text-white font-medium rounded-xl hover:bg-secondary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                تسوق الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all"
              >
                اعرف أكثر
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{feature.title}</h4>
                  <p className="text-primary-100 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              تصفح حسب الفئة
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              اختر من بين مجموعة واسعة من الملابس الطبية المصممة خصيصاً لك
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    category.id === 'classic'
                      ? '1582719471384-89ccf5cedd0a'
                      : category.id === 'elegant'
                      ? '1612349317150-e413f6a3b836'
                      : category.id === 'sporty'
                      ? '1603398942828-9dc2ce8c5e6c'
                      : category.id === 'professional'
                      ? '1584036561586-c0b4a3f8b8b0'
                      : '1579684382343-6cd6c1c77065'
                  }?w=400&h=400&fit=crop`}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/80 via-primary-500/40 to-transparent group-hover:from-primary-600/90 transition-all" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                منتجات مميزة
              </h2>
              <p className="text-gray-600">الأكثر طلباً من عملائنا</p>
            </div>
            <Link
              to="/shop?featured=true"
              className="hidden sm:inline-flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
            >
              عرض الكل
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/shop?featured=true"
              className="inline-flex items-center gap-2 text-primary-500 font-medium"
            >
              عرض الكل
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-right">
              <span className="inline-block mb-4 px-4 py-2 bg-secondary-500 text-white text-sm font-medium rounded-full">
                عرض خاص
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                خصم يصل إلى 30%
              </h2>
              <p className="text-primary-100 text-lg max-w-lg mb-8">
                اغتنم الفرصة واحصل على أفضل الملابس الطبية بأسعار لا تُقاوم
              </p>
              <Link
                to="/shop?discount=true"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary-500 text-white font-medium rounded-xl hover:bg-secondary-600 transition-all"
              >
                تسوق العروض
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1551076803-e2ab9cac8a3e?w=600&h=400&fit=crop"
              alt="عرض خاص"
              className="w-full max-w-md rounded-2xl shadow-soft-lg"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                وصل حديثاً
              </h2>
              <p className="text-gray-600">أحدث المنتجات في متجرنا</p>
            </div>
            <Link
              to="/shop?new=true"
              className="hidden sm:inline-flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
            >
              عرض الكل
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                عروض خاصة
              </h2>
              <p className="text-gray-600">خصومات لا تُفوت</p>
            </div>
            <Link
              to="/shop?discount=true"
              className="hidden sm:inline-flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
            >
              عرض الكل
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ماذا يقول عملاؤنا
            </h2>
            <p className="text-gray-600">آراء حقيقية من عملائنا الكرام</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'د. سارة الأحمد',
                role: 'طبيبة أطفال',
                review:
                  'جودة ممتازة وتصميم أنيق. أفضل ملابس طبية اشتريتها على الإطلاق!',
                rating: 5,
              },
              {
                name: 'د. محمد العمري',
                role: 'جراح',
                review:
                  'راحة لا تُصدق أثناء العمليات الطويلة. أنصح بها بشدة.',
                rating: 5,
              },
              {
                name: 'م. نورة الحربي',
                role: 'ممرضة',
                review:
                  'تصميم عصري وعملي. خدمة العملاء رائعة والتوصيل سريع.',
                rating: 5,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-secondary-500 fill-secondary-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{item.review}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-500 font-bold">
                      {item.name[2]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
