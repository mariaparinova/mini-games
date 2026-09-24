import './dialog.scss';

export function createDialogElement(params: createDialogElementParams) {
  const { classList = [], children } = params;
  const dialogElement = document.createElement('dialog');
  dialogElement.classList.add('dialog', ...classList);
  dialogElement.append(...children);
  dialogElement.addEventListener('click', closeAuthDialog);

  return dialogElement;
}

function closeAuthDialog(event: MouseEvent) {
  const dialogElement: HTMLDialogElement | null = document.querySelector('dialog[open]');

  if (!dialogElement) {
    return;
  }

  const dialogBounds = dialogElement.getBoundingClientRect();

  if (
    event.clientX < dialogBounds.left ||
    event.clientX > dialogBounds.right ||
    event.clientY < dialogBounds.top ||
    event.clientY > dialogBounds.bottom
  ) {
    dialogElement.close();
  }
}

interface createDialogElementParams {
  classList: string[];
  children: HTMLElement[];
}
