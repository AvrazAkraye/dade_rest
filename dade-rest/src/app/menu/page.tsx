'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MenuCard from '@/components/MenuCard';
import MenuModal from '@/components/MenuModal';
import Cart from '@/components/Cart';
import { MenuItem, Category } from '@/lib/types';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    initialCategory ? parseInt(initialCategory) : null
  );
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartUpdate, setCartUpdate] = useState(0);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory.toString());
    
    const res = await fetch(`/api/menu?${params.toString()}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [selectedCategory]);

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => setCategories(data));
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category_name || 'Other';
    if (!acc[category]) acc[category] = { items: [], name_en: item.category_name_en, image: '' };
    acc[category].items.push(item);
    return acc;
  }, {} as Record<string, { items: MenuItem[], name_en?: string, image: string }>);

  categories.forEach(cat => {
    if (groupedItems[cat.name]) groupedItems[cat.name].image = cat.image;
  });

  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(`cat-${categoryName}`);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors" dir="rtl">
      {/* Simple Header */}
      <div className="bg-amber-700 dark:bg-amber-900 text-white py-6 px-4 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">🍽️ قائمة الطعام</h1>
          <p className="text-amber-200 dark:text-amber-300 text-sm">Duhok - K.R.O | +964 750 812 2922</p>
        </div>
      </div>

      {/* Category Navigation - Horizontal Scroll */}
      <div className="sticky top-16 z-30 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm transition-colors">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 p-2 min-w-max">
            <button
              onClick={() => { setSelectedCategory(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedCategory 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(null);
                  setTimeout(() => scrollToCategory(cat.name), 100);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-600 transition-colors"
              >
                {cat.image} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-3 py-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-amber-500 border-t-transparent"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">😕</span>
            <p className="text-gray-500 dark:text-gray-400">لا توجد أطباق</p>
          </div>
        ) : (
          Object.entries(groupedItems).map(([category, { items: categoryItems, name_en, image }]) => (
            <div key={category} id={`cat-${category}`} className="mb-8">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4 sticky top-[120px] bg-gray-50 dark:bg-gray-900 py-2 z-20 transition-colors">
                <span className="text-2xl">{image}</span>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">{category}</h2>
                  {name_en && <p className="text-xs text-gray-400 dark:text-gray-500">{name_en}</p>}
                </div>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>
              
              {/* Items Grid - 2 columns on mobile, 3 on larger */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categoryItems.map((item) => (
                  <MenuCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Call Button */}
      <a
        href="tel:+9647508122922"
        className="fixed bottom-4 left-4 z-40 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      >
        <span className="text-2xl">📞</span>
      </a>

      {/* Modal */}
      <MenuModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)}
        onCartUpdate={() => setCartUpdate(prev => prev + 1)}
      />

      {/* Cart */}
      <Cart key={cartUpdate} />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-amber-500 border-t-transparent"></div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
