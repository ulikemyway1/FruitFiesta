import checkLowercase from "../../src/features/login/validation/checkLowercase";

const paragraph = document.createElement("p");

describe("checkLowercase", () => {
  it("should return true and remove error class if value contains at least one lowercase letter", () => {
    const result = checkLowercase("validpassword", paragraph);
    expect(result).toBe(true);
    expect(paragraph.classList.contains("error")).toBe(false);
  });

  it("should return false and add error class if value does not contain any lowercase letter", () => {
    const secondResult = checkLowercase("NOT", paragraph);
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
  });
});
