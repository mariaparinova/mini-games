import './header.scss';
import {
  createDivElement,
  createLinkElement,
  createListElement,
  createLiElement,
  createButtonElement,
} from '../../../lib/element.ts';
import { getLogoElement } from '../logo/logo.ts';
import { openAuthDialog } from '../auth-dialog/auth-dialog.ts';
import { type PAGE_NAME, updatePage } from '../../../router.ts';

export const NavItem = {
  Home: 'Home',
  Library: 'Library',
  Tournaments: 'Tournaments',
  Community: 'Community',
} as const;

export type NavItem = keyof typeof NavItem;

export function getHeaderElement(
  params: { activeItem: NavItem },
  withBurgerMenuButton: boolean = true,
): HTMLElement {
  const headerElement = document.createElement('header');
  headerElement.className = 'header';

  const { activeItem } = params;
  const desktopNavigationElement = getNavigationElement({
    activeItem,
    classList: ['desktop-nav'],
  });
  const burgerMenuClickHandler = () => {
    headerElement.classList.toggle('burger-menu-opened');
  };
  const logoElement = getLogoElement();
  const buttonsElement = getHeaderButtons({
    withBurgerMenuButton: withBurgerMenuButton,
    classList: ['desktop-header-buttons'],
    burgerMenuClickHandler,
  });
  const burgerMenuElement = getBurgerMenuElement({ activeItem });

  headerElement.append(logoElement, desktopNavigationElement, buttonsElement, burgerMenuElement);
  return headerElement;
}

function getNavigationElement(params: GetNavigationElementParams) {
  const { activeItem, classList = [], onClick } = params;
  const navigationItems: NavItem[] = [
    NavItem.Home,
    NavItem.Library,
    NavItem.Tournaments,
    NavItem.Community,
  ];

  const navItems = navigationItems.map((item) => {
    const linkClasses = ['nav-item'];
    if (item === activeItem) {
      linkClasses.push('active');
    }

    const link = createLinkElement({
      classList: linkClasses,
      href: `${item.toLowerCase()}`,
      textContent: item,
      onClick: async () =>
        await updatePage({
          pageName: item.toLowerCase() as PAGE_NAME,
        }),
    });

    return createLiElement({
      child: link,
      onClick,
    });
  });

  const navList = createListElement({
    classList: ['navigation-list'],
    children: navItems,
  });

  const navElement = document.createElement('nav');
  navElement.classList.add('nav', ...classList);
  navElement.append(navList);

  return navElement;
}

function getHeaderButtons(params: GetHeaderButtonsParams) {
  const { withBurgerMenuButton, classList = [], burgerMenuClickHandler } = params;

  const loginButton = createButtonElement({
    classList: ['button', 'small', 'login', 'secondary'],
    textContent: 'Log In',
    onClick: () => openAuthDialog({ mode: 'login' }),
  });

  const signupButton = createButtonElement({
    classList: ['button', 'small', 'signup', 'primary'],
    textContent: 'Sign Up',
    onClick: () => openAuthDialog({ mode: 'register' }),
  });

  const buttons: HTMLElement[] = [loginButton, signupButton];

  if (withBurgerMenuButton) {
    buttons.push(getBurgerIconElement({ onClick: burgerMenuClickHandler }));
  }

  return createDivElement({
    classList: ['buttons-container', ...classList],
    children: buttons,
  });
}

function getBurgerIconElement(params: GetBurgerIconElementParams) {
  const { onClick } = params;
  const line = createDivElement({
    classList: ['burger-line'],
  });

  const icon = createDivElement({
    classList: ['burger-icon'],
    children: [line],
  });

  if (onClick) {
    icon.addEventListener('click', onClick);
  }

  return icon;
}

function getBurgerMenuElement({ activeItem: NavItem }: { activeItem: NavItem }) {
  const burgerMenuClickHandler = () => {
    const headerElement = document.querySelector('header');
    if (!headerElement) {
      console.error('Header element not found');
      return;
    }
    headerElement.classList.remove('burger-menu-opened');
  };

  const navigationElement = getNavigationElement({
    activeItem: NavItem,
    onClick: burgerMenuClickHandler,
  });

  return createDivElement({
    classList: ['burger-menu'],
    children: [navigationElement, getHeaderButtons({ withBurgerMenuButton: false })],
  });
}

export function setHeader({ activeNavItem }: { activeNavItem: NavItem }) {
  const currentActiveItems = document.body.querySelectorAll('header .active');
  if (!currentActiveItems.length) {
    console.warn('No active items found');
    return;
  }

  if (currentActiveItems[0].textContent === activeNavItem) {
    return;
  }

  currentActiveItems.forEach((item) => item.classList.remove('active'));

  const desktopNavItems = document.body.querySelectorAll('header .desktop-nav a');
  Array.from(desktopNavItems)
    .find((element) => element.textContent === activeNavItem)
    ?.classList.add('active');

  const burgerMenuNavItems = document.body.querySelectorAll('header .burger-menu a');
  Array.from(burgerMenuNavItems)
    .find((element) => element.textContent === activeNavItem)
    ?.classList.add('active');
}

interface GetNavigationElementParams {
  activeItem: NavItem;
  classList?: string[];
  onClick?: () => void;
}

interface GetHeaderButtonsParams {
  withBurgerMenuButton: boolean;
  classList?: string[];
  burgerMenuClickHandler?: () => void;
}

interface GetBurgerIconElementParams {
  onClick?: () => void;
}
