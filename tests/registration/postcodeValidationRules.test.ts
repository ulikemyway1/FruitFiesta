import { isMemberOfCountriesSet } from "../../src/features/registration/lib/validation/postcodeValidationRules";

describe("isMemberOfCountriesSet", () => {
  it("should return true if country is valid", () => {
    expect(isMemberOfCountriesSet("Belarus")).toBe(true);
    expect(isMemberOfCountriesSet("Russia")).toBe(true);
    expect(isMemberOfCountriesSet("Poland")).toBe(true);
    expect(isMemberOfCountriesSet("Ukraine")).toBe(true);
  });
  it("should return false if country is not valid", () => {
    expect(isMemberOfCountriesSet("Spain")).toBe(false);
    expect(isMemberOfCountriesSet("UK")).toBe(false);
  });
  it("should return false if value is number", () => {
    expect(isMemberOfCountriesSet(777)).toBe(false);
  });
});
