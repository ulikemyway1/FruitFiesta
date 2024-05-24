import fetchProductProjections from "../api";

export default class MainPageModel {
  static async getRandomProducts() {
    const response = await fetchProductProjections();
    return response.body.results;
  }
}
