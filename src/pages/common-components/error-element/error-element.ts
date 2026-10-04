import './error-element.scss';
import { createDivElement } from '../../../lib/element.ts';

export function getErrorElement(error?: unknown) {
  let errorMessage = 'Unknown error';

  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error instanceof Error && error?.message) {
    errorMessage = error.message;
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof error.error === 'string'
  ) {
    errorMessage = error?.error;
  }

  return createDivElement({
    classList: ['error-element'],
    textContent: errorMessage,
  });
}
