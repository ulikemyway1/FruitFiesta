import validateEmail from "../../src/features/registration/lib/validation/validateEmail";

describe("validateEmail", () => {
  it("should return ok and empty string if email is valid", () => {
    const result = validateEmail("imyakhoroshee@rss.com");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });
  it("should return fail and help message if email is invalid ", () => {
    const result = validateEmail("imyakhoroshee-rss");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe("Please, check e-mail");
  });
  it("should return fail and help message if email is not filled", () => {
    const result = validateEmail("");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe("Please, check e-mail");
  });
});
