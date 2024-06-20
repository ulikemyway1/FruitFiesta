import { JSDOM } from "jsdom";
import checkLength from "../../src/features/login/validation/checkLength";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
const paragraph = document.createElement("p");

describe("checkLength", () => {
  it("should return true and remove error class if value is longer than 7 characters", () => {
    const result = checkLength("validpassword", paragraph);
    expect(result).toBe(true);
    expect(paragraph.classList.contains("error")).toBe(false);
  });

  it("should return false and add error class if value is shorter than 7 characters", () => {
    const secondResult = checkLength("not", paragraph);
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
  });
});
