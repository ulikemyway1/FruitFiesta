import { fetchDiscountCodes, fetchProductProjections } from "../api";

export default class MainPageModel {
  static async getDiscountCodes() {
    const response = await fetchDiscountCodes();
    return response.body.results;
  }

  static async getRandomProducts(num_of_random_products = 3) {
    const response = await fetchProductProjections();
    const randomProducts = [];
    for (let i = 0; i < num_of_random_products; i += 1) {
      const randomProduct =
        response.body.results[Math.floor(Math.random() * response.body.count)];
      randomProducts.push(randomProduct);
    }
    return randomProducts;
  }
}
