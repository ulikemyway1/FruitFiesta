import CreateElement from "../../../shared/helpers/element-create";

export default class Pagination {
  limit: number = 20;

  offset: number = 0;

  searchParams: URLSearchParams;

  total?: number;

  private currentPage = new CreateElement({
    tag: "span",
    cssClasses: ["pagination__current-page"],
    textContent: "Current page:",
  }).getHTMLElement();

  private totalPages = new CreateElement({
    tag: "span",
    cssClasses: ["pagination__total-pages"],
    textContent: "Total pages:",
  }).getHTMLElement();

  private previousButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["pagination__button"],
    textContent: "< PREV",
    eventType: "click",
    callback: () => {
      this.offset -= this.limit;
      this.searchParams.set("offset", this.offset.toString());
      window.location.hash = `${window.location.hash.split("?")[0]}?${this.searchParams.toString()}`;
    },
  }).getHTMLElement();

  private nextButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["pagination__button"],
    textContent: "NEXT >",
    eventType: "click",
    callback: () => {
      this.offset += this.limit;
      this.searchParams.set("offset", this.offset.toString());
      window.location.hash = `${window.location.hash.split("?")[0]}?${this.searchParams.toString()}`;
    },
  }).getHTMLElement();

  private itemsOnPageSelect = new CreateElement<HTMLSelectElement>({
    tag: "select",
    cssClasses: ["pagination__items-on-page-select"],
    children: [
      new CreateElement({
        tag: "option",
        textContent: "5",
        attributes: {
          value: "5",
        },
      }).getHTMLElement(),
      new CreateElement({
        tag: "option",
        textContent: "10",
        attributes: {
          value: "10",
        },
      }).getHTMLElement(),
      new CreateElement({
        tag: "option",
        textContent: "15",
        attributes: {
          value: "15",
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
    callback: (event) => {
      const target = event.target as HTMLSelectElement;
      this.limit = Number(target.value);
      this.offset = 0;
      this.searchParams.set("limit", this.limit.toString());
      this.searchParams.set("offset", this.offset.toString());
      window.location.hash = `${window.location.hash.split("?")[0]}?${this.searchParams.toString()}`;
    },
  }).getHTMLElement();

  private itemsOnPageLabel = new CreateElement({
    tag: "label",
    cssClasses: ["pagination__items-on-page"],
    textContent: "Items on page:",
    children: [this.itemsOnPageSelect],
  }).getHTMLElement();

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["pagination"],
    children: [
      this.previousButton,
      this.currentPage,
      this.nextButton,
      this.totalPages,
      this.itemsOnPageLabel,
    ],
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
    this.currentPage.textContent = `Current page: ${currentPage}`;

    if (total) {
      this.totalPages.textContent = `Total pages: ${Math.ceil(total / this.limit)}`;
    }
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
