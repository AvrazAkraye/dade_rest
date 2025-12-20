'use client';

import Link from 'next/link';
import Image from 'next/image';

const PHONE_NUMBER = '07509002825';
const INSTAGRAM = '@lacasetta_coffee';

const branches = [
  { id: 1, name: 'دهوك', name_en: 'Duhok La Casetta', description: 'شارع المطاعم - أكري', image: '☕', url: '/lacasettaduhok' },
  { id: 2, name: 'سيجي', name_en: 'Seche La Casetta', description: 'سيجي - دهوك', image: '🏪', url: '/lacasettaseche' },
];

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-[#fdf8f8] to-white dark:from-gray-900 dark:to-gray-800">
      <section className="py-12 px-4 text-center">
        <Image src="/lacasetta-logo.png" alt="La Casetta Coffee" width={120} height={120} className="mx-auto mb-6" />
        <h1 className="font-english text-4xl sm:text-5xl font-bold mb-3 text-primary dark:text-[#a98585]">La Casetta Coffee</h1>
        <p className="text-primary/70 dark:text-[#a98585]/80 mb-2 text-lg">قهوة لا كاسيتا</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm mt-6 mb-8">
          <a href={`tel:+964${PHONE_NUMBER}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary"><span>📞</span> {PHONE_NUMBER}</a>
          <a href="https://instagram.com/lacasetta_coffee" target="_blank" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary"><span>📷</span> {INSTAGRAM}</a>
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><span>📍</span> Duhok, Iraq</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">اختر الفرع لعرض القائمة</p>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8 text-gray-800 dark:text-white">🏪 اختر الفرع</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <Link key={branch.id} href={branch.url}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary text-center">
                <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">{branch.image}</span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{branch.name}</h3>
                <p className="font-english text-sm text-primary dark:text-[#a98585] mb-1">{branch.name_en}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{branch.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-primary dark:text-[#a98585] font-medium">
                  عرض القائمة <span className="group-hover:translate-x-[-4px] transition-transform">←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 text-center border-t dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 <span className="font-english">La Casetta Coffee</span>. جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
