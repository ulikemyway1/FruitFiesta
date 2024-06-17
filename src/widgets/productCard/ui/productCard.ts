import "./productCard.scss";
import { ProductProjection } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import Hash from "../../../shared/routs/enumHash";
import { fetchAddToCart } from "../../../pages/basket/apiBasket";
import basketModel from "../../../pages/basket/basketModel";
import modalLoadingScreen from "../../modalLoadingScreen/modalLoadingScreen";

export default class ProductCardView {
  private product: ProductProjection;

  private img = new CreateElement({
    tag: "img",
    cssClasses: ["product-card__img"],
    attributes: {
      alt: "ProductImg",
    },
  });

  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["product-card__title"],
    textContent: "Some title",
  });

  private text = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__description"],
    textContent: "Some text.",
  });

  private price = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__price"],
  });

  private discountPrice = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__discount-price"],
  });

  // можно сделать какую надо и вынести в компоненты
  private buyButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["buy-button"],
    textContent: "Add to cart",
    eventType: "click",
    callback: this.handleBuyButton.bind(this),
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__content"],
    children: [
      this.img,
      this.title,
      this.text,
      this.price,
      this.discountPrice,
      this.buyButton,
    ],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["product-card"],
    children: [this.img, this.content],
    eventType: "click",
    callback: this.handleProductDetails.bind(this),
  });

  constructor(product: ProductProjection) {
    this.product = product;

    this.title.getHTMLElement().textContent = product.name
      ? product.name["en-GB"]
      : "";
    this.text.getHTMLElement().textContent = product.description
      ? this.cutDescription(product.description["en-GB"])
      : "";
    product.masterVariant.prices?.forEach((price) => {
      this.price.getHTMLElement().textContent = `${
        price.value.centAmount / 100
      } ${price.value.currencyCode}`;
      if (price.discounted) {
        this.price.getHTMLElement().style.textDecoration = "line-through";
        this.discountPrice
          .getHTMLElement()
          .append(
            `${price.discounted.value.centAmount / 100} ${
              price.discounted.value.currencyCode
            }`,
          );
      }
    });
    if (product.masterVariant.images?.[0]?.url) {
      this.img
        .getHTMLElement()
        .setAttribute("src", product.masterVariant.images[0].url);
    }

    // TODO: that's a sucks solution
    setTimeout(() => {
      this.checkIfInCart(product.id);
    }, 100);
  }

  private checkIfInCart(productId: ProductProjection["id"]) {
    const { cart } = basketModel;
    if (!cart) return;
    const quantity = cart.lineItems.find(
      (item) => item.productId === productId,
    )?.quantity;
    if (quantity) {
      this.buyButton.getHTMLElement().textContent = `Add to cart (in cart: ${quantity})`;
    }
  }

  private cutDescription(str: string) {
    const array = str.split(" ");
    if (array.length > 9) {
      return `${array.filter((_, index) => index < 9).join(" ")}...`;
    }
    return str;
  }

  private async handleBuyButton(event: Event) {
    document.body.append(modalLoadingScreen.getHTMLElement());

    event.stopPropagation();
    const cart = await basketModel.getCart();
    fetchAddToCart(cart, this.product.id)
      .then((response) => {
        basketModel.cart = response.body;
        this.checkIfInCart(this.product.id);
      })
      .catch((error) => {
        console.log("Error while changing quantity: ", error);
      })
      .finally(() => {
        modalLoadingScreen.close();
      });
  }

  private handleProductDetails() {
    window.location.href = `${Hash.PRODUCT}/${this.product.key}`;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
