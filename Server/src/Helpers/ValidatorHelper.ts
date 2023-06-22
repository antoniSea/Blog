const validate = (values, rules) => {
  const errors = {};
  const keys = Object.keys(rules);

  keys.forEach((key) => {
    const value = values[key];
    const rule = rules[key];
    if (!value) {
      errors[key] = 'This field is required';
      return;
    }

    const ruleKeys = rule.split('|');
    ruleKeys.forEach((ruleKey) => {
      switch (ruleKey) {
        case 'required':
          if (!value) {
            errors[key] = 'This field is required';
          }
          break;
        case 'string':
          if (typeof value !== 'string') {
            errors[key] = 'This field must be a string';
          }
          break;
        case 'email':
          if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
            errors[key] = 'This field must be a valid email';
          }
          break;
        case 'min:6':
          if (value.length < 6) {
            errors[key] = 'This field must be at least 6 characters';
          }
          break;
        default:
          break;
      }
    });
  });

  return {
    error: errors
  };
};

export default validate;
