import './auth-dialog.scss';
import {
  createButtonElement,
  createDivElement,
  createFormFieldElement,
  createImgElement,
  createSpanElement,
} from '../../../lib/element.ts';
import { createDialogElement } from '../dialog/dialog.ts';
import {
  type AuthDialogMode,
  validateEmail,
  validateUsername,
  validateLoginPassword,
  validateRegisterPassword,
  validateConfirmPassword,
} from './auth-validation.ts';

function resetAuthForm(formElement: HTMLFormElement) {
  formElement.reset();

  const inputs = formElement.querySelectorAll<HTMLInputElement>('input');
  inputs.forEach((input) => {
    input.value = '';
  });

  const helpers = formElement.querySelectorAll<HTMLElement>('.helper');
  helpers.forEach((helper) => {
    helper.textContent = '';
  });

  const submitButton = formElement.querySelector<HTMLButtonElement>('.button.primary');
  if (submitButton) {
    submitButton.disabled = true;
  }
}

function setupAuthFormValidation(formElement: HTMLFormElement, mode: AuthDialogMode) {
  const submitButton = formElement.querySelector<HTMLButtonElement>('.button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
  }

  const getFieldHelper = (input: HTMLInputElement) => {
    const formField = input.closest('.form-field');
    return formField?.querySelector<HTMLElement>('.helper');
  };

  const getInputs = () => {
    return {
      username: formElement.querySelector<HTMLInputElement>(
        'input#username, input[name="username"]',
      ),
      email: formElement.querySelector<HTMLInputElement>('input#email, input[name="email"]'),
      password: formElement.querySelector<HTMLInputElement>(
        'input#password, input[name="password"]',
      ),
      confirmPassword: formElement.querySelector<HTMLInputElement>(
        'input#confirmPassword, input[name="confirmPassword"]',
      ),
    };
  };

  const validateField = (fieldName: string, showInlineError = true): boolean => {
    const inputs = getInputs();
    let input: HTMLInputElement | null = null;
    let error: string | null = null;

    if (fieldName === 'email') {
      input = inputs.email;
      if (input) {
        error = validateEmail(input.value);
      }
    } else if (fieldName === 'username') {
      input = inputs.username;
      if (input) {
        error = validateUsername(input.value);
      }
    } else if (fieldName === 'password') {
      input = inputs.password;
      if (input) {
        error =
          mode === 'login'
            ? validateLoginPassword(input.value)
            : validateRegisterPassword(input.value);
      }
    } else if (fieldName === 'confirmPassword') {
      input = inputs.confirmPassword;
      if (input) {
        const passwordValue = inputs.password?.value || '';
        error = validateConfirmPassword(input.value, passwordValue);
      }
    }

    if (input && showInlineError) {
      const helper = getFieldHelper(input);
      if (helper) {
        helper.textContent = error || '';
      }
    }

    return error === null;
  };

  const checkFormValidity = (): boolean => {
    const inputs = getInputs();
    if (mode === 'login') {
      const emailValid = validateEmail(inputs.email?.value || '') === null;
      const passwordValid = validateLoginPassword(inputs.password?.value || '') === null;
      return emailValid && passwordValid;
    } else {
      const usernameValid = validateUsername(inputs.username?.value || '') === null;
      const emailValid = validateEmail(inputs.email?.value || '') === null;
      const passwordValid = validateRegisterPassword(inputs.password?.value || '') === null;
      const confirmValid =
        validateConfirmPassword(
          inputs.confirmPassword?.value || '',
          inputs.password?.value || '',
        ) === null;
      return usernameValid && emailValid && passwordValid && confirmValid;
    }
  };

  const updateSubmitButtonState = () => {
    if (submitButton) {
      submitButton.disabled = !checkFormValidity();
    }
  };

  const handleFieldEvent = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target || target.tagName !== 'INPUT') {
      return;
    }

    const fieldName = target.name || target.id;
    validateField(fieldName, true);

    if (mode === 'register' && fieldName === 'password') {
      const inputs = getInputs();
      if (inputs.confirmPassword) {
        const confirmHelper = getFieldHelper(inputs.confirmPassword);
        const confirmHasErrorOrValue =
          inputs.confirmPassword.value.length > 0 ||
          (confirmHelper && confirmHelper.textContent !== '');
        if (confirmHasErrorOrValue) {
          validateField('confirmPassword', true);
        }
      }
    }

    updateSubmitButtonState();
  };

  formElement.addEventListener('input', handleFieldEvent);
  formElement.addEventListener('change', handleFieldEvent);
  formElement.addEventListener('blur', handleFieldEvent, true);

  formElement.addEventListener('submit', (event) => {
    const isValid = checkFormValidity();
    if (!isValid) {
      event.preventDefault();
      if (mode === 'login') {
        validateField('email', true);
        validateField('password', true);
      } else {
        validateField('username', true);
        validateField('email', true);
        validateField('password', true);
        validateField('confirmPassword', true);
      }
      updateSubmitButtonState();
    }
  });
}

function createAuthDialogElement({ mode }: { mode: AuthDialogMode }) {
  const authDialogHeaderElement = createAuthDialogHeader({ mode });
  const formElement =
    mode === 'login' ? createAuthDialogLoginForm() : createAuthDialogRegisterForm();
  const dialogContentElement = createDivElement({
    classList: ['auth-dialog-content'],
    children: [authDialogHeaderElement, formElement],
  });

  return createDialogElement({
    classList: ['auth-dialog', `${mode}`],
    children: [dialogContentElement],
  });
}

export function openAuthDialog({ mode }: { mode: AuthDialogMode }) {
  const openDialogs = document.querySelectorAll<HTMLDialogElement>('dialog[open]');
  openDialogs.forEach((dialog) => {
    dialog.close();
  });

  const existingAuthForms = document.querySelectorAll<HTMLFormElement>('.auth-dialog form');
  existingAuthForms.forEach((form) => {
    resetAuthForm(form);
  });

  let authDialogElement: HTMLDialogElement | null = document.querySelector(`.auth-dialog.${mode}`);

  if (!authDialogElement) {
    authDialogElement = createAuthDialogElement({ mode });
    document.body.append(authDialogElement);
  } else {
    const form = authDialogElement.querySelector<HTMLFormElement>('form');
    if (form) {
      resetAuthForm(form);
    }
  }

  authDialogElement.showModal();
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
  setupAuthFormValidation(formElement, 'login');

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
      placeholder: 'Min. 6 characters',
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
  setupAuthFormValidation(formElement, 'register');

  return formElement;
}

function createAuthDialogLoginButtons() {
  const loginButtonElement = createButtonElement({
    textContent: 'Login',
    classList: ['button', 'primary'],
    disabled: true,
    type: 'submit',
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
    disabled: true,
    type: 'submit',
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
