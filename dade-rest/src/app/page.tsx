'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MenuCard from '@/components/MenuCard';
import MenuModal from '@/components/MenuModal';
import { MenuItem, Category } from '@/lib/types';

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetch('/api/menu?featured=true').then(res => res.json()).then(setFeaturedItems);
    fetch('/api/categories').then(res => res.json()).then(setCategories);
  }, []);

  return (
    <div dir="rtl">
      {/* Hero */}
      <section className="bg-amber-700 text-white py-12 px-4 text-center">
        <span className="text-6xl block mb-4">🍽️</span>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">DADE REST</h1>
        <p className="text-amber-200 mb-1">Fast food</p>
        <p className="text-amber-300 text-sm mb-6">Duhok - K.R.O | +964 750 812 2922</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
          <Link
            href="/menu"
            className="bg-white text-amber-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <span>🍕</span> تصفح القائمة
          </Link>
          <a
            href="tel:+9647508122922"
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <span>📞</span> اطلب الآن
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-white">
        <h2 className="text-xl font-bold text-center mb-6">الأقسام</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-2xl mx-auto">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="bg-amber-50 rounded-xl p-3 text-center hover:bg-amber-100 transition-colors"
            >
              <span className="text-2xl block mb-1">{cat.image}</span>
              <p className="text-xs font-medium text-gray-700 line-clamp-1">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-8 px-4 bg-gray-50">
        <h2 className="text-xl font-bold text-center mb-6">⭐ الأطباق المميزة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {featuredItems.slice(0, 8).map((item) => (
            <MenuCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/menu"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            عرض الكل ←
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 px-4 bg-amber-600 text-white text-center">
        <span className="text-4xl block mb-3">📞</span>
        <h2 className="text-xl font-bold mb-2">جاهز للطلب؟</h2>
        <p className="text-amber-100 mb-4 text-sm">اتصل بنا الآن</p>
        <a
          href="tel:+9647508122922"
          className="inline-block bg-white text-amber-600 px-6 py-3 rounded-xl font-bold"
        >
          +964 750 812 2922
        </a>
      </section>

      <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
