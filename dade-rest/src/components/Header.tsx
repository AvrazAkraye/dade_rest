'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="bg-amber-800 dark:bg-gray-800 text-white sticky top-0 z-50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <div>
            <h1 className="font-bold text-lg leading-tight">DADE REST</h1>
            <p className="text-[10px] text-amber-200 dark:text-gray-400">Fast food</p>
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
          
          {/* Dark Mode Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
          
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
