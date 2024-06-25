import validatePostcode from "../../src/features/registration/lib/validation/validatePostcode";

describe("validatePostcode", () => {
  it("should return ok and empty string if postcode matches the rule of the appropriate country", () => {
    const result = validatePostcode("Belarus", "111111");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });

  it("should return fail and show help message if postcode does not match the rule of the appropriate country", () => {
    const result = validatePostcode("Belarus", "1");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe(
      "Please, use correct Belarusian postcode: 6 digits"
    );
  });
  it("should return ok and empty string if postcode matches the rule of the appropriate country", () => {
    const result = validatePostcode("Russia", "111111");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });

  it("should return fail and show help message if postcode does not match the rule of the appropriate country", () => {
    const result = validatePostcode("Russia", "1");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe(
      "Please, use correct Russian postcode: 6 digits"
    );
  });
  it("should return ok and empty string if postcode matches the rule of the appropriate country", () => {
    const result = validatePostcode("Ukraine", "11111");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });

  it("should return fail and show help message if postcode does not match the rule of the appropriate country", () => {
    const result = validatePostcode("Ukraine", "1");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe(
      "Please, use correct Ukrainian postcode: 5 digits"
    );
  });
  it("should return ok and empty string if postcode matches the rule of the appropriate country", () => {
    const result = validatePostcode("Poland", "11-111");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });

  it("should return fail and show help message if postcode does not match the rule of the appropriate country", () => {
    const result = validatePostcode("Poland", "1555-5");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe(
      "Please, use correct Polish postcode: (2 digits)-(3 digits)"
    );
  });
});
