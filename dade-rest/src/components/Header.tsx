'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on a branch page
  const isBranchPage = pathname?.startsWith('/lacasetta');

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

  // Hide header on branch pages (they have their own header)
  if (isBranchPage) {
    return null;
  }

  return (
    <header className="bg-primary dark:bg-gray-800 text-white sticky top-0 z-50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/lacasetta-logo.png" alt="La Casetta Coffee" width={40} height={40} className="rounded-full" />
          <div>
            <h1 className="font-english font-bold text-lg leading-tight">La Casetta</h1>
            <p className="font-english text-[10px] text-white/70">Coffee</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {mounted && (
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Toggle dark mode">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
