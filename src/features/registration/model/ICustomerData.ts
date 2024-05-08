export default interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  shippingAddress: {
    street: string;
    city: string;
    postCode: string;
  };
  billingAddress: {
    street: string;
    city: string;
    postCode: string;
  };
}
