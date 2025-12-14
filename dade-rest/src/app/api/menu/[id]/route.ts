import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { MenuItem } from '@/lib/types';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = db.prepare(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m 
      JOIN categories c ON m.category_id = c.id 
      WHERE m.id = ?
    `).get(parseInt(id)) as MenuItem | undefined;

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { category_id, name, description, price, image, is_available, is_featured } = await request.json();
    db.prepare(`
      UPDATE menu_items 
      SET category_id = ?, name = ?, description = ?, price = ?, image = ?, is_available = ?, is_featured = ?
      WHERE id = ?
    `).run(category_id, name, description, price, image, is_available ? 1 : 0, is_featured ? 1 : 0, parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    db.prepare('DELETE FROM menu_items WHERE id = ?').run(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
