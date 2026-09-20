import './game-likes.scss';
import { createDivElement, createImgElement, createSpanElement } from '../../../lib/element.ts';

export function getGameLikes(likesAmount: number) {
  const iconElement = createImgElement({
    src: './icons/heart.svg',
    alt: 'Icon heart',
  });

  const textElement = createSpanElement({
    textContent: likesAmount.toString(),
  });

  return createDivElement({
    classList: ['game-likes'],
    children: [iconElement, textElement],
  });
}
