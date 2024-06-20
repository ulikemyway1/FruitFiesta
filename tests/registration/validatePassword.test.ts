import validatePassword from "../../src/features/registration/lib/validation/validatePassword";

describe('validatePassword', () => {
  it('should fail if password is less than 8 characters', () => {
    const result = validatePassword('Abc1!');
    expect(result.status).toBe('fail');
    expect(result.validationMessage).toBe('Password must contain minimum 8 characters');
  });

  it('should fail if password does not contain an uppercase letter', () => {
    const result = validatePassword('abcdefg1!');
    expect(result.status).toBe('fail');
    expect(result.validationMessage).toBe('Password must contain at least 1 uppercase letter');
  });

  it('should fail if password does not contain a lowercase letter', () => {
    const result = validatePassword('ABCDEFG1!');
    expect(result.status).toBe('fail');
    expect(result.validationMessage).toBe('Password must contain at least 1 lowercase letter');
  });

  it('should fail if password does not contain a number', () => {
    const result = validatePassword('Abcdefg!');
    expect(result.status).toBe('fail');
    expect(result.validationMessage).toBe('Password must contain at least 1 number');
  });

  it('should fail if password does not contain a special character', () => {
    const result = validatePassword('Abcdefg1');
    expect(result.status).toBe('fail');
    expect(result.validationMessage).toBe('Password must contain at least 1 special character (!@#$%^&*)');
  });

  it('should fail if password contains a space', () => {
    const result = validatePassword('Abc defg1!');
    expect(result.status).toBe('fail');
    expect(result.validationMessage).toBe('Spaces are not allowed');
  });

  it('should pass if password meets all requirements', () => {
    const result = validatePassword('Abcdefg1!');
    expect(result.status).toBe('ok');
    expect(result.validationMessage).toBe('');
  });
});
