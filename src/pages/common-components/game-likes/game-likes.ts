import './game-likes.scss';
import { createDivElement, createImgElement, createSpanElement } from '../../../lib/element.ts';

export function getGameLikes(likesAmount: number) {
  const iconElement = createImgElement({
    src: './icons/heart.svg',
    alt: 'Icon heart',
  });

  const textElement = createSpanElement({
    textContent: formatLikes(likesAmount),
  });

  return createDivElement({
    classList: ['game-likes'],
    children: [iconElement, textElement],
  });
}

function formatLikes(amount: number): string {
  if (amount < 1000) {
    return `${amount}`;
  }

  return `${Math.floor(amount / 100) / 10}K`;
}
