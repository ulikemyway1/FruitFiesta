import "./basket.scss";
import { Cart } from "@commercetools/platform-sdk";
import CreateElement from "../../shared/helpers/element-create";
import ProductLine from "./productLine/productLine";
import DiscountCodeLine from "./discountCodeLine/discountCodeLine";
import { fetchAddDiscountCode, fetchDeleteCart } from "./apiBasket";
import basketModel from "./basketModel";
import cleanContainer from "../../shared/utils/clean-container";
import ModalConfirmation from "../../widgets/modalConfirmation/modalConfirmation";
import ModalMessage from "../../widgets/modalMessage/modalMessage";
import modalLoadingScreen from "../../widgets/modalLoadingScreen/modalLoadingScreen";

export default class BasketView {
  cart: Cart | undefined;

  private lineItems = new CreateElement({
    tag: "div",
    cssClasses: ["basket__line-items"],
  }).getHTMLElement();

  private discountCodeItems = new CreateElement({
    tag: "div",
    cssClasses: ["basket__discount-code-items"],
  }).getHTMLElement();

  private discountCodeInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["basket__discount-code-input"],
    attributes: {
      type: "text",
      placeholder: "e.g SUPERPROMOCODE...",
    },
  }).getHTMLElement();

  private addDiscountButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["basket__add-discount-button"],
    textContent: "Apply",
    eventType: "click",
    callback: () => {
      this.addDiscount(this.discountCodeInput.value);
    },
  }).getHTMLElement();

  private discountLabel = new CreateElement({
    tag: "div",
    cssClasses: ["basket__discount-label"],
    textContent: "Promocode:",
    children: [this.discountCodeInput, this.addDiscountButton],
  }).getHTMLElement();

  private cartTotalPrice = new CreateElement({
    tag: "h2",
    cssClasses: ["basket__total-price"],
  }).getHTMLElement();

  private checkoutButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["basket__checkout-button"],
    textContent: "Checkout",
    eventType: "click",
    callback: () => {
      console.log("Checkout button clicked");
      document.body.append(
        new ModalMessage(
          "Congrats!!! Let's assume that you bought everything you wanted.",
        ).getHTMLElement(),
      );
    },
  }).getHTMLElement();

  private deleteCartButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["basket__delete-cart-button"],
    innerHTML: "Delete&nbsp;cart",
    eventType: "click",
    callback: this.getConfirmationModal.bind(this),
  }).getHTMLElement();

  private checkoutRow = new CreateElement({
    tag: "div",
    cssClasses: ["basket__checkout-row"],
    children: [this.cartTotalPrice, this.checkoutButton, this.deleteCartButton],
  }).getHTMLElement();

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["basket"],
    children: [
      this.lineItems,
      this.discountCodeItems,
      this.discountLabel,
      this.checkoutRow,
    ],
  });

  render(cart: Cart) {
    if (!cart || !cart.lineItems.length) {
      this.showEmptyCart();
      return;
    }

    this.cart = cart;

    this.discountCodeInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.addDiscount(this.discountCodeInput.value);
      }
    });

    this.renderLineItems(cart);

    this.renderDiscountCodeItems(cart);

    this.setCartTotalPrice(cart);
  }

  renderLineItems(cart: Cart) {
    cleanContainer(this.lineItems);

    this.lineItems.append(
      new CreateElement({
        tag: "h2",
        cssClasses: ["basket__line-items-title"],
        textContent: "Products in cart:",
      }).getHTMLElement(),
    );

    cart.lineItems.forEach((product) => {
      const productLine = new ProductLine(
        product,
        this.setCartTotalPrice.bind(this),
        this.deleteCart.bind(this),
      );
      this.lineItems.append(productLine.getHTMLElement());
    });
  }

  renderDiscountCodeItems(cart: Cart) {
    cleanContainer(this.discountCodeItems);

    this.discountCodeItems.append(
      new CreateElement({
        tag: "h2",
        cssClasses: ["basket__discount-code-items-title"],
        textContent: "Don't have a discount?",
      }).getHTMLElement(),
      new CreateElement({
        tag: "p",
        cssClasses: ["basket__discount-code-items-description"],
        textContent: "Look for promocodes on main page",
      }).getHTMLElement(),
    );

    cart.discountCodes.forEach((discountCode) => {
      const discountCodeLine = new DiscountCodeLine(
        discountCode.discountCode,
        this.setCartTotalPrice.bind(this),
        this.renderLineItems.bind(this),
      );
      this.discountCodeItems.append(discountCodeLine.getHTMLElement());
    });
  }

  addDiscount(discountCode: string) {
    document.body.append(modalLoadingScreen.getHTMLElement());

    fetchAddDiscountCode(basketModel.cart, discountCode)
      .then((response) => {
        const cart = response.body;
        basketModel.cart = cart;
        this.renderDiscountCodeItems(cart);
        this.renderLineItems(cart);
        this.setCartTotalPrice(cart);
        this.discountCodeInput.value = "";
      })
      .catch((error) => {
        this.getMessageModal(error.message);
      })
      .finally(() => {
        modalLoadingScreen.getHTMLElement().remove();
      });
  }

  deleteCart() {
    document.body.append(modalLoadingScreen.getHTMLElement());

    if (basketModel.cart)
      fetchDeleteCart(basketModel.cart)
        .then(() => {
          basketModel.resetCart();
          cleanContainer(this.container.getHTMLElement());
          this.render(basketModel.cart);
        })
        .catch((error) => {
          console.log("Error while deleting cart: ", error);
        })
        .finally(() => {
          modalLoadingScreen.close();
        });
  }

  getConfirmationModal() {
    document.body.append(
      new ModalConfirmation(
        "Are you sure you want to delete the cart?",
        this.deleteCart.bind(this),
      ).getHTMLElement(),
    );
  }

  getMessageModal(text: string) {
    document.body.append(new ModalMessage(text).getHTMLElement());
  }

  showEmptyCart() {
    cleanContainer(this.container.getHTMLElement());
    this.container.addInnerElements([
      new CreateElement({
        tag: "h2",
        cssClasses: ["basket__empty"],
        textContent: "Your cart is empty",
      }).getHTMLElement(),
      new CreateElement({
        tag: "a",
        cssClasses: ["basket__empty-link"],
        textContent: "Go to catalog",
        attributes: {
          href: "#catalog",
        },
      }).getHTMLElement(),
    ]);
  }

  setCartTotalPrice(cart: Cart) {
    const isDiscounted = cart.discountOnTotalPrice;
    const totalPrice = cart.totalPrice.centAmount;
    const totalPriceCurrencyCode = cart.totalPrice.currencyCode;
    if (isDiscounted) {
      const discount = cart.discountOnTotalPrice.discountedAmount.centAmount;
      const fullPrice = totalPrice + discount;
      this.cartTotalPrice.innerHTML = `Total cost: <del>${
        fullPrice / 100
      }</del> ${totalPrice / 100} ${totalPriceCurrencyCode}`;
    } else {
      this.cartTotalPrice.textContent = `Total cost: ${
        totalPrice / 100
      } ${totalPriceCurrencyCode}`;
    }
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
