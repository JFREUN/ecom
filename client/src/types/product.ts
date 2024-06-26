export type Product = {
  imageUrl: string | undefined;
  _id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  createdAt?: string;
  updatedAt?: string;
};

export type StripeProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  imageUrl: string | undefined;
  quantity: number;
};
