import { SectionContent } from "../model/plateModel";

export default function deleteValidationError(
  e: Event,
  sectionContent: SectionContent,
) {
  const targetInput = e.target;
  if (
    sectionContent.validationObject.status === "fail" &&
    targetInput instanceof HTMLElement
  ) {
    const wrapper = targetInput.parentElement;
    if (wrapper) {
      let { lastElementChild } = wrapper;
      while (
        lastElementChild &&
        lastElementChild.classList.contains("plate__validation-error")
      ) {
        lastElementChild.remove();
        lastElementChild = lastElementChild.previousElementSibling;
      }
    }
  }
}
