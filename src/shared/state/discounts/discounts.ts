import { DiscountCode } from "@commercetools/platform-sdk";

// state of app
class DiscountsState {
  discounts: DiscountCode[] = [];
}

const discountsState = new DiscountsState();
export default discountsState;
