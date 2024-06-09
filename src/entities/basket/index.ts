// import { Cart } from "@commercetools/platform-sdk";
// import requestAPI from "../../shared/api/APIRootBuilder";

// class Basket {
//   private cart: Cart | null = null;

//   constructor() {
//     this.fetchCart();
//   }

//   public getCart() {
//     return this.cart;
//   }

//   public async fetchCart() {
//     const response = await requestAPI.apiRoot().me().carts().get().execute();
//     [this.cart] = response.body.results;
//     console.log(this.cart);
//   }

//   //   public async fetchCartById(ID: string) {
//   //     const response = await requestAPI
//   //       .apiRoot()
//   //       .carts()
//   //       .withId({ ID })
//   //       .get()
//   //       .execute();
//   //     this.cart = response.body;
//   //   }
// }

// export default new Basket().getCart();
