import { Cart, ContactDetails, ShippingDetails } from "./cart";

export type CartProps = {
  cart: Cart | null;
  cartIsLoading: boolean;
  setShow?: (state: { cartItems: boolean; stepper: boolean }) => void;
  clearCart?: () => void;
};

export type ContactFormProps = {
  handleNext: () => void;
  handleBack: () => void;
  setContactDetails?: (prevState: ContactDetails) => void;
  setShippingDetails?: React.Dispatch<React.SetStateAction<ShippingDetails>>;
  cart?: Cart | null;
  cartIsLoading?: boolean;
  clearCart?: () => void;
  shippingDetails?: ShippingDetails;
};

export type SignupProps = {
  handleNext: () => void;
  handleBack: () => void;
  setForm: React.Dispatch<React.SetStateAction<FormProps>>;
  formStatus?: FormProps;
};

export type AddressFormProps = {
  handleNext?: () => void;
  handleBack?: () => void;
  setForm?: React.Dispatch<React.SetStateAction<FormProps>>;
  isSignup: boolean;
  setOpenDialog?: (state: boolean) => void;
};

export type FormProps = {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  addressDetails: {
    street: string;
    city: string;
    address2?: string;
    country: string;
    postCode: string;
  };
};

export type AddAddressFormProps = {
  openDialog: boolean;
  setOpenDialog: (state: boolean) => void;
};

export type UserAddressesProps = {
  setShippingDetails: React.Dispatch<React.SetStateAction<ShippingDetails>>;
};

export type CartStepperProps = {
  cart: Cart | null;
  cartIsLoading: boolean;
  clearCart: () => void;
};
