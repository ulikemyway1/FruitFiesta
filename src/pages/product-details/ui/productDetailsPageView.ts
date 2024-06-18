import { ProductProjection } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import getProductData from "../api/getProductData";
import notFoundPageView from "../../notFound";
import Router from "../../../app/routing/model/router";
import "./product-details.scss";
import { reviews } from "../model/review";
import sliderInit from "../slider/swiper";
import imageDialog from "../../../features/dialog/ui/imageDialog";
import imageSliderInit from "../../../features/dialog/slider/slider";
import { fetchAddToCart, fetchRemoveFromCart } from "../../basket/apiBasket";
import basketModel from "../../basket/basketModel";
import fetchLoadingWrapperDecorator from "../../../shared/helpers/fetchLoadingWrapperDecorator";

export default class ProductDetailsPageView {
  private product: ProductProjection | undefined;

  private goodPrice = 0;

  private view: HTMLElement = new CreateElement({
    tag: "main",
    cssClasses: ["product-detail"],
  }).getHTMLElement();

  private sliderNext = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-button-next"],
  }).getHTMLElement();

  private sliderPrev = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-button-prev"],
  }).getHTMLElement();

  private sliderPagination = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-pagination"],
  }).getHTMLElement();

  private sliderSlideOne = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-slide"],
  }).getHTMLElement();

  private sliderSlideTwo = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-slide"],
  }).getHTMLElement();

  private sliderSlideThree = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-slide"],
  }).getHTMLElement();

  private sliderInnerLine = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-wrapper"],
    children: [this.sliderSlideOne, this.sliderSlideTwo, this.sliderSlideThree],
  }).getHTMLElement();

  private sliderContainer = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper"],
    children: [
      this.sliderInnerLine,
      this.sliderPagination,
      this.sliderPrev,
      this.sliderNext,
    ],
  }).getHTMLElement();

  private orderPlus = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__order-plus"],
    textContent: "+",
  }).getHTMLElement();

  private orderQuantity = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__order-quantity"],
    textContent: "1",
  }).getHTMLElement();

  private orderMinus = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__order-minus"],
    textContent: "-",
  }).getHTMLElement();

  private orderCounterBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__order-counter"],
    children: [this.orderMinus, this.orderQuantity, this.orderPlus],
  }).getHTMLElement();

  private orderText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__order-text"],
    textContent: "No. of products",
  }).getHTMLElement();

  private orderBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__order-box"],
    children: [this.orderText, this.orderCounterBox],
  }).getHTMLElement();

  private reviewText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__review-text"],
  }).getHTMLElement();

  private reviewIcon = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__review-icon"],
  }).getHTMLElement();

  private reviewBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__review-box"],
    children: [this.reviewIcon, this.reviewText],
  }).getHTMLElement();

  private productDescription = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__description"],
  }).getHTMLElement();

  private productPrice = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__price"],
  }).getHTMLElement();

  private productDiscount = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__discount"],
  }).getHTMLElement();

  private priceBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__price-box"],
    children: [this.productPrice, this.productDiscount],
  }).getHTMLElement();

  private productTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__title"],
  }).getHTMLElement();

  private totalText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__total-text"],
    textContent: "Total:",
  }).getHTMLElement();

  private totalPrice = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__total-price"],
  }).getHTMLElement();

  private totalPriceBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__total-price-box"],
    children: [this.totalText, this.totalPrice],
  }).getHTMLElement();

  private addToCartButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["product__total-button"],
    textContent: "Add to cart",
  }).getHTMLElement();

  private removeFromCartButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["product__total-button"],
    textContent: "Remove from cart",
    eventType: "click",
    callback: this.removeProductHandler.bind(this),
  }).getHTMLElement();

  // private totalBox = new CreateElement<HTMLDivElement>({
  //   tag: "div",
  //   cssClasses: ["product__total-box"],
  //   children: [this.totalPriceBox, this.addToCartButton],
  // }).getHTMLElement();

  private productContainer = new CreateElement<HTMLElement>({
    tag: "article",
    cssClasses: ["product"],
    children: [
      this.productTitle,
      this.priceBox,
      this.productDescription,
      this.reviewBox,
      this.orderBox,
      // this.totalBox,
      this.totalPriceBox,
      this.addToCartButton,
    ],
  }).getHTMLElement();

  private productInfoContainer = new CreateElement<HTMLElement>({
    tag: "article",
    cssClasses: ["container"],
    children: [this.sliderContainer, this.productContainer],
  }).getHTMLElement();

  constructor(key: string) {
    this.getProduct(key);
    this.addToCartButton.addEventListener("click", (event: Event) =>
      this.handleBuyButton(event, Number(this.orderQuantity.textContent)),
    );
    this.orderMinus.addEventListener("click", () => {
      this.decrementCounter();
      this.updateTotalPrice();
    });
    this.orderPlus.addEventListener("click", () => {
      this.incrementCounter();
      this.updateTotalPrice();
    });
    this.sliderInnerLine.addEventListener("click", () => {
      imageDialog.openImageDialog();
    });
    imageDialog.crossContainer.addEventListener("click", () => {
      imageDialog.closeImageDialog();
    });
  }

  private async removeProductHandler() {
    const cart = await basketModel.loadSetGetCart();
    const lineItem = cart.lineItems.find(
      (item) => item.productId === this.product?.id,
    );
    if (!lineItem) return;

    fetchLoadingWrapperDecorator(fetchRemoveFromCart(cart, lineItem.id))
      .then((response) => {
        basketModel.cart = response.body;
        if (this.product) this.checkIfInCart(this.product.id);
      })
      .catch((error) => {
        console.log("Error while removing product: ", error);
      });
  }

  private checkIfInCart(productId: ProductProjection["id"]) {
    basketModel.loadSetGetCart().then((cart) => {
      const quantity = cart.lineItems.find(
        (item) => item.productId === productId,
      )?.quantity;
      if (quantity) {
        this.addToCartButton.textContent = `Add to cart (in cart: ${quantity})`;
        this.productContainer.append(this.removeFromCartButton);
        // this.buyButton.getHTMLElement().disabled = true;
      } else {
        this.addToCartButton.textContent = "Add to cart";
        this.removeFromCartButton.remove();
      }
    });
  }

  getProduct(key: string) {
    getProductData(key)
      .then((response) => {
        this.product = response.body;
        this.drawProduct(response.body);
        imageDialog.drawEnlargedImage(response.body);
        imageSliderInit();

        this.checkIfInCart(this.product.id);
      })
      .catch(() => {
        Router.switchContent(notFoundPageView);
      });
  }

  private incrementCounter() {
    const quantity = Number(this.orderQuantity.textContent);
    if (quantity > 50) return;
    this.orderQuantity.textContent = `${quantity + 1}`;
  }

  private decrementCounter() {
    const quantity = Number(this.orderQuantity.textContent);
    if (quantity === 1) return;
    this.orderQuantity.textContent = `${quantity - 1}`;
  }

  private getReview(reviewsArray: string[]) {
    const index = Math.floor(Math.random() * reviewsArray.length);
    return reviewsArray[index];
  }

  private drawProduct(product: ProductProjection) {
    if (product) {
      this.sliderSlideOne.style.backgroundImage =
        product.masterVariant.images && product.masterVariant.images.length
          ? `url(${product.masterVariant.images[0].url})`
          : "";
      this.sliderSlideTwo.style.backgroundImage =
        product.masterVariant.images && product.masterVariant.images.length
          ? `url(${product.masterVariant.images[1].url})`
          : "";
      this.sliderSlideThree.style.backgroundImage =
        product.masterVariant.images && product.masterVariant.images.length
          ? `url(${product.masterVariant.images[2].url})`
          : "";

      this.productTitle.textContent = product.name ? product.name["en-GB"] : "";

      this.productDescription.textContent = product.description
        ? product.description["en-GB"]
        : "";

      if (product.masterVariant.prices && product.masterVariant.prices.length) {
        const defaultPrice = (
          product.masterVariant.prices[0].value.centAmount / 100
        ).toFixed(2);
        this.goodPrice = +defaultPrice;

        const currency = product.masterVariant.prices[0].value.currencyCode;

        this.productPrice.textContent = `${defaultPrice} ${currency}`;

        this.totalPrice.textContent = `${defaultPrice} ${currency}`;

        const discount = product.masterVariant.prices[0].discounted;

        if (discount) {
          const price = discount.value.centAmount / 100;
          this.goodPrice = +price.toFixed(2);
          this.productDiscount.textContent = `${price.toFixed(2)} ${currency}`;
          this.productPrice.style.textDecoration = "line-through";
          this.totalPrice.textContent = (
            price * Number(this.orderQuantity.textContent)
          ).toFixed(2);
        }
      }
      this.reviewText.textContent = this.getReview(reviews);
      sliderInit();
    }
  }

  private updateTotalPrice() {
    this.totalPrice.textContent = (
      this.goodPrice * Number(this.orderQuantity.textContent)
    ).toFixed(2);
  }

  private async handleBuyButton(event: Event, quantity: number) {
    if (!this.product) return;

    const cart = await basketModel.loadSetGetCart();
    fetchLoadingWrapperDecorator(
      fetchAddToCart(cart, this.product.id, quantity),
    )
      .then((response) => {
        basketModel.cart = response.body;
        if (this.product) this.checkIfInCart(this.product.id);
      })
      .catch((error) => {
        console.log("Error while changing quantity: ", error);
      });
  }

  public getView(): HTMLElement {
    this.view.append(this.productInfoContainer, imageDialog.getFormView());
    return this.view;
  }
}
