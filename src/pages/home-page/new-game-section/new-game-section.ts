import './new-game-section.scss';
import {
  createButtonElement,
  createDivElement,
  createHeadingElement,
} from '../../../lib/element.ts';
import { getCarousel } from './carousel/carousel.ts';

export function createNewGamesSection() {
  return createDivElement({
    classList: ['new-games-section'],
    children: [getCarouselHeaderElement(), getCarousel()],
  });
}

function getCarouselHeaderElement() {
  const buttonPrev = createButtonElement({
    classList: ['button', 'button-carousel', 'button-prev'],
    textContent: '←',
  });

  const buttonNext = createButtonElement({
    classList: ['button', 'button-carousel', 'button-next'],
    textContent: '→',
  });

  const buttonsContainer = createDivElement({
    classList: ['carousel-buttons'],
    children: [buttonPrev, buttonNext],
  });

  const headingElement = createHeadingElement({
    classList: ['heading', 'decorated'],
    type: 'h2',
    textContent: 'New games',
  });

  return createDivElement({
    classList: ['new-games-section-header'],
    children: [headingElement, buttonsContainer],
  });
}
