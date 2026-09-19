import './logo.scss';
import { createDivElement, createImgElement, createSpanElement } from '../../../lib/element.ts';

export function getLogoElement() {
  const logoImg = createImgElement({
    src: 'logo.svg',
    alt: 'Logo',
  });

  const logoText = createSpanElement({
    classList: ['logo-text'],
    textContent: 'MiniGames',
  });

  return createDivElement({
    classList: ['logo-container'],
    children: [logoImg, logoText],
  });
}
