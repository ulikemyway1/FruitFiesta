export default function checkLength(
  value: string,
  element: HTMLParagraphElement
) {
  const isProperLength = value.length > 7;
  if (isProperLength) {
    element.classList.remove("error");
  } else {
    element.classList.add("error");
  }
  return isProperLength;
}
