// Ürünler

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  origin: string;
  isOrganic: boolean;
  description: string;
  nutritionalValue: string;
  expiryDays: number;
  photo: string;
  __v: number;
};

type GetProductsResponse = {
  groceries: Product[];
};

type GetProductResponse = {
  grocery: Product;
};

// Sepet
type Cart = {
  message: string;
  cart: {
    _id: string;
    userId: string;

    items: {
      grocery: Product;
      quantity: number;
      price: number;
      name: string;
      _id: string;
    }[];

    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

type SingleCheckoutResponse = {
  url: string;
};

type GetBasketResponse = {
  cart: {
    _id: string;
    userId: string;
    items: {
      grocery: Product;
      quantity: number;
      price: number;
      name: string;
      _id: string;
    }[];

    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

type MessageResponse = {
  message: string;
};

// Sipariş
type Order = {
  _id: string;
  product: Product;
  quantity: number;
  money_spend: number;
  currency: string;
  customer_name: string;
  customer_phone: string;
  delivery_address?: string;
  is_delivery: boolean;
  createdAt: string;
  updatedAt: string;
};

export type {
  Product,
  GetProductsResponse,
  GetProductResponse,
  Cart,
  SingleCheckoutResponse,
  GetBasketResponse,
  MessageResponse,
  Order,
};
