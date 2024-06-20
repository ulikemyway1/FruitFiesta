import { JSDOM } from "jsdom";
import checkSpaces from "../../src/features/login/validation/checkSpaces";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
const paragraph = document.createElement("p");

describe("checkSpaces", () => {
  it("should return true and remove error class if value does not contain any spaces", () => {
    const result = checkSpaces("valid", paragraph);
    expect(result).toBe(true);
    expect(paragraph.classList.contains("error")).toBe(false);
  });

  it("should return false and add error class if value does not contains at least one space", () => {
    const secondResult = checkSpaces("n o t", paragraph);
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
  });
});
