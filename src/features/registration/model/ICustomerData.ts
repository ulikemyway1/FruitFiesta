export default interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  shippingAddress: {
    country: string;
    street: string;
    city: string;
    postCode: string;
  };
  billingAddress: {
    country: string;
    street: string;
    city: string;
    postCode: string;
  };
}
