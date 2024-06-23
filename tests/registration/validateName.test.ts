import validateName from "../../src/features/registration/lib/validation/validateName";

describe("validateName", () => {
  it("should return ok and empty string if name contains spaces", () => {
    const result = validateName("Imya Khoroshee");
    expect(result.status).toBe("ok");
    expect(result.validationMessage).toBe("");
  });
  it("should return fail and show help message if name is not filled", () => {
    const result = validateName("");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe("Required at least one symbol");
  });
  it("should return fail and show help message if name contains numbers", () => {
    const result = validateName("Imya1Khoroshee7");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe("Only letters accepted");
  });
  it("should return fail and show help message if name contains special characters", () => {
    const result = validateName("Imya$Khoroshee");
    expect(result.status).toBe("fail");
    expect(result.validationMessage).toBe("Only letters accepted");
  });
});
