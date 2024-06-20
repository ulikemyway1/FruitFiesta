export default function checkLength(
  value: string,
  element: HTMLParagraphElement
) {
  const hasWhitespaces = /^\S+$/.test(value);

  if (hasWhitespaces) {
    element.classList.remove("error");
  } else {
    element.classList.add("error");
  }
  return hasWhitespaces;
}
