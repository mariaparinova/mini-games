import './game-rating.scss';
import { createDivElement, createImgElement, createSpanElement } from '../../../lib/element.ts';

export function getGameRating(rating: number) {
  const iconElement = createImgElement({
    src: './icons/star.svg',
    alt: 'Icon star',
  });

  const textElement = createSpanElement({
    textContent: rating.toString(),
  });

  return createDivElement({
    classList: ['game-rating'],
    children: [iconElement, textElement],
  });
}
