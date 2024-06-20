export default function checkUppercase(
  value: string,
  element: HTMLParagraphElement
) {
  const hasLowercaseLetter = /[a-z]/.test(value);
  if (hasLowercaseLetter) {
    element.classList.remove("error");
  } else {
    element.classList.add("error");
  }
  return hasLowercaseLetter;
}
