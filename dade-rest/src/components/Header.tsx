'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-amber-800 text-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <div>
            <h1 className="font-bold text-lg leading-tight">DADE REST</h1>
            <p className="text-[10px] text-amber-200">Fast food</p>
          </div>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-2">
          <Link href="/menu" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
            القائمة
          </Link>
          <Link href="/contact" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
            اتصل بنا
          </Link>
          <a 
            href="tel:+9647508122922"
            className="bg-green-500 px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
          >
            <span>📞</span>
            <span className="hidden sm:inline">اطلب</span>
          </a>
        </div>
      </div>
    </header>
  );
}
