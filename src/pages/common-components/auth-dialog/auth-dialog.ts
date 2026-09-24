import './auth-dialog.scss';
import {
  createButtonElement,
  createDivElement,
  createFormFieldElement,
  createImgElement,
  createSpanElement,
} from '../../../lib/element.ts';

function createAuthDialogElement({ mode }: { mode: AuthDialogMode }) {
  const authDialogHeaderElement = createAuthDialogHeader({ mode });
  const formElement =
    mode === 'login' ? createAuthDialogLoginForm() : createAuthDialogRegisterForm();

  const dialogElement = document.createElement('dialog');
  dialogElement.classList.add('dialog', 'auth-dialog', `${mode}`);
  dialogElement.append(authDialogHeaderElement, formElement);
  dialogElement.addEventListener('click', closeAuthDialog);

  return dialogElement;
}

export function openAuthDialog({ mode }: { mode: AuthDialogMode }) {
  let authDialogElement: HTMLDialogElement | null = document.querySelector(`.auth-dialog.${mode}`);

  if (!authDialogElement) {
    authDialogElement = createAuthDialogElement({ mode });
    document.body.append(authDialogElement);
  }

  authDialogElement.showModal();
}

export function closeAuthDialog(event: MouseEvent) {
  const authDialogElement: HTMLDialogElement | null = document.querySelector(
    '.dialog.auth-dialog[open]',
  );

  if (!authDialogElement) {
    return;
  }

  const dialogBounds = authDialogElement.getBoundingClientRect();

  if (
    event.clientX < dialogBounds.left ||
    event.clientX > dialogBounds.right ||
    event.clientY < dialogBounds.top ||
    event.clientY > dialogBounds.bottom
  ) {
    authDialogElement.close();
  }
}

function createAuthDialogHeader({ mode }: { mode: AuthDialogMode }) {
  const title = mode === 'login' ? 'Welcome Back!' : 'Create Account';
  const text =
    mode === 'login'
      ? 'Sign in to resume your games and progress.'
      : 'Join MiniGames to track your score & streak.';

  const titleElement = createSpanElement({
    textContent: title,
    classList: ['title'],
  });
  const textElement = createSpanElement({
    textContent: text,
    classList: ['text'],
  });

  return createDivElement({
    classList: ['auth-dialog-header'],
    children: [titleElement, textElement],
  });
}

function createAuthDialogLoginForm() {
  const fields = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'e.g. alex@minigames.com',
      classList: [],
      id: 'email',
      label: 'Email Address',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: '••••••••',
      classList: [],
      id: 'password',
      label: 'Password',
    },
  ];

  const formElement = document.createElement('form');
  formElement.classList.add('form');
  formElement.method = 'dialog';
  formElement.append(...fields.map(createFormFieldElement), createAuthDialogLoginButtons());

  return formElement;
}

function createAuthDialogRegisterForm() {
  const fields = [
    {
      type: 'text',
      name: 'username',
      placeholder: 'e.g. CozyGamer_99',
      classList: [],
      id: 'username',
      label: 'Username',
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'e.g. alex@minigames.com',
      classList: [],
      id: 'email',
      label: 'Email Address',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Min. 8 characters',
      classList: [],
      id: 'password',
      label: 'Password',
    },
    {
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Confirm password',
      classList: [],
      id: 'confirmPassword',
      label: 'Confirm Password',
    },
  ];

  const formElement = document.createElement('form');
  formElement.classList.add('form');
  formElement.method = 'dialog';
  formElement.append(...fields.map(createFormFieldElement), createAuthDialogRegisterButtons());

  return formElement;
}

function createAuthDialogLoginButtons() {
  const loginButtonElement = createButtonElement({
    textContent: 'Login',
    classList: ['button', 'primary'],
  });

  const googleIcon = createImgElement({
    src: './icons/google.svg',
    alt: 'Google icon',
  });

  const continueWithGoogleButton = createButtonElement({
    textContent: 'Continue with Google',
    classList: ['button', 'secondary'],
    icon: googleIcon,
  });

  return createAuthDialogButtonsContainer({
    buttons: [loginButtonElement, continueWithGoogleButton],
  });
}

function createAuthDialogRegisterButtons() {
  const createAccountButtonElement = createButtonElement({
    textContent: 'Create Account',
    classList: ['button', 'primary'],
  });

  const googleIcon = createImgElement({
    src: './icons/google.svg',
    alt: 'Google icon',
  });

  const signupWithGoogleButton = createButtonElement({
    textContent: 'Sign up with Google',
    classList: ['button', 'secondary'],
    icon: googleIcon,
  });

  return createAuthDialogButtonsContainer({
    buttons: [createAccountButtonElement, signupWithGoogleButton],
  });
}

function createAuthDialogButtonsContainer({ buttons }: { buttons: HTMLButtonElement[] }) {
  const buttonsWithDividers: HTMLElement[] = [];
  const createDivider = () =>
    createSpanElement({
      textContent: 'OR',
      classList: ['divider'],
    });

  buttons.forEach((button, index) => {
    buttonsWithDividers.push(button);

    if (index !== buttons.length - 1) {
      buttonsWithDividers.push(createDivider());
    }
  });

  return createDivElement({
    classList: ['auth-dialog-buttons'],
    children: buttonsWithDividers,
  });
}

type AuthDialogMode = 'login' | 'register';
