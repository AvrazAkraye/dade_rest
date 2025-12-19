'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { branches, getCategories, getProductsByCategoryAndBranch, Category, Product } from '@/lib/api';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BranchPage({ params }: PageProps) {
  const { id } = use(params);
  const branchId = parseInt(id);
  const branch = branches.find(b => b.id === branchId);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Record<number, Product[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const cats = await getCategories();
      setCategories(cats);
      setLoading(false);
      
      // Load first category products
      if (cats.length > 0) {
        setSelectedCategory(cats[0].id);
        loadCategoryProducts(cats[0].id);
      }
    }
    fetchCategories();
  }, [branchId]);

  async function loadCategoryProducts(categoryId: number) {
    if (products[categoryId]) return; // Already loaded
    
    setLoadingProducts(true);
    const prods = await getProductsByCategoryAndBranch(categoryId, branchId);
    setProducts(prev => ({ ...prev, [categoryId]: prods }));
    setLoadingProducts(false);
  }

  function handleCategoryClick(categoryId: number) {
    setSelectedCategory(categoryId);
    loadCategoryProducts(categoryId);
    
    const element = document.getElementById(`cat-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <span className="text-6xl block mb-4">😕</span>
          <p className="text-gray-500 dark:text-gray-400 mb-4">الفرع غير موجود</p>
          <Link href="/" className="text-amber-600 hover:underline">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Header */}
      <div className="bg-amber-700 dark:bg-amber-900 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-amber-200 hover:text-white text-sm mb-2 inline-block">
            ← العودة للفروع
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{branch.image}</span>
            <div>
              <h1 className="text-2xl font-bold">{branch.name}</h1>
              <p className="text-amber-200 text-sm">{branch.name_en} - La Casetta Coffee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 p-2 min-w-max max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">📭</span>
            <p className="text-gray-500 dark:text-gray-400">لا توجد أقسام متاحة</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} id={`cat-${category.id}`} className="mb-10">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4 sticky top-[60px] bg-gray-50 dark:bg-gray-900 py-2 z-20">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">{category.name}</h2>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  ({category.products_count || 0} منتج)
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Products Grid */}
              {selectedCategory === category.id && loadingProducts ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
                </div>
              ) : products[category.id]?.length === 0 ? (
                <p className="text-gray-400 text-center py-4">لا توجد منتجات في هذا القسم</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {products[category.id]?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.gallery || '/images/placeholder.jpg';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
        {product.gallery ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">☕</div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-bold text-gray-800 dark:text-white text-sm line-clamp-2 mb-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
            {product.description}
          </p>
        )}
        <p className="text-amber-600 dark:text-amber-400 font-bold">
          {product.sale_price?.toLocaleString()} IQD
        </p>
      </div>
    </div>
  );
}
