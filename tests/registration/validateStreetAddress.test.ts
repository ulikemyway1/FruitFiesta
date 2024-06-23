import validateStreetAddress from "../../src/features/registration/lib/validation/validateStreetAddress";

describe("validateStreetAddress", () => {
  it("should return ok and empty string if address contains spaces", () => {
    const result = validateStreetAddress("ImyaKhoroshee Street");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });
  it("should return fail and help message if there is no address", () => {
    const result = validateStreetAddress("");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe(
      "Street address must contain at least one character"
    );
  });
});
