export interface Product {
  id: number;
  name: string;
  brand: string;
  desc: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Comment {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  text: string;
  rating: number;
  createdAt: string;
} 