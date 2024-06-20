export default interface CustomerAuthResponse {
  body: {
    customer: {
      addresses: [];
      authenticationMode: string;
      billingAddressIds: [];
      createdAt: string;
      createdBy: {
        clientId: string;
        isPlatformClient: false;
      };
      dateOfBirth: string;
      email: string;
      firstName: string;
      id: string;
      isEmailVerified: false;
      lastMessageSequenceNumber: number;
      lastModifiedAt: string;
      lastModifiedBy: {
        clientId: string;
        isPlatformClient: false;
      };
      lastName: string;
      password: string;
      shippingAddressIds: [];
      stores: [];
      version: number;
      versionModifiedAt: string;
    };
    statusCode: number;
  };
}
