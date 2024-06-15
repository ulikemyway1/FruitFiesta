import { DiscountCode, ProductDiscount } from "@commercetools/platform-sdk";

class DiscountsState {
  discountCodes: DiscountCode[] = [];

  productDiscounts: ProductDiscount[] = [];
}

const discountsState = new DiscountsState();
export default discountsState;
