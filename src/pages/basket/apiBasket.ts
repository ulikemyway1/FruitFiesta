import { Cart } from "@commercetools/platform-sdk";
import requestAPI from "../../shared/api/APIRootBuilder";
// import basketModel from "./basketModel";

const fetchMakeCart = () =>
  requestAPI
    .apiRoot()
    .me()
    .carts()
    .post({
      body: {
        currency: "EUR",
      },
    })
    .execute();

const fetchCarts = () => requestAPI.apiRoot().me().carts().get().execute();

const fetchAddToCart = (cart: Cart, productId: string, quantity = 1) =>
  // const cart = await basketModel.getCart();
  // const ID = cart.id;
  // const { version } = cart;
  requestAPI
    .apiRoot()
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: "addLineItem",
            productId,
            quantity,
          },
        ],
      },
    })
    .execute();

const fetchRemoveFromCart = (cart: Cart, lineItemId: string) =>
  requestAPI
    .apiRoot()
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: "removeLineItem",
            lineItemId,
          },
        ],
      },
    })
    .execute();

const fetchChangeQuantity = (cart: Cart, lineItemId: string, quantity = 1) =>
  requestAPI
    .apiRoot()
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: "changeLineItemQuantity",
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

export {
  fetchAddToCart,
  fetchChangeQuantity,
  fetchRemoveFromCart,
  fetchCarts,
  fetchMakeCart,
};
