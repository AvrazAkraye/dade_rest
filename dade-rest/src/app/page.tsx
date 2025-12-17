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
      <section className="bg-amber-700 dark:bg-amber-900 text-white py-12 px-4 text-center transition-colors">
        <span className="text-6xl block mb-4">🍽️</span>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">DADE REST</h1>
        <p className="text-amber-200 dark:text-amber-300 mb-1">Fast food</p>
        <p className="text-amber-300 dark:text-amber-400 text-sm mb-6">Duhok - K.R.O | +964 750 812 2922</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
          <Link
            href="/menu"
            className="bg-white text-amber-700 dark:bg-gray-800 dark:text-amber-400 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
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
      <section className="py-8 px-4 bg-white dark:bg-gray-800 transition-colors">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">الأقسام</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-2xl mx-auto">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="bg-amber-50 dark:bg-gray-700 rounded-xl p-3 text-center hover:bg-amber-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl block mb-1">{cat.image}</span>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-200 line-clamp-1">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-8 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">⭐ الأطباق المميزة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {featuredItems.slice(0, 8).map((item) => (
            <MenuCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/menu"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            عرض الكل ←
          </Link>
        </div>
      </section>

      {/* Location */}
      <section className="py-10 px-4 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-4xl block mb-3">📍</span>
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">موقعنا</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">دهوك، إقليم كردستان العراق</p>
          
          {/* Map Embed */}
          <div className="rounded-xl overflow-hidden mb-4 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.5!2d42.9503!3d36.8669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDUyJzAwLjgiTiA0MsKwNTcnMDEuMSJF!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
          
          <a
            href="https://maps.google.com/?q=36.8669,42.9503"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <span>🗺️</span>
            افتح في خرائط جوجل
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 px-4 bg-amber-600 dark:bg-amber-800 text-white text-center transition-colors">
        <span className="text-4xl block mb-3">📞</span>
        <h2 className="text-xl font-bold mb-2">جاهز للطلب؟</h2>
        <p className="text-amber-100 dark:text-amber-200 mb-4 text-sm">اتصل بنا الآن</p>
        <a
          href="tel:+9647508122922"
          className="inline-block bg-white text-amber-600 dark:bg-gray-800 dark:text-amber-400 px-6 py-3 rounded-xl font-bold transition-colors"
        >
          +964 750 812 2922
        </a>
      </section>

      <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
