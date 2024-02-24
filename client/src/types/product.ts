export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  createdAt?: string;
  updatedAt?: string;
};
