import { NextResponse } from 'next/server';
import { getMenuItems } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    const items = getMenuItems({
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      featured: featured === 'true',
      search: search || undefined
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}
