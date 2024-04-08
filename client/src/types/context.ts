import { Cart } from "./cart";
import { Product, StripeProduct } from "./product";

export type CartContextType = {
  cart: Cart | null;
  addItemToCart: (product: StripeProduct) => void;
  deleteItemFromCart: (id: string) => void;
  removeItemFromCart: (product: StripeProduct) => void;
  cartIsLoading: boolean;
  clearCart: () => void;
};
