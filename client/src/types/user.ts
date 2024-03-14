import { Product } from "./product";

export type LoginUser = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  favourites?: Product[];
};
