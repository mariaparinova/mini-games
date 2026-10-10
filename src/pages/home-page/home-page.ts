import { createHeroSection } from './hero-section/hero-section.ts';
import { createDivElement } from '../../lib/element.ts';
import { createNewGamesSection } from './new-game-section/new-game-section.ts';
import { createCtaSection } from './cta-section/cta-section.ts';
import { leaderboardSection } from './leaderboard-section/leaderboard-section.ts';
import { getErrorElement } from '../common-components/error-element/error-element.ts';

export async function initHomePage(): Promise<HTMLElement> {
  let newGamesSection: HTMLElement | undefined;

  try {
    newGamesSection = await createNewGamesSection();
  } catch (error) {
    newGamesSection = getErrorElement(error);
  }

  return createDivElement({
    children: [createHeroSection(), newGamesSection, leaderboardSection(), createCtaSection()],
  });
}
