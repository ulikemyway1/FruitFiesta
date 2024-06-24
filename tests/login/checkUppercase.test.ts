import checkUppercase from "../../src/features/login/validation/checkUppercase";

const paragraph = document.createElement("p");

describe("checkUppercase", () => {
  it("should return true and remove error class if value contains at least one uppercase letter", () => {
    const result = checkUppercase("validPassword", paragraph);
    expect(result).toBe(true);
    expect(paragraph.classList.contains("error")).toBe(false);
  });

  it("should return false and add error class if value does not contain any uppercase letter", () => {
    const secondResult = checkUppercase("not", paragraph);
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
  });
});
