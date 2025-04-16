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