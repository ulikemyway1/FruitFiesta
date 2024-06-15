import "./discountCodeLine.scss";
import { Cart, DiscountCodeReference } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import { fetchRemoveDiscountCode } from "../apiBasket";
import basketModel from "../basketModel";
import discountsState from "../../../shared/state/discounts/discounts";

export default class DiscountCodeLine {
  private discountReference: DiscountCodeReference;

  setCartTotalPrice: (cart: Cart) => void;

  renderLineItems: (cart: Cart) => void;

  private name = new CreateElement({
    tag: "div",
    cssClasses: ["discount-code-line__name"],
  });

  private delete = new CreateElement({
    tag: "button",
    cssClasses: ["discount-code-line__delete"],
    textContent: "✖",
    eventType: "click",
    callback: this.removeDiscountHandler.bind(this),
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["discount-code-line"],
    children: [this.delete, this.name],
  });

  constructor(
    discountReference: DiscountCodeReference,
    setCartTotalPrice: (cart: Cart) => void,
    renderLineItems: (cart: Cart) => void,
  ) {
    this.discountReference = discountReference;
    this.setCartTotalPrice = setCartTotalPrice;
    this.renderLineItems = renderLineItems;

    const discount = discountsState.discountCodes.find(
      (item) => item.id === this.discountReference.id,
    );

    this.name.getHTMLElement().textContent =
      discount?.name?.["en-GB"] || discountReference.id;
  }

  private async removeDiscountHandler() {
    console.log("Remove discount button clicked");
    const cart = await basketModel.getCart();
    fetchRemoveDiscountCode(cart, this.discountReference)
      .then((response) => {
        basketModel.cart = response.body;
        this.setCartTotalPrice(basketModel.cart);
        this.renderLineItems(basketModel.cart);
        this.container.getHTMLElement().remove();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
