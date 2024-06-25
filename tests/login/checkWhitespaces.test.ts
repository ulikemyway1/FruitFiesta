import checkWhitespaces from "../../src/features/login/validation/checkWhitespaces";

const paragraph = document.createElement("p");

describe("checkWhitespaces", () => {
  it("should return true and remove error class if value does not contain any whitespaces", () => {
    const result = checkWhitespaces("valid", paragraph);
    expect(result).toBe(true);
    expect(paragraph.classList.contains("error")).toBe(false);
  });

  it("should return false and add error class if value does not contains whitespaces", () => {
    const secondResult = checkWhitespaces(" no t ", paragraph);
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
  });
});
