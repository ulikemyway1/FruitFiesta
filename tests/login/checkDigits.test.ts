import checkDigits from "../../src/features/login/validation/checkDigits";

const paragraph = document.createElement("p");

describe("checkDigits", () => {
  it("should return true and remove error class if value contains at least one digit", () => {
    const result = checkDigits("valid1password", paragraph);
    expect(result).toBe(true);
    expect(paragraph.classList.contains("error")).toBe(false);
  });

  it("should return false and add error class if value does not contain any digits", () => {
    const secondResult = checkDigits("not", paragraph);
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
  });
});
