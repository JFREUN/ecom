import { Product } from "./product";

export type LoginUser = {
  email: string;
  password: string;
};
export type Address = {
  street: string;
  city: string;
  address2?: string;
  country: string;
  postCode: string;
  main: boolean;
};
export type SignupUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  street: string;
  city: string;
  address2?: string;
  country: string;
  postCode: string;
};

export type User = {
  _id: string;
  email: string;
  favourites?: Product[];
  firstName: string;
  lastName: string;
  addresses: Address[];
};
