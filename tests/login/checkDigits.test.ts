import { JSDOM } from "jsdom";
import checkDigits from "../../src/features/login/validation/checkDigits";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
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
