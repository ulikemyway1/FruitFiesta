import { fetchProductProjections, fetchCategories } from "../api";

export default class MainPageModel {
  static async getProducts() {
    const response = await fetchProductProjections();
    return response.body.results;
  }

  static async getCategories() {
    const response = await fetchCategories();
    return response.body.results;
  }
}
