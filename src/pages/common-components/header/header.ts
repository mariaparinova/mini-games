import './header.scss';
import {
  createDivElement,
  createLinkElement,
  createListElement,
  createLiElement,
  createButtonElement,
} from '../../../lib/element.ts';
import { getLogoElement } from '../logo/logo.ts';

export const NavItem = {
  Home: 'Home',
  Library: 'Library',
  Tournaments: 'Tournaments',
  Community: 'Community',
} as const;

type NavItem = keyof typeof NavItem;

export function getHeaderElement(params: { activeItem: NavItem }): HTMLElement {
  const { activeItem } = params;
  const logoElement = getLogoElement();
  const navigationElement = getNavigationElement({ activeItem });
  const buttonsElement = getHeaderButtons();

  const headerElement = document.createElement('header');
  headerElement.className = 'header';
  headerElement.append(logoElement, navigationElement, buttonsElement);

  return headerElement;
}

function getNavigationElement(params: { activeItem: NavItem }) {
  const { activeItem } = params;
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
      href: `#${item}`,
      textContent: item,
    });

    return createLiElement({
      child: link,
    });
  });

  const navList = createListElement({
    classList: ['navigation-list'],
    children: navItems,
  });

  const navElement = document.createElement('nav');
  navElement.className = 'nav';
  navElement.append(navList);

  return navElement;
}

function getHeaderButtons() {
  const loginButton = createButtonElement({
    classList: ['button', 'header-button', 'login'],
    textContent: 'Log In',
  });

  const signupButton = createButtonElement({
    classList: ['button', 'header-button', 'signup'],
    textContent: 'Sign Up',
  });

  return createDivElement({
    classList: ['buttons-container'],
    children: [loginButton, signupButton, getBurgerIconElement()],
  });
}

function getBurgerIconElement() {
  const line = createDivElement({
    classList: ['burger-line'],
  });

  const icon = createDivElement({
    classList: ['burger-icon'],
    children: [line],
  });

  icon.onclick = () => {
    icon.classList.toggle('opened');
  };

  return icon;
}
