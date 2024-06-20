export default function checkLength(
  value: string,
  element: HTMLParagraphElement
) {
  const hasDigits = /[0-9]/.test(value);
  if (hasDigits) {
    element.classList.remove("error");
  } else {
    element.classList.add("error");
  }
  return hasDigits;
}
