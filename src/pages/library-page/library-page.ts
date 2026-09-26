import './library-page.scss';
import { createDivElement, createHeadingElement, createSpanElement } from '../../lib/element.ts';

export function getLibraryPageElement() {
  const heading = getLibraryHeadingElement();

  return createDivElement({
    classList: ['library-page-content'],
    children: [heading],
  });
}

function getLibraryHeadingElement() {
  const heading = createHeadingElement({
    type: 'h1',
    textContent: 'Game Library',
  });
  const subheading = createSpanElement({
    classList: ['subheading'],
    textContent: 'Browse our collection of casual mini-games',
  });

  return createDivElement({
    classList: ['heading-container'],
    children: [heading, subheading],
  });
}
