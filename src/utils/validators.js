const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernamePattern = /^[A-Za-z0-9._-]{3,24}$/;
const zipPattern = /^\d{5}(-\d{4})?$/;

export function validateLoginForm(form) {
  const errors = {};
  if (!form.login.trim()) errors.login = 'Enter your email address or username.';
  if (!form.password) errors.password = 'Enter your password.';
  else if (form.password.length < 6) errors.password = 'Password must contain at least 6 characters.';
  return errors;
}

export function validateCreateAccountForm(form) {
  const errors = {};

  if (!form.login.trim()) errors.login = 'Username is required.';
  else if (!usernamePattern.test(form.login.trim())) errors.login = 'Use 3-24 letters, numbers, periods, underscores, or hyphens.';

  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!emailPattern.test(form.email.trim())) errors.email = 'Enter a valid email address.';

  if (!form.password) errors.password = 'Password is required.';
  else if (form.password.length < 8 || !/[a-z]/.test(form.password) || !/[A-Z]/.test(form.password) || !/\d/.test(form.password)) {
    errors.password = 'Use 8+ characters with uppercase, lowercase, and a number.';
  }

  if (form.street && form.street.trim().length < 5) errors.street = 'Enter a complete street address or leave this field blank.';
  if (form.city && !/^[A-Za-z .'-]{2,}$/.test(form.city.trim())) errors.city = 'Enter a valid city name.';
  if (form.state && !/^[A-Za-z .'-]{2,}$/.test(form.state.trim())) errors.state = 'Enter a valid state or province.';
  if (form.zip && !zipPattern.test(form.zip.trim())) errors.zip = 'Use a 5-digit ZIP or ZIP+4 format.';

  if (form.phone) {
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) errors.phone = 'Enter a phone number with 10-15 digits.';
  }

  return errors;
}
