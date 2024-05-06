// import loginForm from "../ui/loginForm";

// function checkAt(value: string) {
//   const hasAt = value.includes("@");
//   if (hasAt) {
//     loginForm.atError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.atError.getHTMLElement().classList.add("error");
//   }
//   return hasAt;
// }

// function checkSpaces(value: string) {
//   const hasNotSpaces = /^\S+$/.test(value);
//   if (hasNotSpaces) {
//     loginForm.spacesError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.spacesError.getHTMLElement().classList.add("error");
//   }
//   return hasNotSpaces;
// }

// function checkFullEmail(value: string) {
//   const isEmailValid = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(
//     value,
//   );
//   if (isEmailValid) {
//     loginForm.generalError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.generalError.getHTMLElement().classList.add("error");
//   }
//   return isEmailValid;
// }

// function linkToMainPage() {
//   console.log("link to MainPage");
// }

// export function emailInputHandler() {
//   const emailInputValue = loginForm.emailInput.getHTMLElement().value;

//   const spaces = checkSpaces(emailInputValue);
//   const at = checkAt(emailInputValue);
//   const general = checkFullEmail(emailInputValue);

//   return spaces && at && general;
// }

// function checkLength(value: string) {
//   const isProperLength = value.length > 7;
//   if (isProperLength) {
//     loginForm.lengthError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.lengthError.getHTMLElement().classList.add("error");
//   }
//   return isProperLength;
// }

// function checkUppercase(value: string) {
//   const hasUppercaseLetter = /[A-Z]/.test(value);
//   if (hasUppercaseLetter) {
//     loginForm.uppercaseError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.uppercaseError.getHTMLElement().classList.add("error");
//   }
//   return hasUppercaseLetter;
// }

// function checkLowercase(value: string) {
//   const hasLowercaseLetter = /[a-z]/.test(value);
//   if (hasLowercaseLetter) {
//     loginForm.lowercaseError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.lowercaseError.getHTMLElement().classList.add("error");
//   }
//   return hasLowercaseLetter;
// }

// function checkDigits(value: string) {
//   const hasDigits = /[0-9]/.test(value);
//   if (hasDigits) {
//     loginForm.digitError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.digitError.getHTMLElement().classList.add("error");
//   }
//   return hasDigits;
// }

// function checkSpecialChars(value: string) {
//   const hasSpecialChars = /([!@#$%^&*]+)/.test(value);
//   if (hasSpecialChars) {
//     loginForm.charError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.charError.getHTMLElement().classList.add("error");
//   }
//   return hasSpecialChars;
// }

// function checkWhitespaces(value: string) {
//   const hasWhitespaces = value.charAt(0) || value.charAt(-1);
//   if (hasWhitespaces) {
//     loginForm.whitespaceError.getHTMLElement().classList.remove("error");
//   } else {
//     loginForm.whitespaceError.getHTMLElement().classList.add("error");
//   }
//   return hasWhitespaces;
// }

// export function passwordInputHandler() {
//   const passwordInputValue = loginForm.passwordInput.getHTMLElement().value;

//   const length = checkLength(passwordInputValue);
//   const upperCase = checkUppercase(passwordInputValue);
//   const lowerCase = checkLowercase(passwordInputValue);
//   const digits = checkDigits(passwordInputValue);
//   const specialChars = checkSpecialChars(passwordInputValue);
//   const spaces = checkWhitespaces(passwordInputValue);

//   return length && upperCase && lowerCase && digits && specialChars && spaces;
// }

// export function linkToRegistration() {
//   // For Stub
// }

// export function submitHandler() {
//   if (passwordInputHandler() && emailInputHandler()) {
//     linkToMainPage();
//   }
// }
