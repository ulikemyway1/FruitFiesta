import apiRoot from "../../../shared/api/APIRoot";

const fetchDiscountCodes = () => apiRoot.discountCodes().get().execute();

export default class MainPageModel {
  static async getDiscountCodes() {
    const response = await fetchDiscountCodes();
    return response.body.results.map((discount) => ({
      title: discount.name ? discount.name["en-GB"] : "",
      text: discount.description ? discount.description["en-GB"] : "",
      promoCode: `Promo code: ${discount.code}`,
    }));
  }
}
