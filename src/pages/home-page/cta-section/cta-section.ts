import './cta-section.scss';
import {
  createButtonElement,
  createDivElement,
  createHeadingElement,
  createSpanElement,
  createImgElement,
} from '../../../lib/element.ts';

export function createCtaSection() {
  const imageContainerElement = createDivElement({
    classList: ['cta-section-image-container'],
  });

  const contentHeadingElement = createHeadingElement({
    classList: ['heading'],
    type: 'h2',
    textContent: 'Are you game developer?',
  });

  const contentTextElement = createSpanElement({
    classList: ['cta-section-content-text'],
    textContent:
      "Want to see your game on MiniGames? We're always looking for fun,\n" +
      'engaging mini games to add to our platform. Submit your game\n' +
      'and reach thousands of players!',
  });

  const iconElement = createImgElement({
    src: './icons/upload.svg',
    alt: 'Upload icon',
  });

  const contentButtonElement = createButtonElement({
    classList: ['button', 'primary', 'cta-section-content-button'],
    textContent: 'Submit form',
    icon: iconElement,
  });

  const contentFooterElement = createSpanElement({
    classList: ['cta-section-content-footer'],
    textContent: 'or contact us at developers@minigames.com',
  });

  const contentElement = createDivElement({
    classList: ['cta-section-content'],
    children: [
      contentHeadingElement,
      contentTextElement,
      contentButtonElement,
      contentFooterElement,
    ],
  });

  return createDivElement({
    classList: ['cta-section'],
    children: [imageContainerElement, contentElement],
  });
}
