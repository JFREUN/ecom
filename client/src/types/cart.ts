import { Product } from "./product";

export type Cart = {
  owner: number;
  items: Product[];
  bill: number;
};
