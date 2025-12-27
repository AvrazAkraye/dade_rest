import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-black text-white py-8 px-4 transition-colors">
      <div className="max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">☕</span>
          <span className="font-english font-bold text-lg">La Casetta Coffee</span>
        </div>
        <p className="text-white/70 text-sm mb-4">قهوة لا كاسيتا</p>
        
        <p className="text-white/40 text-xs mt-6">
          © {new Date().getFullYear()} <span className="font-english">La Casetta Coffee</span>
        </p>
      </div>
    </footer>
  );
}
