import { JSDOM } from "jsdom";
import checkFullEmail from "../../src/features/login/validation/checkFullEmail";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
const paragraph = document.createElement("p");
const input = document.createElement("input");

describe("checkFullEmail", () => {
  it("should return true and remove error classes from paragraph and input elements for a valid email", () => {
    const validEmail = checkFullEmail(
      "imyakhoroshee@rss.com",
      paragraph,
      input
    );
    expect(validEmail).toBe(true);
    expect(paragraph.classList.contains("error")).toBe(false);
    expect(input.classList.contains("error")).toBe(false);
  });

  it("should return false and add the error class to paragraph and input in case of invalid email", () => {
    const secondResult = checkFullEmail(
      "imyakhoroshee-rss-com",
      paragraph,
      input
    );
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
    expect(input.classList.contains("error")).toBe(true);
  });
  it("should return false and add the error class to paragraph and input in case of empty string", () => {
    const secondResult = checkFullEmail("", paragraph, input);
    expect(secondResult).toBe(false);
    expect(paragraph.classList.contains("error")).toBe(true);
    expect(input.classList.contains("error")).toBe(true);
  });
});
