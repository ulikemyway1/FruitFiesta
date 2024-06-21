export default function checkUppercase(
  value: string,
  element: HTMLParagraphElement,
) {
  const hasNotSpaces = /^\S+$/.test(value);
  if (hasNotSpaces) {
    element.classList.remove("error");
  } else {
    element.classList.add("error");
  }
  return hasNotSpaces;
}
