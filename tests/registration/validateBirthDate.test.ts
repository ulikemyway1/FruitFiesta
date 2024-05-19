import validateBirthDate from "../../src/features/registration/lib/validation/validateBirthDate";

describe('validateBirthDate', () => {  
    it('should fail when date is in the future', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const result = validateBirthDate(futureDate.getTime());
      expect(result.status).toBe('fail');
      expect(result.validationMessage).toBe('The birth date cannot be in the future.');
    });
  
    it('should fail when date is not a valid date', () => {
      const invalidDate = new Date('invalid-date');
      const result = validateBirthDate(invalidDate.getTime());
      expect(result.status).toBe('fail');
      expect(result.validationMessage).toBe('Please, input your birthday');
    });
  
    it('should pass when age is exactly 12', () => {
      const currentDate = new Date();
      const twelveYearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 12));
      const result = validateBirthDate(twelveYearsAgo.getTime());
      expect(result.status).toBe('ok');
      expect(result.validationMessage).toBe('');
    });
  });
  