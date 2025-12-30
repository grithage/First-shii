
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  address: string;
  password?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Deployed' | 'Processing' | 'Delivered';
}
