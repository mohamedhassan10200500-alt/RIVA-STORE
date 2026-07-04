import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { products, categories } from '../../data/products';

const navLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'المتجر', path: '/shop' },
  { name: 'رجالي', path: '/shop?gender=male' },
  { name: 'حريمي', path: '/shop?gender=female' },
  { name: 'العروض', path: '/shop?discount=true' },
  { name: 'تواصل معنا', path: '/contact' },
];

export function Header() {
  const location = useLocation();
  const { totalItems, toggleCart } = useCart();
  const { count } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = products.filter(
        p =>
          p.name.includes(searchQuery) ||
          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.includes(searchQuery)
      );
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
        <p className="px-4">
          توصيل مجاني للطلبات فوق 1000 ر.س | خصم 15% على أول طلب - استخدم كود:
          WELCOME15
        </p>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-soft'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-bold">
                <span className="text-primary-500">RIVA</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path ||
                    (link.path !== '/' && location.pathname.startsWith(link.path))
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                </button>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-soft-lg border border-gray-100 p-4 animate-slide-down z-50">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="ابحث عن منتج..."
                        className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        autoFocus
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>

                    {searchResults.length > 0 && (
                      <div className="mt-2 divide-y divide-gray-100">
                        {searchResults.map(product => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg px-2"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">
                                {product.name}
                              </p>
                              <p className="text-sm text-primary-500">
                                {product.price} ر.س
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Heart className="w-5 h-5 text-gray-700" />
                {count > 0 && (
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-secondary-500 text-white text-xs rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -left-1 w-5 h-6 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Account */}
              <Link
                to="/account"
                className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-gray-700" />
              </Link>
            </div>
          </div>

          {/* Categories Bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 py-2 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-500">تصفح:</span>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity ${
          isMobileMenuOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 overflow-y-auto lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary-500">RIVA</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary-500 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              to="/wishlist"
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary-500"
            >
              <Heart className="w-5 h-5" />
              <span>المفضلة</span>
              {count > 0 && (
                <span className="bg-secondary-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary-500"
            >
              <User className="w-5 h-5" />
              <span>حسابي</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
