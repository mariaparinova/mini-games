import { getHeaderElement, NavItem } from '../common-components/header/header.ts';
import { createHeroSection } from './hero-section/hero-section.ts';
import { createDivElement } from '../../lib/element.ts';

export function getHomePageElement(): HTMLElement {
  const headerElement = getHeaderElement({ activeItem: NavItem.Home });

  return createDivElement({
    classList: ['page', 'home-page'],
    children: [headerElement, createHeroSection()],
  });
}
