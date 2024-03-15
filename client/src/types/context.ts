import { Cart } from "./cart";
import { Product } from "./product";

export type CartContextType = {
  cart: Cart | null;
  addItemToCart: (product: Product) => void;
  deleteItemFromCart: (id: number) => void;
  removeItemFromCart: (product: Product) => void;
};
