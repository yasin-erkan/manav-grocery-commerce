import {Order} from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Tüm siparişleri getir
export const getOrders = async (): Promise<{orders: Order[]}> => {
  const res = await fetch(`${BASE_URL}/api/orders`);

  return res.json();
};
