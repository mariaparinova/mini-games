import './not-found-page.scss';
import { createDivElement, createHeadingElement, createSpanElement } from '../../lib/element.ts';

export function initNotFoundPage(): Promise<HTMLElement> {
  const heading = createHeadingElement({
    type: 'h1',
    textContent: '404',
  });
  const text = createSpanElement({
    textContent: 'Page not found',
  });

  return Promise.resolve(
    createDivElement({
      classList: ['not-found-page'],
      children: [heading, text],
    }),
  );
}
