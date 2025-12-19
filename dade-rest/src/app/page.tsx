'use client';

import Link from 'next/link';
import { branches } from '@/lib/api';

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <span className="text-7xl block mb-6">☕</span>
        <h1 className="text-4xl sm:text-5xl font-black mb-3 text-amber-800 dark:text-amber-400">
          La Casetta Coffee
        </h1>
        <p className="text-amber-600 dark:text-amber-300 mb-2 text-lg">قهوة لا كاسيتا</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">اختر الفرع لعرض القائمة</p>
      </section>

      {/* Branch Selection */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            🏪 اختر الفرع
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <Link
                key={branch.id}
                href={`/branch/${branch.id}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-400 text-center"
              >
                <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">
                  {branch.image}
                </span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {branch.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {branch.name_en}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {branch.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                  عرض القائمة
                  <span className="group-hover:translate-x-[-4px] transition-transform">←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © 2024 La Casetta Coffee. جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  );
}
