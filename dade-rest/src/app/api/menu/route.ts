import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { MenuItem } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    let query = `
      SELECT m.*, c.name as category_name, c.name_en as category_name_en 
      FROM menu_items m 
      JOIN categories c ON m.category_id = c.id 
      WHERE m.is_available = 1
    `;
    const params: (string | number)[] = [];

    if (categoryId) {
      query += ' AND m.category_id = ?';
      params.push(parseInt(categoryId));
    }

    if (featured === 'true') {
      query += ' AND m.is_featured = 1';
    }

    if (search) {
      query += ' AND (m.name LIKE ? OR m.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY m.category_id, m.name';

    const items = db.prepare(query).all(...params) as MenuItem[];
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { category_id, name, description, price, image, is_featured } = await request.json();
    const result = db.prepare(
      'INSERT INTO menu_items (category_id, name, description, price, image, is_featured) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(category_id, name, description, price, image, is_featured ? 1 : 0);
    return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
