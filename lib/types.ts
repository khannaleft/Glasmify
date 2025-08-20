export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviews: Review[];
  stock: number;
}

export interface CartItem extends Product {
    quantity: number;
}

// Represents the user profile within the application context
export interface User {
    uid: string;
    name: string | null;
    email: string | null;
    avatarUrl: string | null;
}
