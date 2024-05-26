import CreateElement from "../../../../shared/helpers/element-create";

export class ProductInfoView {
  private firstImage = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["product-info__slider-image"],
    attributes: { alt: "product" },
    children: [],
  }).getHTMLElement();

  private sliderInnerLine = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product-info__slider-inner-line"],
    children: [this.firstImage],
  }).getHTMLElement();

  private sliderContainer = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product-info__slider"],
    children: [this.sliderInnerLine],
  }).getHTMLElement();

  private orderPlus = new CreateElement<HTMLSpanElement>({
    tag: "span",
    cssClasses: ["product-info__product-order-plus"],
    textContent: "+",
  }).getHTMLElement();

  private orderQuantity = new CreateElement<HTMLSpanElement>({
    tag: "span",
    cssClasses: ["product-info__product-order-quantity"],
  }).getHTMLElement();

  private orderMinus = new CreateElement<HTMLSpanElement>({
    tag: "span",
    cssClasses: ["product-info__product-order-minus"],
    textContent: "-",
  }).getHTMLElement();

  private orderCounterBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product-info__product-order-counter"],
    children: [this.orderPlus, this.orderQuantity, this.orderMinus],
  }).getHTMLElement();

  private orderText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product-info__product-order-text"],
    textContent: "No. of orders",
  }).getHTMLElement();

  private orderBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product-info__product-order-box"],
    children: [this.orderText, this.orderCounterBox],
  }).getHTMLElement();

  private reviewText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product-info__product-review-text"],
  }).getHTMLElement();

  private reviewIcon = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product-info__product-review-icon"],
  }).getHTMLElement();

  private reviewBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product-info__product-review-box"],
    children: [this.reviewIcon, this.reviewText],
  }).getHTMLElement();

  private productDescription = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product-info__product-description"],
  }).getHTMLElement();

  private productPrice = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product-info__product-price"],
  }).getHTMLElement();

  private productTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product-info__product-title"],
  }).getHTMLElement();

  private totalText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product-info__product-total-text"],
    textContent: "Total:",
  }).getHTMLElement();

  private totalPrice = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["product-info__product-total-price"],
  }).getHTMLElement();

  private addToCartButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["product-info__product-total-button"],
  }).getHTMLElement();

  private totalBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["product-info__product-total-box"],
    children: [this.totalText, this.totalPrice, this.addToCartButton],
  }).getHTMLElement();

  private productContainer = new CreateElement<HTMLElement>({
    tag: "article",
    cssClasses: ["product-info__product"],
    children: [
      this.productTitle,
      this.productPrice,
      this.productDescription,
      this.reviewBox,
      this.orderBox,
      this.totalBox,
    ],
  }).getHTMLElement();

  private productInfoContainer = new CreateElement<HTMLElement>({
    tag: "section",
    cssClasses: ["product-info"],
    children: [this.sliderContainer, this.productContainer],
  }).getHTMLElement();

  getProductInfoVue(): HTMLElement {
    return this.productInfoContainer;
  }
}

const productInfoView = new ProductInfoView();

export default productInfoView;
