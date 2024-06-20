export default function checkUppercase(
  value: string,
  element: HTMLParagraphElement
) {
  const hasUppercaseLetter = /[A-Z]/.test(value);
  if (hasUppercaseLetter) {
    element.classList.remove("error");
  } else {
    element.classList.add("error");
  }
  return hasUppercaseLetter;
}
