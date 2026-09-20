import { getHeaderElement, NavItem } from '../common-components/header/header.ts';
import { createHeroSection } from './hero-section/hero-section.ts';
import { createDivElement, createMainElement } from '../../lib/element.ts';
import { getFooterElement } from '../common-components/footer/footer.ts';
import { createNewGamesSection } from './new-game-section/new-game-section.ts';
import { createCtaSection } from './cta-section/cta-section.ts';
import { leaderboardSection } from './leaderboard-section/leaderboard-section.ts';

export function getHomePageElement(): HTMLElement {
  const headerElement = getHeaderElement({ activeItem: NavItem.Home });
  const footerElement = getFooterElement();
  const mainElement = createMainElement({
    children: [
      createHeroSection(),
      createNewGamesSection(),
      leaderboardSection(),
      createCtaSection(),
    ],
  });

  return createDivElement({
    classList: ['page', 'home-page'],
    children: [headerElement, mainElement, footerElement],
  });
}
