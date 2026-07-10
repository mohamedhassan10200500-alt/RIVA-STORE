import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { products, categories, pantsStyles, fabricTypes, colorOptions, sortOptions } from '../data/products';
import { Drawer } from '../components/ui/Drawer';
import { Button } from '../components/ui/Button';

type SortValue = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedGender, setSelectedGender] = useState<string[]>(
    searchParams.get('gender') ? [searchParams.get('gender')!] : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedFabric, setSelectedFabric] = useState<string[]>([]);
  const [selectedPantsStyle, setSelectedPantsStyle] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortValue>('newest');

  const showDiscountOnly = searchParams.get('discount') === 'true';
  const showNewOnly = searchParams.get('new') === 'true';
  const showFeaturedOnly = searchParams.get('featured') === 'true';

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply URL params
    if (showDiscountOnly) {
      result = result.filter(p => p.discount);
    }
    if (showNewOnly) {
      result = result.filter(p => p.isNew);
    }
    if (showFeaturedOnly) {
      result = result.filter(p => p.isFeatured);
    }

    // Apply filters
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedGender.length > 0) {
      result = result.filter(p => selectedGender.includes(p.gender));
    }
    if (selectedColors.length > 0) {
      result = result.filter(p =>
        p.colors.some(c => selectedColors.includes(c.hex))
      );
    }
    if (selectedSizes.length > 0) {
      result = result.filter(p =>
        p.sizes.some(s => selectedSizes.includes(s))
      );
    }
    if (selectedFabric.length > 0) {
      result = result.filter(p => selectedFabric.includes(p.fabric));
    }
    if (selectedPantsStyle.length > 0) {
      result = result.filter(p =>
        p.pantsStyles.some(ps => selectedPantsStyle.includes(ps))
      );
    }
    if (inStockOnly !== null) {
      result = result.filter(p => p.inStock === inStockOnly);
    }

    // Price range
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.includes(query) ||
          p.nameEn.toLowerCase().includes(query) ||
          p.description.includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [
    selectedCategories,
    selectedGender,
    selectedColors,
    selectedSizes,
    priceRange,
    selectedFabric,
    selectedPantsStyle,
    inStockOnly,
    searchQuery,
    sortBy,
    showDiscountOnly,
    showNewOnly,
    showFeaturedOnly,
  ]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedGender([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 1000]);
    setSelectedFabric([]);
    setSelectedPantsStyle([]);
    setInStockOnly(null);
    setSearchQuery('');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          بحث
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="ابحث عن منتج..."
          className="input-field"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الفئة
        </label>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={e => {
                  setSelectedCategories(prev =>
                    e.target.checked
                      ? [...prev, cat.id]
                      : prev.filter(c => c !== cat.id)
                  );
                }}
                className="w-4 h-4 rounded border-gray-300 text-primary-500"
              />
              <span className="text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الجنس
        </label>
        <div className="space-y-2">
          {[
            { id: 'male', name: 'رجالي' },
            { id: 'female', name: 'حريمي' },
            { id: 'unisex', name: 'للجنسين' },
          ].map(g => (
            <label key={g.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGender.includes(g.id)}
                onChange={e => {
                  setSelectedGender(prev =>
                    e.target.checked
                      ? [...prev, g.id]
                      : prev.filter(x => x !== g.id)
                  );
                }}
                className="w-4 h-4 rounded border-gray-300 text-primary-500"
              />
              <span className="text-gray-700">{g.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          السعر: {priceRange[0]} - {priceRange[1]} ر.س
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={priceRange[1]}
          onChange={e => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اللون
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map(color => (
            <button
              key={color.hex}
              onClick={() => {
                setSelectedColors(prev =>
                  prev.includes(color.hex)
                    ? prev.filter(c => c !== color.hex)
                    : [...prev, color.hex]
                );
              }}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(color.hex)
                  ? 'border-primary-500 scale-110'
                  : 'border-gray-200'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          المقاس
        </label>
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <button
              key={size}
              onClick={() => {
                setSelectedSizes(prev =>
                  prev.includes(size)
                    ? prev.filter(s => s !== size)
                    : [...prev, size]
                );
              }}
              className={`w-12 h-12 rounded-lg border-2 font-medium transition-all ${
                selectedSizes.includes(size)
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
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
        <div className="space-y-2">
          {pantsStyles.map(style => (
            <label key={style.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPantsStyle.includes(style.id)}
                onChange={e => {
                  setSelectedPantsStyle(prev =>
                    e.target.checked
                      ? [...prev, style.id]
                      : prev.filter(s => s !== style.id)
                  );
                }}
                className="w-4 h-4 rounded border-gray-300 text-primary-500"
              />
              <span className="text-gray-700">{style.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fabric */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          نوع القماش
        </label>
        <div className="space-y-2">
          {fabricTypes.map(fabric => (
            <label key={fabric.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFabric.includes(fabric.name)}
                onChange={e => {
                  setSelectedFabric(prev =>
                    e.target.checked
                      ? [...prev, fabric.name]
                      : prev.filter(f => f !== fabric.name)
                  );
                }}
                className="w-4 h-4 rounded border-gray-300 text-primary-500"
              />
              <span className="text-gray-700">{fabric.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          التوفر
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={inStockOnly === null}
              onChange={() => setInStockOnly(null)}
              className="w-4 h-4 border-gray-300 text-primary-500"
            />
            <span className="text-gray-700">الكل</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={inStockOnly === true}
              onChange={() => setInStockOnly(true)}
              className="w-4 h-4 border-gray-300 text-primary-500"
            />
            <span className="text-gray-700">متوفر فقط</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={inStockOnly === false}
              onChange={() => setInStockOnly(false)}
              className="w-4 h-4 border-gray-300 text-primary-500"
            />
            <span className="text-gray-700">نفذت الكمية</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full"
      >
        مسح الفلاتر
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary-500 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
            المتجر
          </h1>
          <p className="text-primary-100 text-center">
            اكتشف مجموعتنا من الملابس الطبية الفاخرة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>الفلاتر</span>
            </button>
            <p className="text-gray-600">
              {filteredProducts.length} منتج
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortValue)}
              className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                الفلاتر
                <button
                  onClick={clearFilters}
                  className="text-sm font-normal text-primary-500 hover:text-primary-600"
                >
                  مسح الكل
                </button>
              </h3>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">
                  لا توجد منتجات مطابقة لبحثك
                </p>
                <Button onClick={clearFilters} variant="outline">
                  مسح الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="الفلاتر"
        position="right"
      >
        <FilterContent />
      </Drawer>
    </div>
  );
}
