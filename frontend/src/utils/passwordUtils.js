export const checkPasswordCriteria = (password) => {
    const criteria = {
      isAtLeastSixChars: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };
  
    const isStrongPassword =
      criteria.isAtLeastSixChars &&
      criteria.hasUppercase &&
      criteria.hasLowercase &&
      criteria.hasNumber &&
      criteria.hasSpecialChar;
  
    return { criteria, isStrongPassword };
  };
  