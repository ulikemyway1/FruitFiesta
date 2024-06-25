import { Cart } from "@commercetools/platform-sdk";

export interface CustomCart extends Omit<Cart, "version"> {
  version: number;
}
