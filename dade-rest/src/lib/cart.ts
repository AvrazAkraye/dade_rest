import { MenuItem } from './types';

export interface CartItem extends MenuItem {
  quantity: number;
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('daderest_cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('daderest_cart', JSON.stringify(cart));
};

export const addToCart = (item: MenuItem, quantity: number = 1) => {
  const cart = getCart();
  const existingItem = cart.find(c => c.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  
  saveCart(cart);
  return cart;
};

export const removeFromCart = (itemId: number) => {
  const cart = getCart();
  const filtered = cart.filter(c => c.id !== itemId);
  saveCart(filtered);
  return filtered;
};

export const updateQuantity = (itemId: number, quantity: number) => {
  const cart = getCart();
  const item = cart.find(c => c.id === itemId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('daderest_cart');
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
