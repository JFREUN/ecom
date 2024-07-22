export type StripeCharge = {
  id: string;
  amount: number;
  currency: string;
  description: string;
  created: number;
  // Add other properties as needed
};
