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
  // Check if it's an image path (starts with / or http) or emoji
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div 
        className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar for mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-2 sticky top-0 bg-white">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Featured badge */}
        {item.is_featured === 1 && (
          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
            <span>⭐</span>
            <span>مميز</span>
          </div>
        )}

        {/* Image Section */}
        <div className="h-56 sm:h-64 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center overflow-hidden relative">
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
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8" dir="rtl">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold">
              {item.category_name}
            </span>
            {item.category_name_en && (
              <span className="text-xs text-gray-400">{item.category_name_en}</span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-1">{item.name}</h2>
          {item.name_en && (
            <p className="text-gray-500 text-base mb-4">{item.name_en}</p>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-amber-200 via-orange-200 to-transparent mb-4"></div>

          {/* Description */}
          {item.description && (
            <p className="text-gray-600 text-base leading-relaxed mb-6">{item.description}</p>
          )}

          {/* Price Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 text-center mb-6">
            <p className="text-gray-500 text-sm mb-2">السعر</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-black text-amber-600">
                {item.price.toLocaleString()}
              </span>
              <span className="text-gray-400 text-lg">IQD</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-800 w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
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
