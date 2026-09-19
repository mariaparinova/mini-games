export function createDivElement(params: CreateDivElementParams): HTMLDivElement {
  const { classList = [], textContent, children } = params;

  const divElement = document.createElement('div');
  divElement.classList.add(...classList);

  if (textContent) {
    divElement.textContent = textContent;
  }

  if (children) {
    divElement.append(...children);
  }

  return divElement;
}

export function createButtonElement(params: CreateButtonElementParams): HTMLButtonElement {
  const { classList = [], textContent, onClick } = params;

  const buttonElement = document.createElement('button');
  buttonElement.classList.add('button', ...classList);

  if (textContent) {
    buttonElement.textContent = textContent;
  }

  if (onClick) {
    buttonElement.addEventListener('click', onClick);
  }

  return buttonElement;
}

export function createImgElement(params: CreateImgElementParams): HTMLImageElement {
  const { classList = [], src, alt } = params;

  const imgElement = document.createElement('img');
  imgElement.classList.add(...classList);
  imgElement.src = src;
  imgElement.alt = alt;

  return imgElement;
}

export function createSpanElement(params: CreateSpanElementParams) {
  const { classList = [], textContent } = params;

  const span = document.createElement('span');
  span.classList.add(...classList);
  span.textContent = textContent;

  return span;
}

export function createLinkElement(params: CreateLinkElementParams): HTMLAnchorElement {
  const { classList = [], href, textContent, children } = params;

  const linkElement = document.createElement('a');
  linkElement.classList.add(...classList);
  linkElement.href = href;

  if (textContent) {
    linkElement.textContent = textContent;
  }

  if (children) {
    linkElement.append(...children);
  }

  return linkElement;
}

export function createListElement(
  params: CreateListElementParams,
): HTMLUListElement | HTMLOListElement {
  const { type = 'ul', classList = [], children = [] } = params;

  const listElement = document.createElement(type);
  listElement.classList.add(...classList);
  listElement.append(...children);

  return listElement;
}

export function createLiElement(params: CreateLiElementParams) {
  const { classList = [], child } = params;

  const listItemElement = document.createElement('li');
  listItemElement.classList.add(...classList);
  listItemElement.append(child);

  return listItemElement;
}

export function createHeadingElement(params: CreateHeadingElementParams) {
  const { type, classList = [], textContent } = params;

  const headingElement = document.createElement(type);
  headingElement.classList.add(...classList);
  headingElement.textContent = textContent;

  return headingElement;
}

export function createMainElement(params: CreateMainElementParams) {
  const { classList = [], children = [] } = params;

  const mainElement = document.createElement('main');
  mainElement.classList.add('main', ...classList);
  mainElement.append(...children);

  return mainElement;
}

interface CreateDivElementParams {
  classList?: string[];
  textContent?: string;
  children?: HTMLElement[];
}

interface CreateButtonElementParams {
  classList?: string[];
  textContent?: string;
  onClick?: () => void;
}

interface CreateImgElementParams {
  src: string;
  alt: string;
  classList?: string[];
}

interface CreateSpanElementParams {
  textContent: string;
  classList?: string[];
}

interface CreateLinkElementParams {
  href: string;
  classList?: string[];
  textContent?: string;
  children?: HTMLElement[];
}

interface CreateListElementParams {
  children: (string | HTMLElement)[];
  type?: 'ol' | 'ul';
  classList?: string[];
}

interface CreateLiElementParams {
  child: string | HTMLElement | HTMLAnchorElement;
  classList?: string[];
}

interface CreateHeadingElementParams {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textContent: string;
  classList?: string[];
}

interface CreateMainElementParams {
  classList?: string[];
  children?: HTMLElement[];
}
