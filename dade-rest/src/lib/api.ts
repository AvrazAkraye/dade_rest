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
  sale_price: number;
  thumbnail_id?: number;
  gallery?: string;
  category_id: number;
}

export interface Branch {
  id: number;
  name: string;
  name_en: string;
  description: string;
  image: string;
}

// Hardcoded branches for La Casetta Coffee
export const branches: Branch[] = [
  { id: 1, name: 'الفرع الأول', name_en: 'Branch 1', description: 'الفرع الرئيسي', image: '☕' },
  { id: 2, name: 'الفرع الثاني', name_en: 'Branch 2', description: 'الفرع الثاني', image: '🏪' },
];

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories/all/list`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryById(id: number): Promise<Category | null> {
  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch category');
    return res.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
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
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getAllProductsForBranch(branchId: number): Promise<Product[]> {
  try {
    const categories = await getCategories();
    const allProducts: Product[] = [];
    
    for (const category of categories) {
      const products = await getProductsByCategoryAndBranch(category.id, branchId);
      allProducts.push(...products);
    }
    
    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}
