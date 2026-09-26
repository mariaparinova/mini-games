import './hero-section.scss';
import {
  createButtonElement,
  createDivElement,
  createHeadingElement,
  createSpanElement,
} from '../../../lib/element.ts';

export function createHeroSection() {
  const headingElement = createHeadingElement({
    type: 'h1',
    textContent: 'Take a Short Break & Have Fun!',
  });

  const textElement = createSpanElement({
    classList: ['hero-text'],
    textContent:
      'Discover hundreds of curated casual mini-games. Play instantly in your browser — ' +
      'puzzle, match 3, farm, and board classics.',
  });

  const buttonElement = createButtonElement({
    classList: ['button', 'primary'],
    textContent: 'Browse Library',
  });

  const heroContent = createDivElement({
    classList: ['hero-content'],
    children: [headingElement, textElement, buttonElement],
  });

  return createDivElement({
    classList: ['hero-section'],
    children: [heroContent],
  });
}
