import popupView, { PopupView } from "../UI/popupUI";

export class PopupController {
  view: PopupView;

  constructor(view: PopupView) {
    this.view = view;
    this.view.view.addEventListener("click", (e) => {
      if (e.target instanceof HTMLButtonElement) {
        this.toggleSiblings("on");
        this.view.view.remove();
        document.body.style.overflow = "";
      }
    });
  }

  public getViw(): HTMLElement {
    return this.view.getView();
  }

  public setStatus(status: "ok" | "fail", name?: string, failReason?: string) {
    setTimeout(() => this.toggleSiblings("off"), 200);
    if (status === "ok" && name) {
      this.view.title.textContent = "Success!";
      this.view.view.classList.remove("fail");
      this.view.view.classList.add("success");
      this.view.descr.textContent = `Dear ${name}, you have successfully created an account`;
    } else {
      this.view.title.textContent = "Something went wrong :(";
      this.view.view.classList.add("fail");
      this.view.view.classList.remove("success");
      this.view.descr.textContent = `${failReason}`;
    }
  }

  public toggleSiblings(method: ToggleSiblingsMethods): void {
    let sibling = this.view.getView().previousElementSibling;
    while (sibling) {
      if (sibling instanceof HTMLElement) {
        if (method === "off") {
          sibling.classList.add("disabled-pointer", "fade-out");
        } else {
          sibling.classList.remove("disabled-pointer", "fade-out");
        }
      }
      sibling = sibling.previousElementSibling;
    }
  }
}

const popupController = new PopupController(popupView);

export default popupController;

type ToggleSiblingsMethods = "on" | "off";
