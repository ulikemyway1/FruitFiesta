import { calculateAge } from "../../src/features/registration/lib/validation/validateBirthDate";

describe("calculateAge", () => {
  const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  it("should return the correct age when the birthday has not yet occurred this year", () => {
    const almostTwentyYearsAgo =
      Date.now() - 20 * oneYearInMilliseconds + oneDayInMilliseconds;
    expect(calculateAge(almostTwentyYearsAgo)).toBe(19);
  });
});
