export default function checkAt(value: string, element: HTMLParagraphElement) {
  const hasAt = value.includes("@");
  if (hasAt) {
    element.classList.remove("error");
  } else {
    element.classList.add("error");
  }
  return hasAt;
}
