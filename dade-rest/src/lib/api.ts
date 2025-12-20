// La Casetta Coffee API Client
const BASE_URL = 'https://lacasettacoffee.com/rest/api/nexopos';

export interface Category {
  id: number;
  name: string;
  description?: string;
  products_count?: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category_id: number;
}

export interface Branch {
  id: number;
  name: string;
  name_en: string;
  description: string;
  image: string;
}

// API Response types
interface ApiCategoryRaw {
  ID: string;
  NOM: string;
  DESCRIPTION: string;
  product_count: number;
}

interface ApiProductRaw {
  ID: string;
  DESIGN: string;
  DESCRIPTION: string;
  PRIX_DE_VENTE: string;
  APERCU: string;
  image_url?: string;
  REF_CATEGORIE: string;
}

interface CategoriesApiResponse {
  status: string;
  data: ApiCategoryRaw[];
}

interface ProductsApiResponse {
  status: string;
  products: ApiProductRaw[];
  count: number;
}

// Hardcoded branches for La Casetta Coffee
export const branches: Branch[] = [
  { id: 1, name: 'دهوك', name_en: 'Duhok La Casetta', description: 'شارع المطاعم - أكري', image: '☕' },
  { id: 2, name: 'سيجي', name_en: 'Seche La Casetta', description: 'سيجي - دهوك', image: '🏪' },
];

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories/all/list`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const json: CategoriesApiResponse = await res.json();
    
    if (json.status !== 'success' || !Array.isArray(json.data)) {
      return [];
    }
    
    return json.data.map(cat => ({
      id: parseInt(cat.ID),
      name: cat.NOM,
      description: cat.DESCRIPTION,
      products_count: cat.product_count
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getProductsByCategoryAndBranch(
  categoryId: number,
  branchId?: number
): Promise<Product[]> {
  try {
    let url = `${BASE_URL}/products/by-category-branch?category_id=${categoryId}`;
    if (branchId) url += `&ref_branch=${branchId}`;
    
    const res = await fetch(url, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const json: ProductsApiResponse = await res.json();
    
    if (json.status !== 'success' || !Array.isArray(json.products)) {
      return [];
    }
    
    return json.products.map(prod => ({
      id: parseInt(prod.ID),
      name: prod.DESIGN,
      description: prod.DESCRIPTION,
      price: parseFloat(prod.PRIX_DE_VENTE) || 0,
      image: prod.image_url || prod.APERCU || '',
      category_id: parseInt(prod.REF_CATEGORIE)
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
