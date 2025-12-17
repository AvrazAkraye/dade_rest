import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 px-4 transition-colors">
      <div className="max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-bold text-lg">DADE REST</span>
        </div>
        <p className="text-amber-400 text-sm mb-4">Fast food</p>
        
        <div className="flex justify-center gap-4 mb-4 text-sm">
          <Link href="/menu" className="text-gray-400 hover:text-white transition-colors">القائمة</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">اتصل بنا</Link>
        </div>
        
        <p className="text-gray-400 text-sm mb-2">Duhok - K.R.O | +964 750 812 2922</p>
        
        {/* Location Section */}
        <div className="mt-6 mb-4">
          <h3 className="text-amber-400 font-bold mb-3">📍 موقعنا</h3>
          <p className="text-gray-400 text-sm mb-3">دهوك، إقليم كردستان العراق</p>
          <a
            href="https://maps.google.com/?q=36.8669,42.9503"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <span>🗺️</span>
            افتح في خرائط جوجل
          </a>
        </div>
        
        <p className="text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} DADE REST
        </p>
      </div>
    </footer>
  );
}
