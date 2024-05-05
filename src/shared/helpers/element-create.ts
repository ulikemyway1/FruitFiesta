// interface CreateElementParams {
//   id?: string;
//   tag: keyof HTMLElementTagNameMap;
//   cssClasses?: string[];
//   attributes?: { [key: string]: string };
//   textContent?: string;
//   innerHTML?: string;
//   callback?: (event: Event) => void;
//   eventType?: keyof HTMLElementEventMap;
//   children?: (HTMLElement | CreateElement<HTMLElement>)[];
// }

// export default class CreateElement<T extends HTMLElement> {
//   private element: T;

//   constructor(params: CreateElementParams) {
//     this.element = document.createElement(params.tag) as T;
//     if (params.id) {
//       this.element.id = params.id;
//     }
//     if (params.cssClasses) {
//       this.element.classList.add(...params.cssClasses);
//     }
//     if (params.attributes) {
//       Object.entries(params.attributes).forEach(([key, value]) => {
//         this.element.setAttribute(key, value);
//       });
//     }
//     if (params.textContent) {
//       this.element.textContent = params.textContent;
//     }
//     if (params.innerHTML) {
//       this.element.innerHTML = params.innerHTML;
//     }
//     const { callback, eventType } = params;
//     if (eventType && callback && typeof callback === "function") {
//       this.element.addEventListener(eventType, callback);
//     }
//     if (params.children) {
//       this.addInnerElements(params.children);
//     }
//   }

//   private addInnerElement<U extends HTMLElement>(
//     element: U | CreateElement<U>,
//   ) {
//     if (element instanceof CreateElement) {
//       this.element.append(element.getHTMLElement());
//     } else {
//       this.element.append(element);
//     }
//   }

//   addInnerElements(
//     elements:
//       | (HTMLElement | CreateElement<HTMLElement>)
//       | (HTMLElement | CreateElement<HTMLElement>)[],
//   ) {
//     if (Array.isArray(elements))
//       elements.forEach((element) => {
//         this.addInnerElement(element);
//       });
//     else {
//       this.addInnerElement(elements);
//     }
//   }

//   getHTMLElement(): T {
//     return this.element;
//   }
// }
