'use client';

import { useEffect, useState } from 'react';
import { MenuItem, Category } from '@/lib/types';

export default function AdminPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    category_id: 1, name: '', name_en: '', description: '', price: '', image: '', is_featured: false
  });

  const fetchData = async () => {
    const [itemsRes, categoriesRes] = await Promise.all([
      fetch('/api/menu'),
      fetch('/api/categories')
    ]);
    setItems(await itemsRes.json());
    setCategories(await categoriesRes.json());
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        category_id: item.category_id,
        name: item.name,
        name_en: item.name_en || '',
        description: item.description,
        price: item.price.toString(),
        image: item.image,
        is_featured: item.is_featured === 1
      });
    } else {
      setEditingItem(null);
      setFormData({ category_id: 1, name: '', name_en: '', description: '', price: '', image: '', is_featured: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, price: parseFloat(formData.price), is_available: true };
    
    if (editingItem) {
      await fetch(`/api/menu/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold">لوحة التحكم</h1>
          <p className="text-amber-100">إدارة قائمة المطعم</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm">إجمالي الأصناف</p>
            <p className="text-2xl font-bold text-gray-800">{items.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm">الأقسام</p>
            <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm">المميزة</p>
            <p className="text-2xl font-bold text-amber-600">{items.filter(i => i.is_featured).length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm">متوسط السعر</p>
            <p className="text-2xl font-bold text-green-600">
              {items.length ? Math.round(items.reduce((a, b) => a + b.price, 0) / items.length).toLocaleString() : 0} IQD
            </p>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">قائمة الأصناف ({items.length})</h2>
          <button
            onClick={() => openModal()}
            className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>+</span> إضافة صنف
          </button>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">الصنف</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 hidden sm:table-cell">القسم</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">السعر</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 hidden md:table-cell">مميز</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image.startsWith('http') ? '🍽️' : item.image}</span>
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.name_en}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{item.category_name}</td>
                    <td className="px-4 py-3 font-medium text-amber-600">{item.price.toLocaleString()} IQD</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {item.is_featured === 1 ? <span className="text-green-600">⭐ نعم</span> : <span className="text-gray-400">لا</span>}
                    </td>
                    <td className="px-4 py-3 text-left">
                      <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-800 ml-3">تعديل</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingItem ? 'تعديل الصنف' : 'إضافة صنف جديد'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (عربي)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name} - {cat.name_en}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">السعر (IQD)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الأيقونة/الصورة</label>
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      placeholder="🍕 أو رابط صورة"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">صنف مميز</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors"
                  >
                    {editingItem ? 'تحديث' : 'إضافة'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
