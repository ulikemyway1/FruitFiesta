import { ProductProjection } from "@commercetools/platform-sdk";
import CreateElement from "../../../../shared/helpers/element-create";
import { reviews } from "../model/review";
import "./product-info.scss";

export class ProductInfoView {
  private firstImage = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["product__slider-image"],
    attributes: { alt: "product" },
    children: [],
  }).getHTMLElement();

  private sliderInnerLine = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__slider-inner-line"],
    children: [this.firstImage],
  }).getHTMLElement();

  private sliderContainer = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__slider"],
    children: [this.sliderInnerLine],
  }).getHTMLElement();

  orderPlus = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__order-plus"],
    textContent: "+",
  }).getHTMLElement();

  orderQuantity = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product__order-quantity"],
    textContent: "1",
  }).getHTMLElement();

  orderMinus = new CreateElement<HTMLDivElement>({
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

  addToCartButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["product__total-button"],
    textContent: "Add to cart",
  }).getHTMLElement();

  private totalBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product__total-box"],
    children: [this.totalPriceBox, this.addToCartButton],
  }).getHTMLElement();

  private productContainer = new CreateElement<HTMLElement>({
    tag: "article",
    cssClasses: ["product"],
    children: [
      this.productTitle,
      this.priceBox,
      this.productDescription,
      this.reviewBox,
      this.orderBox,
      this.totalBox,
    ],
  }).getHTMLElement();

  private productInfoContainer = new CreateElement<HTMLElement>({
    tag: "article",
    cssClasses: ["container"],
    children: [this.sliderContainer, this.productContainer],
  }).getHTMLElement();

  getReview(reviewsArray: string[]) {
    const index = Math.floor(Math.random() * reviewsArray.length);
    return reviewsArray[index];
  }

  drawProduct(product: ProductProjection) {
    if (product) {
      this.firstImage.src =
        product.masterVariant.images && product.masterVariant.images.length
          ? product.masterVariant.images[0].url
          : "";

      this.productTitle.textContent = product.name ? product.name["en-GB"] : "";

      this.productDescription.textContent = product.description
        ? product.description["en-GB"]
        : "";

      if (product.masterVariant.prices && product.masterVariant.prices.length) {
        const defaultPrice = (
          product.masterVariant.prices[0].value.centAmount / 100
        ).toFixed(2);

        const currency = product.masterVariant.prices[0].value.currencyCode;

        this.productPrice.textContent = `${defaultPrice} ${currency}`;

        this.totalPrice.textContent = `${defaultPrice} ${currency}`;

        const discount = product.masterVariant.prices[0].discounted;
        if (discount) {
          const price = `${(discount.value.centAmount / 100).toFixed(
            2
          )} ${currency}`;
          this.productDiscount.textContent = price;
          this.productPrice.style.textDecoration = "line-through";
          this.totalPrice.textContent = price;
        }
      }
      this.reviewText.textContent = this.getReview(reviews);
    }
  }

  getProductInfoVue(): HTMLElement {
    return this.productInfoContainer;
  }
}

const productInfoView = new ProductInfoView();

export default productInfoView;
