import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Category } from '@/lib/types';

export async function GET() {
  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY id').all() as Category[];
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, image } = await request.json();
    const result = db.prepare('INSERT INTO categories (name, description, image) VALUES (?, ?, ?)').run(name, description, image);
    return NextResponse.json({ id: result.lastInsertRowid, name, description, image }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
