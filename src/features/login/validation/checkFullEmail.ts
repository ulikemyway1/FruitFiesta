export default function checkLength(
  value: string,
  element: HTMLParagraphElement,
  input: HTMLInputElement,
) {
  const isEmailValid = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(
    value,
  );
  if (isEmailValid) {
    element.classList.remove("error");
    input.classList.remove("error");
  } else {
    element.classList.add("error");
    input.classList.add("error");
  }
  return isEmailValid;
}
