'use client';

import { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } from '@/lib/cart';
import { CartItem } from '@/lib/cart';
import Image from 'next/image';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = getCart();
    setItems(cart);
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const handleRemove = (itemId: number) => {
    removeFromCart(itemId);
    loadCart();
  };

  const handleQuantityChange = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      handleRemove(itemId);
    } else {
      updateQuantity(itemId, quantity);
      loadCart();
    }
  };

  const handleClear = () => {
    if (confirm('هل تريد حذف جميع العناصر من السلة؟')) {
      clearCart();
      loadCart();
    }
  };

  const total = getCartTotal();
  const isImage = (image: string) => image.startsWith('/') || image.startsWith('http');

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 bg-amber-600 hover:bg-amber-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110"
      >
        <div className="relative">
          <span className="text-2xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Cart Panel */}
          <div
            className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl flex flex-col animate-slideIn"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">السلة 🛒</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:opacity-80"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <span className="text-5xl mb-4">🛒</span>
                  <p className="text-lg">السلة فارغة</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    {/* Item Header */}
                    <div className="flex gap-3 mb-3">
                      <div className="w-16 h-16 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {isImage(item.image) ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="text-2xl">{item.image}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.name_en}</p>
                        <p className="text-amber-600 font-bold">{item.price.toLocaleString()} IQD</p>
                      </div>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm"
                      >
                        حذف
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-2 pt-2 border-t text-right">
                      <p className="text-sm text-gray-600">
                        المجموع: <span className="font-bold text-amber-600">{(item.price * item.quantity).toLocaleString()} IQD</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-6 space-y-4 bg-gray-50">
                {/* Total */}
                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold text-gray-800">الإجمالي:</span>
                  <span className="text-2xl font-black text-amber-600">
                    {total.toLocaleString()} IQD
                  </span>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <a
                    href="tel:+9647508122922"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold text-center hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    📞 اطلب الآن
                  </a>
                  <button
                    onClick={handleClear}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-xl font-bold transition-colors"
                  >
                    مسح السلة
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
