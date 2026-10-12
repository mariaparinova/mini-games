import { DEFAULT_USER_NAME } from '../pages/common-components/header/user-component.ts';

export const userData: User = {
  email: null,
  uid: null,
  userName: null,
  avatarUrl: null,
};

export function getUserName() {
  const userName = userData.userName;
  if (userName) {
    return userName.trim();
  }

  if (userData.email) {
    const trimmedEmail = userData.email.trim();
    const atIndex = trimmedEmail.indexOf('@');

    return trimmedEmail.slice(0, atIndex);
  }

  return DEFAULT_USER_NAME;
}

export function getProfileInitials(name: string) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return null;
  }

  const alphanumericRegex = /[\p{L}\p{N}]/u;

  if (trimmedName.length === 1) {
    const match = trimmedName[0].match(alphanumericRegex);
    return match ? match[0].toUpperCase() : null;
  }

  const firstWordMatch = trimmedName[0].match(alphanumericRegex);
  const secondWordMatch = trimmedName[1].match(alphanumericRegex);

  const char1 = firstWordMatch ? firstWordMatch[0].toUpperCase() : '';
  const char2 = secondWordMatch ? secondWordMatch[0].toUpperCase() : '';

  const combined = `${char1}${char2}`;
  return combined.length > 0 ? combined : null;
}

export interface User {
  email: string | null;
  uid: string | null;
  userName: string | null;
  avatarUrl: string | null;
}
