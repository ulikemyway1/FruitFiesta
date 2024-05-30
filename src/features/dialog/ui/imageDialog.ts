import { ProductProjection } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import "./image-dialog.scss";

export class ImageDialog {
  private sliderNext = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-button-next", "image-button-next"],
  }).getHTMLElement();

  private sliderPrev = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-button-prev", "image-button-prev"],
  }).getHTMLElement();

  private sliderPagination = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-pagination", "image-pagination"],
  }).getHTMLElement();

  private sliderSlideOne = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-slide", "image-slide"],
  }).getHTMLElement();

  private sliderSlideTwo = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-slide", "image-slide"],
  }).getHTMLElement();

  private sliderSlideThree = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-slide", "image-slide"],
  }).getHTMLElement();

  crossContainer = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["modal-cross"],
  }).getHTMLElement();

  sliderInnerLine = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["swiper-wrapper", "image-wrapper"],
    children: [this.sliderSlideOne, this.sliderSlideTwo, this.sliderSlideThree],
  }).getHTMLElement();

  private sliderContainer = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["dialog-swiper"],
    children: [
      this.sliderInnerLine,
      this.sliderPagination,
      this.sliderPrev,
      this.sliderNext,
    ],
  }).getHTMLElement();

  dialogEl = new CreateElement<HTMLDialogElement>({
    tag: "dialog",
    cssClasses: ["dialog"],
    children: [this.sliderContainer, this.crossContainer],
  }).getHTMLElement();

  openImageDialog() {
    this.dialogEl.showModal();
    document.body.classList.add("scroll-lock");
  }

  closeImageDialog() {
    this.dialogEl.close();
    document.body.classList.remove("scroll-lock");
  }

  drawEnlargedImage(product: ProductProjection) {
    if (product.masterVariant.images && product.masterVariant.images.length) {
      product.masterVariant.images.forEach((picture, index) => {
        const image = new CreateElement<HTMLImageElement>({
          tag: "img",
          cssClasses: ["slider-image"],
          attributes: { src: picture.url },
        }).getHTMLElement();

        if (index === 0) {
          this.sliderSlideOne.innerHTML = "";
          this.sliderSlideOne.append(image);
        } else if (index === 1) {
          this.sliderSlideTwo.innerHTML = "";
          this.sliderSlideTwo.append(image);
        } else if (index === 2) {
          this.sliderSlideThree.innerHTML = "";
          this.sliderSlideThree.append(image);
        }
      });
    }
  }

  getFormView(): HTMLElement {
    return this.dialogEl;
  }
}

const imageDialog = new ImageDialog();
export default imageDialog;
