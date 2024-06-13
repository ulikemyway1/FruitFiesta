import { DiscountCode } from "@commercetools/platform-sdk";

class DiscountsState {
  discounts: DiscountCode[] = [];
}

const discountsState = new DiscountsState();
export default discountsState;
