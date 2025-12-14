import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-bold text-lg">DADE REST</span>
        </div>
        <p className="text-amber-400 text-sm mb-4">Fast food</p>
        
        <div className="flex justify-center gap-4 mb-4 text-sm">
          <Link href="/menu" className="text-gray-400 hover:text-white">القائمة</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white">اتصل بنا</Link>
        </div>
        
        <p className="text-gray-400 text-sm mb-2">Duhok - K.R.O | +964 750 812 2922</p>
        
        <p className="text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} DADE REST
        </p>
      </div>
    </footer>
  );
}
