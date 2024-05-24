import fetchProductProjections from "../api";

export default class MainPageModel {
  static async getProducts() {
    const response = await fetchProductProjections();
    return response.body.results;
  }
}
