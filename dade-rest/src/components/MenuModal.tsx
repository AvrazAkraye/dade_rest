'use client';

import { MenuItem } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { addToCart } from '@/lib/cart';

interface MenuModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onCartUpdate?: () => void;
}

export default function MenuModal({ item, onClose, onCartUpdate }: MenuModalProps) {
  const isImage = item && (item.image.startsWith('/') || item.image.startsWith('http'));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setAdded(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [item]);

  if (!item) return null;

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setAdded(true);
    onCartUpdate?.();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <div 
        className="relative bg-white dark:bg-gray-800 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden flex justify-center pt-3 pb-2 sticky top-0 bg-white dark:bg-gray-800">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition-colors shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {item.is_featured === 1 && (
          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
            <span>⭐</span>
            <span>مميز</span>
          </div>
        )}

        <div className="h-56 sm:h-64 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden relative">
          {isImage ? (
            <Image
              src={item.image}
              alt={item.name}
              width={500}
              height={400}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <span className="text-9xl animate-bounce">{item.image}</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 via-transparent to-transparent"></div>
        </div>

        <div className="p-6 sm:p-8" dir="rtl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 text-amber-800 dark:text-amber-200 px-3 py-1.5 rounded-full text-xs font-bold">
              {item.category_name}
            </span>
            {item.category_name_en && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{item.category_name_en}</span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white mb-1">{item.name}</h2>
          {item.name_en && (
            <p className="text-gray-500 dark:text-gray-400 text-base mb-4">{item.name_en}</p>
          )}

          <div className="h-px bg-gradient-to-r from-amber-200 dark:from-amber-700 via-orange-200 dark:via-orange-700 to-transparent mb-4"></div>

          {item.description && (
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">{item.description}</p>
          )}

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 text-center mb-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">السعر</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-black text-amber-600 dark:text-amber-400">
                {item.price.toLocaleString()}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-lg">IQD</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 transition-colors"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-800 dark:text-white w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
            }`}
          >
            {added ? (
              <>
                <span>✓</span>
                <span>تمت الإضافة للسلة</span>
              </>
            ) : (
              <>
                <span>🛒</span>
                <span>إضافة للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
