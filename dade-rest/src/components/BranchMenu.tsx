'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { getCategories, getProductsByCategoryAndBranch, Category, Product } from '@/lib/api';

interface CartItem {
  product: Product;
  quantity: number;
}

interface BranchConfig {
  id: number;
  name: string;
  name_en: string;
  description: string;
  phone: string;
  instagram: string;
  location: string;
}

export default function BranchMenu({ config }: { config: BranchConfig }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Record<number, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [addedProduct, setAddedProduct] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      const cats = await getCategories();
      setCategories(cats);
      const allProducts: Record<number, Product[]> = {};
      await Promise.all(cats.map(async (cat) => {
        const prods = await getProductsByCategoryAndBranch(cat.id, config.id);
        allProducts[cat.id] = prods;
      }));
      setProducts(allProducts);
      setLoading(false);
    }
    fetchAllData();
  }, [config.id]);

  const allProducts = useMemo(() => Object.values(products).flat(), [products]);
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    return allProducts.filter(p => p.name.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query)));
  }, [searchQuery, allProducts]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  function addToCart(product: Product) {
    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 1000);
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: number) { setCart(prev => prev.filter(item => item.product.id !== productId)); }
  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  }
  function handleCategorySelect(categoryId: number) { setSelectedCategory(categoryId); setSearchQuery(''); setShowMobileMenu(false); }
  function sendWhatsAppOrder() {
    const orderText = cart.map(item => `${item.product.name} x${item.quantity} = ${(item.product.price * item.quantity).toLocaleString()} IQD`).join('\n');
    const total = `\n\nالمجموع: ${cartTotal.toLocaleString()} IQD\n\nالفرع: ${config.name_en}`;
    const message = encodeURIComponent(`طلب جديد:\n\n${orderText}${total}`);
    window.open(`https://wa.me/964${config.phone}?text=${message}`, '_blank');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Header */}
      <div className="bg-primary dark:bg-gray-800 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Image src="/lacasetta-logo.png" alt="La Casetta Coffee" width={70} height={70} className="rounded-full" />
              <div>
                <h1 className="font-english text-xl font-bold">{config.name_en}</h1>
                <p className="text-white/70 text-sm">{config.name} - {config.description}</p>
              </div>
            </div>
            {mounted && (
              <button onClick={toggleTheme} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="Toggle dark mode">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <a href={`tel:+964${config.phone}`} className="flex items-center gap-2 text-white/80 hover:text-white"><span>📞</span> {config.phone}</a>
            <a href={`https://instagram.com/${config.instagram.replace('@', '')}`} target="_blank" className="flex items-center gap-2 text-white/80 hover:text-white"><span>📷</span> {config.instagram}</a>
            <span className="flex items-center gap-2 text-white/80"><span>📍</span> {config.location}</span>
          </div>
          <div className="relative">
            <input type="text" placeholder="ابحث عن منتج..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setSelectedCategory(null); }}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 backdrop-blur text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-white/40" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">🔍</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {!searchQuery && !selectedCategory && !loading && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📂 الأقسام</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => handleCategorySelect(cat.id)}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:border-primary border-2 border-transparent">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">☕</div>
                  )}
                </div>
                <div className="p-2">
                  <p className="font-english text-xs font-medium text-gray-700 dark:text-gray-200 line-clamp-2">{cat.name}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{products[cat.id]?.length || 0} منتج</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto">
          {/* Mobile: Burger Menu Button */}
          <div className="sm:hidden flex items-center justify-between p-3">
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium"
            >
              <span className="text-xl">☰</span>
              <span>الأقسام</span>
            </button>
            <span className="font-english font-bold text-sm text-gray-800 dark:text-white">{config.name_en}</span>
            <button 
              onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${!selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            >
              الكل
            </button>
          </div>
          
          {/* Desktop: Horizontal Scroll */}
          <div className="hidden sm:flex items-center gap-4 p-2">
            <span className="font-english font-bold text-sm text-gray-800 dark:text-white whitespace-nowrap">{config.name_en}</span>
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-1 min-w-max">
                <button onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${!selectedCategory && !searchQuery ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white'}`}>
                  الكل
                </button>
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => handleCategorySelect(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors font-english ${selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white'}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 sm:hidden" onClick={() => setShowMobileMenu(false)}>
          <div 
            className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl animate-slideIn"
            onClick={e => e.stopPropagation()}
            dir="rtl"
          >
            {/* Menu Header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span>📂</span> الأقسام
              </h3>
              <button onClick={() => setShowMobileMenu(false)} className="text-white/80 hover:text-white text-2xl">✕</button>
            </div>
            
            {/* Menu Items */}
            <div className="p-2 max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-auto scrollbar-hide">
              <button
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); setShowMobileMenu(false); }}
                className={`w-full text-right px-4 py-3 rounded-xl mb-1 font-medium transition-colors ${!selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
              >
                🏠 الكل
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`w-full text-right px-4 py-3 rounded-xl mb-1 font-medium transition-colors flex items-center justify-between ${selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  <span className="font-english">{cat.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {products[cat.id]?.length || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">جاري تحميل القائمة...</p>
          </div>
        ) : searchQuery && filteredProducts ? (
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">🔍 نتائج البحث ({filteredProducts.length})</h2>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16"><span className="text-5xl block mb-4">🔍</span><p className="text-gray-500 dark:text-gray-400">لا توجد نتائج</p></div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} onAddToCart={() => addToCart(product)} isAdded={addedProduct === product.id} />)}
              </div>
            )}
          </div>
        ) : selectedCategory ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-english text-lg font-bold text-gray-800 dark:text-white">{categories.find(c => c.id === selectedCategory)?.name}</h2>
              <span className="text-xs text-gray-400">({products[selectedCategory]?.length || 0} منتج)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products[selectedCategory]?.map((product) => <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} onAddToCart={() => addToCart(product)} isAdded={addedProduct === product.id} />)}
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">📋 جميع المنتجات</h2>
            {categories.map((category) => (
              <div key={category.id} className="mb-10">
                <div className="sticky top-[52px] sm:top-[48px] z-20 -mx-4 px-4 py-2 mb-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
                  <div className="flex items-center gap-2 mt-4" > 
                    <span className="text-lg">☕</span>
                    <h2 className="font-english font-bold text-gray-800 dark:text-white">{category.name}</h2>
                    <span className="text-xs text-gray-400">({products[category.id]?.length || 0})</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {products[category.id]?.map((product) => <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} onAddToCart={() => addToCart(product)} isAdded={addedProduct === product.id} />)}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-4 left-4 right-4 z-40 flex justify-between items-end max-w-4xl mx-auto">
        <a href={`tel:+964${config.phone}`} className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
          <span className="text-2xl">📞</span>
        </a>
        {cartCount > 0 && (
          <button onClick={() => setShowCart(true)} className="bg-primary text-white px-6 py-4 rounded-full flex items-center gap-3 shadow-lg hover:bg-primary-light transition-colors animate-pulse">
            <span className="text-xl">🛒</span>
            <span className="font-bold">{cartCount} عنصر</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{cartTotal.toLocaleString()} IQD</span>
          </button>
        )}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={() => { addToCart(selectedProduct); setSelectedProduct(null); }} />}
      {showCart && <CartModal cart={cart} onClose={() => setShowCart(false)} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onOrder={sendWhatsAppOrder} total={cartTotal} />}
    </div>
  );
}

function ProductCard({ product, onClick, onAddToCart, isAdded }: { product: Product; onClick: () => void; onAddToCart: () => void; isAdded: boolean }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = product.image && product.image.length > 0 && !product.image.includes('logo.png');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative cursor-pointer overflow-hidden" onClick={onClick}>
        {hasImage && !imgError ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-[#fdf8f8] to-[#f5e6e6] dark:from-gray-700 dark:to-gray-600">☕</div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-3xl">🔍</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-english font-semibold text-gray-800 dark:text-white text-sm line-clamp-2 mb-2 cursor-pointer hover:text-primary dark:hover:text-[#e8b4b4]" onClick={onClick}>{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-[#601d1c] dark:text-[#e8b4b4] font-bold text-base">{product.price.toLocaleString()} <span className="text-xs">IQD</span></p>
          <button onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className={`relative overflow-hidden ${isAdded ? 'bg-green-500' : 'bg-gradient-to-br from-[#601d1c] via-[#7a2928] to-[#601d1c]'} text-white w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-300 shadow-lg hover:shadow-xl ${isAdded ? 'scale-110' : 'hover:scale-105'} border border-white/20 group`}>
            <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative font-bold text-lg">{isAdded ? '✓' : '+'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAddToCart }: { product: Product; onClose: () => void; onAddToCart: () => void }) {
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const hasImage = product.image && product.image.length > 0 && !product.image.includes('logo.png');

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    // Swipe down to close zoom
    if (Math.abs(diff) > 100) {
      setIsZoomed(false);
    }
    setTouchStart(null);
  };

  // Zoom Mode View
  if (isZoomed && hasImage && !imgError) {
    return (
      <div 
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        onClick={() => setIsZoomed(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain"
          onError={() => setImgError(true)}
        />
        {/* Close button */}
        <button 
          onClick={() => setIsZoomed(false)} 
          className="absolute top-4 right-4 bg-white/20 backdrop-blur text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl"
        >
          ✕
        </button>
        {/* Product info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="font-english text-white text-xl font-bold mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-lg font-bold">{product.price.toLocaleString()} IQD</span>
            <button 
              onClick={(e) => { e.stopPropagation(); for(let i = 0; i < quantity; i++) onAddToCart(); setIsZoomed(false); onClose(); }}
              className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center gap-2"
            >
              <span>🛒</span> أضف للسلة
            </button>
          </div>
        </div>
        {/* Swipe hint */}
        <div className="absolute top-1/2 left-4 text-white/50 text-sm">
          <span>↔️ اسحب للإغلاق</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg overflow-hidden animate-slideUp shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          {hasImage && !imgError ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover cursor-zoom-in" 
              onError={() => setImgError(true)}
              onClick={() => setIsZoomed(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><div className="text-center"><span className="text-9xl block mb-2">☕</span><span className="font-english text-gray-400 text-sm">La Casetta Coffee</span></div></div>
          )}
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-800 dark:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">✕</button>
          {/* Zoom button */}
          {hasImage && !imgError && (
            <button 
              onClick={() => setIsZoomed(true)} 
              className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-800 dark:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              🔍
            </button>
          )}
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-primary to-primary-light text-white px-5 py-2 rounded-full font-bold shadow-lg">{product.price.toLocaleString()} IQD</div>
        </div>
        <div className="p-6" dir="rtl">
          <h2 className="font-english text-2xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h2>
          {product.description && <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{product.description}</p>}
          <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-4">
            <span className="text-gray-700 dark:text-gray-300 font-medium">الكمية</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-gray-700 dark:text-white shadow hover:bg-gray-50 dark:hover:bg-gray-600">−</button>
              <span className="text-2xl font-bold text-gray-900 dark:text-white w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light text-white rounded-full flex items-center justify-center text-xl font-bold shadow">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-400">المجموع:</span>
            <span className="text-2xl font-bold text-[#601d1c] dark:text-[#e8b4b4]">{(product.price * quantity).toLocaleString()} IQD</span>
          </div>
          {/* Add to Cart Button */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-light/20 to-primary/20 rounded-2xl blur-xl"></div>
            <button onClick={() => { for(let i = 0; i < quantity; i++) onAddToCart(); }} 
              className="relative w-full overflow-hidden bg-gradient-to-r from-[#601d1c] via-[#7a2928] to-[#601d1c] text-white py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[0_20px_50px_rgba(96,29,28,0.4)] transition-all flex items-center justify-center gap-4 group active:scale-[0.98] border border-white/10">
              <span className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent_70%)]"></span>
              <span className="relative flex items-center gap-4">
                <span className="bg-white/20 backdrop-blur p-3 rounded-xl text-2xl shadow-inner">🛒</span>
                <span className="text-xl">أضف إلى السلة</span>
                <span className="bg-white/25 backdrop-blur px-4 py-1.5 rounded-full text-base font-bold shadow-inner">{quantity}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartModal({ cart, onClose, onUpdateQuantity, onRemove, onOrder, total }: { cart: CartItem[]; onClose: () => void; onUpdateQuantity: (id: number, qty: number) => void; onRemove: (id: number) => void; onOrder: () => void; total: number }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-slideUp shadow-2xl" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="bg-gradient-to-r from-primary via-primary-light to-primary text-white p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-3"><span className="text-2xl">🛒</span> سلة التسوق <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{cart.length} عنصر</span></h2>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl hover:rotate-90 transition-transform">✕</button>
        </div>
        <div className="p-4 max-h-[45vh] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-12"><span className="text-7xl block mb-4">🛒</span><p className="text-gray-500 dark:text-gray-400 text-lg">السلة فارغة</p></div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 p-4 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#fdf8f8] to-[#f5e6e6] dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">☕</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-english font-semibold text-gray-800 dark:text-white text-sm truncate">{item.product.name}</h3>
                    <p className="text-[#601d1c] dark:text-[#e8b4b4] font-bold">{(item.product.price * item.quantity).toLocaleString()} IQD</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-white font-bold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600">−</button>
                    <span className="w-6 text-center font-bold text-gray-800 dark:text-white">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-white font-bold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600">+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-5 border-t dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-300 text-lg">المجموع الكلي:</span>
              <span className="text-3xl font-bold text-[#601d1c] dark:text-[#e8b4b4]">{total.toLocaleString()} <span className="text-base">IQD</span></span>
            </div>
            <button onClick={onOrder} className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02]">
              <span className="text-2xl">📱</span> اطلب عبر واتساب
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
