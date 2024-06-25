import validateCityAddress from "../../src/features/registration/lib/validation/validateCItyAddress";

describe("validateCityAddress", () => {
  it("should return ok and empty string if city address is valid", () => {
    const result = validateCityAddress("SivkaBurka");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });
  it("should return ok and empty string if address contains spaces", () => {
    const result = validateCityAddress("Sivka Burka");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });
  it("should return fail and show the mistake message if address is empty ", () => {
    const result = validateCityAddress("");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe(
      "City address must contain at least one character"
    );
  });
  it("should return fail and show the mistake message if address does not contain numbers", () => {
    const result = validateCityAddress("Sivka1Burka");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe(
      "City address must contain no special characters or numbers"
    );
  });
});
