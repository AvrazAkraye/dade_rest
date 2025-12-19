import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 px-4 transition-colors">
      <div className="max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">☕</span>
          <span className="font-bold text-lg">La Casetta Coffee</span>
        </div>
        <p className="text-amber-400 text-sm mb-4">قهوة لا كاسيتا</p>
        
        <div className="flex justify-center gap-4 mb-4 text-sm">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">الفروع</Link>
        </div>
        
        <p className="text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} La Casetta Coffee
        </p>
      </div>
    </footer>
  );
}
