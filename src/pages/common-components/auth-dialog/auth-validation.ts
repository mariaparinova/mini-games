export function validateEmail(value: string): string | null {
  if (!value || value.trim() === '') {
    return 'Email is required';
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validateUsername(value: string): string | null {
  if (!value || value.trim() === '') {
    return 'Username is required';
  }

  if (!/^[A-Z]/.test(value)) {
    return 'Username must start with an uppercase English letter';
  }

  if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
    return 'Username may contain English letters and digits only';
  }

  if (value.length < 2 || value.length > 30) {
    return 'Username must be 2–30 characters long';
  }

  return null;
}

export function validateLoginPassword(value: string): string | null {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  return null;
}

export function validateRegisterPassword(value: string): string | null {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase English letter';
  }

  if (!/[0-9]/.test(value)) {
    return 'Password must contain at least one digit';
  }

  if (!/[^a-zA-Z0-9]/.test(value)) {
    return 'Password must contain at least one special character';
  }

  return null;
}

export function validateConfirmPassword(value: string, passwordValue: string): string | null {
  if (!value) {
    return 'Confirm password is required';
  }

  if (value !== passwordValue) {
    return 'Passwords do not match';
  }

  return null;
}

export type AuthDialogMode = 'login' | 'register';
