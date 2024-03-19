import { ContactDetails, ShippingDetails } from "./cart";

export type ContactFormProps = {
  handleNext: () => void;
  handleBack: () => void;
  setContactDetails?: (prevState: ContactDetails) => void;
  setShippingDetails?: (prevState: ShippingDetails) => void;
};
