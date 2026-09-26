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
import { getLibraryPageElement } from '../../library-page/library-page.ts';
import { updatePage } from '../../../main.ts';
import { getHomePageElement } from '../../home-page/home-page.ts';

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

  const burgerMenuClickHandler = () => headerElement.classList.toggle('burger-menu-opened');
  const { activeItem } = params;
  const logoElement = getLogoElement();
  const desktopNavigationElement = getNavigationElement({ activeItem, classList: ['desktop-nav'] });
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
  const { activeItem, classList = [] } = params;
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
    });

    if (item === NavItem.Library) {
      link.addEventListener('click', () => {
        updatePage({
          activeNavItem: item,
          pageContent: getLibraryPageElement(),
        });
      });
    } else {
      link.addEventListener('click', () => {
        updatePage({
          activeNavItem: NavItem.Home,
          pageContent: getHomePageElement(),
        });
      });
    }

    return createLiElement({
      child: link,
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
    classList: ['button', 'header-button', 'login', 'secondary'],
    textContent: 'Log In',
    onClick: () => openAuthDialog({ mode: 'login' }),
  });

  const signupButton = createButtonElement({
    classList: ['button', 'header-button', 'signup', 'primary'],
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
  const navigationElement = getNavigationElement({
    activeItem: NavItem,
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
}

interface GetHeaderButtonsParams {
  withBurgerMenuButton: boolean;
  classList?: string[];
  burgerMenuClickHandler?: () => void;
}

interface GetBurgerIconElementParams {
  onClick?: () => void;
}
