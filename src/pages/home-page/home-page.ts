import { createHeroSection } from './hero-section/hero-section.ts';
import { createDivElement } from '../../lib/element.ts';
import { createNewGamesSection } from './new-game-section/new-game-section.ts';
import { createCtaSection } from './cta-section/cta-section.ts';
import { leaderboardSection } from './leaderboard-section/leaderboard-section.ts';

export async function initHomePage(): Promise<HTMLElement> {
  return Promise.resolve(
    createDivElement({
      children: [
        createHeroSection(),
        createNewGamesSection(),
        leaderboardSection(),
        createCtaSection(),
      ],
    }),
  );
}
