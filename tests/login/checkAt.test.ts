import checkAt from "../../src/features/login/validation/checkAt";

const paragraph = document.createElement("p");

describe("checkAt", () => {
  it("should return true and remove error class if value contains @ character", () => {
    const result = checkAt("valid@password", paragraph);
    expect(result).toBe(true);
    expect(paragraph.classList.contains("error")).toBe(false);
  });

  it("should return false and add error class if value does not contain @ character", () => {
    const secondResult = checkAt("not", paragraph);
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
  });
});