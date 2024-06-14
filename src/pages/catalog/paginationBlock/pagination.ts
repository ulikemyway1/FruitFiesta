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
      console.log("Previous button clicked");
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
      console.log("Next button clicked");
      this.offset += this.limit;
      this.searchParams.set("offset", this.offset.toString());
      window.location.hash = `${window.location.hash.split("?")[0]}?${this.searchParams.toString()}`;
    },
  }).getHTMLElement();

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["pagination"],
    children: [
      this.previousButton,
      this.currentPage,
      this.nextButton,
      this.totalPages,
    ],
  });

  constructor(searchParams: URLSearchParams, total?: number) {
    this.searchParams = searchParams;
    this.total = total;

    console.log("Pagination searchParams: ", searchParams, total);
    if (searchParams.has("limit")) {
      this.limit = Number(searchParams.get("limit"));
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
