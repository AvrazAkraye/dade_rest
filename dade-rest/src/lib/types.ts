export interface Category {
  id: number;
  name: string;
  name_en: string;
  description: string;
  image: string;
  created_at: string;
}

export interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  name_en: string;
  description: string;
  price: number;
  image: string;
  is_available: number;
  is_featured: number;
  created_at: string;
  category_name?: string;
  category_name_en?: string;
}
