import { getHeaderElement, NavItem } from '../common-components/header/header.ts';

export function getHomePageElement(): HTMLElement {
  const headerElement = getHeaderElement({ activeItem: NavItem.Home });

  const homePage = document.createElement('div');
  homePage.className = 'page home-page';
  homePage.append(headerElement);

  return homePage;
}
