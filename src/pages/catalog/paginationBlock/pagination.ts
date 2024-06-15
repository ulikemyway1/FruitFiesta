import "./pagination.scss";
import CreateElement from "../../../shared/helpers/element-create";

export default class Pagination {
  limit: number = 20;

  offset: number = 0;

  searchParams: URLSearchParams;

  total?: number;

  private previousButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["pagination__button-prev"],
    textContent: "< Prev",
    eventType: "click",
    callback: () => {
      this.offset -= this.limit;
      this.setOffset(this.offset);
    },
  }).getHTMLElement();

  private currentPage = new CreateElement({
    tag: "span",
    cssClasses: ["pagination__current-page"],
    textContent: "Page:",
  }).getHTMLElement();

  private nextButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["pagination__button-next"],
    textContent: "Next >",
    eventType: "click",
    callback: () => {
      this.offset += this.limit;
      this.setOffset(this.offset);
    },
  }).getHTMLElement();

  private prevPageNextBlock = new CreateElement({
    tag: "span",
    cssClasses: ["pagination__prev-page-next-block"],
    children: [this.previousButton, this.currentPage, this.nextButton],
  }).getHTMLElement();

  private totalPages = new CreateElement({
    tag: "span",
    cssClasses: ["pagination__total-pages"],
    textContent: "Total pages:",
  }).getHTMLElement();

  private itemsOnPageSelect = new CreateElement<HTMLSelectElement>({
    tag: "select",
    cssClasses: ["pagination__items-on-page-select"],
    children: [
      new CreateElement({
        tag: "option",
        textContent: "6",
        attributes: {
          value: "6",
        },
      }).getHTMLElement(),
      new CreateElement({
        tag: "option",
        textContent: "12",
        attributes: {
          value: "12",
        },
      }).getHTMLElement(),
      new CreateElement({
        tag: "option",
        textContent: "20",
        attributes: {
          value: "20",
          selected: "selected",
        },
      }).getHTMLElement(),
    ],
    eventType: "change",
    callback: this.setLimit.bind(this),
  }).getHTMLElement();

  private itemsOnPageLabel = new CreateElement({
    tag: "label",
    cssClasses: ["pagination__items-on-page"],
    textContent: "Items on page: ",
    children: [this.itemsOnPageSelect],
  }).getHTMLElement();

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["pagination"],
    children: [this.prevPageNextBlock, this.totalPages, this.itemsOnPageLabel],
  });

  constructor(searchParams: URLSearchParams, total?: number) {
    this.searchParams = searchParams;
    this.total = total;

    console.log("Pagination searchParams: ", searchParams, total);
    if (searchParams.has("limit")) {
      this.limit = Number(searchParams.get("limit"));
      this.itemsOnPageSelect.value = this.limit.toString();
    }
    if (searchParams.has("offset")) {
      this.offset = Number(searchParams.get("offset"));
    }

    const currentPage = Math.ceil(this.offset / this.limit) + 1;
    if (currentPage === 1) {
      this.previousButton.disabled = true;
    }
    if (total && this.offset + this.limit >= total) {
      this.nextButton.disabled = true;
    }
    this.currentPage.textContent = `Page: ${currentPage}`;

    if (total) {
      this.totalPages.textContent = `Total pages: ${Math.ceil(total / this.limit)}`;
    }
  }

  private setLimit(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.limit = Number(target.value);
    this.offset = 0;
    this.searchParams.set("limit", this.limit.toString());
    this.searchParams.set("offset", this.offset.toString());
    window.location.hash = `${window.location.hash.split("?")[0]}?${this.searchParams.toString()}`;
  }

  private setOffset(offset: number) {
    this.searchParams.set("offset", offset.toString());
    window.location.hash = `${window.location.hash.split("?")[0]}?${this.searchParams.toString()}`;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
