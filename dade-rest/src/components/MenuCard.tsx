'use client';

import { MenuItem } from '@/lib/types';
import Image from 'next/image';

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
}

export default function MenuCard({ item, onClick }: MenuCardProps) {
  // Check if it's an image path (starts with / or http) or emoji
  const isImage = item.image.startsWith('/') || item.image.startsWith('http');
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm active:scale-95 transition-transform cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="h-24 sm:h-32 bg-amber-50 flex items-center justify-center overflow-hidden relative">
        {isImage ? (
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={150}
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <span className="text-4xl sm:text-5xl">{item.image}</span>
        )}
        {item.is_featured === 1 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            ⭐
          </span>
        )}
      </div>
      
      {/* Info */}
      <div className="p-2 sm:p-3">
        <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-1">{item.name}</h3>
        <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-1">{item.name_en}</p>
        <p className="text-amber-600 font-bold text-sm mt-1">
          {item.price.toLocaleString()} <span className="text-[10px] text-gray-400">IQD</span>
        </p>
      </div>
    </div>
  );
}
