import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';

const quickLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'المتجر', path: '/shop' },
  { name: 'من نحن', path: '/about' },
  { name: 'تواصل معنا', path: '/contact' },
];

const customerService = [
  { name: 'سياسة الشحن', path: '/shipping-policy' },
  { name: 'سياسة الإرجاع', path: '/return-policy' },
  { name: 'الأسئلة الشائعة', path: '/faq' },
  { name: 'تتبع طلبك', path: '/track-order' },
];

const paymentMethods = [
  { name: 'Visa', icon: '💳' },
  { name: 'Mastercard', icon: '💳' },
  { name: 'مدى', icon: '💳' },
  { name: 'Apple Pay', icon: '🍎' },
  { name: 'STC Pay', icon: '📱' },
];

export function Footer() {
  return (
    <footer className="bg-primary-500 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-right">
              <h3 className="text-2xl font-bold mb-2">
                اشترك في نشرتنا البريدية
              </h3>
              <p className="text-primary-100">
                احصل على آخر العروض والمنتجات الجديدة
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 min-w-[280px]"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-secondary-500 text-white font-medium rounded-xl hover:bg-secondary-600 transition-colors"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About */}
            <div>
              <h2 className="text-3xl font-bold mb-6">RIVA</h2>
              <p className="text-primary-100 mb-6 leading-relaxed">
                RIVA هي علامة تجارية رائدة في ملابس الطبية الفاخرة. نقدم
                تصميمات عصرية وجودة عالية تلبي احتياجات المحترفين في المجال
                الطبي.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-500 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-500 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-500 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-500 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-primary-100 hover:text-secondary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-bold mb-6">خدمة العملاء</h4>
              <ul className="space-y-3">
                {customerService.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-primary-100 hover:text-secondary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">تواصل معنا</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-primary-100">
                    الرياض، المملكة العربية السعودية
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <a
                    href="tel:+966123456789"
                    className="text-primary-100 hover:text-secondary-500 transition-colors"
                    dir="ltr"
                  >
                    +966 12 345 6789
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a
                    href="mailto:info@riva.com"
                    className="text-primary-100 hover:text-secondary-500 transition-colors"
                  >
                    info@riva-med.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-100 text-sm">
              © 2024 RIVA. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              {paymentMethods.map(method => (
                <div
                  key={method.name}
                  className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-lg"
                  title={method.name}
                >
                  {method.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
