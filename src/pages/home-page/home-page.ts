import { getHeaderElement, NavItem } from '../common-components/header/header.ts';
import { createHeroSection } from './hero-section/hero-section.ts';
import { createDivElement, createMainElement } from '../../lib/element.ts';
import { getFooterElement } from '../common-components/footer/footer.ts';

export function getHomePageElement(): HTMLElement {
  const headerElement = getHeaderElement({ activeItem: NavItem.Home });
  const footerElement = getFooterElement();
  const mainElement = createMainElement({
    children: [createHeroSection()],
  });

  return createDivElement({
    classList: ['page', 'home-page'],
    children: [headerElement, mainElement, footerElement],
  });
}
