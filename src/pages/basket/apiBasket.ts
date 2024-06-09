import requestAPI from "../../shared/api/APIRootBuilder";
import { CustomCart } from "./interface";

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

const fetchAddToCart = (productId: string, quantity = 1) =>
  fetchCarts().then((carts) => {
    console.log(quantity);
    const cart = carts.body.results[0];
    const ID = cart.id;
    const { version } = cart;
    return requestAPI
      .apiRoot()
      .me()
      .carts()
      .withId({ ID })
      .post({
        body: {
          version,
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
  });

const fetchChangeQuantity = (
  cart: CustomCart,
  lineItemId: string,
  quantity = 1,
) =>
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

export { fetchAddToCart, fetchChangeQuantity, fetchCarts, fetchMakeCart };
