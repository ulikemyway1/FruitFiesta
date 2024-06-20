export default function checkLength(
  value: string,
  element: HTMLParagraphElement
) {
  const hasSpecialChars = /([!@#$%^&*]+)/.test(value);
  if (hasSpecialChars) {
    element.classList.remove("error");
  } else {
    element.classList.add("error");
  }
  return hasSpecialChars;
}
