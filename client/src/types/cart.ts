import { StripeProduct } from "./product";

export type Cart = {
  owner: number;
  items: StripeProduct[];
  bill: number;
};

export type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2?: string;
  postCode: string;
  city: string;
  country: string;
};

export type ShippingDetails = {
  address1: string;
  address2?: string;
  postCode: string;
  city: string;
  country: string;
  type: "regular" | "express";
};
