import { createDivElement, createSpanElement } from '../../lib/element.ts';

export function getLibraryPageElement() {
  const content = createSpanElement({
    textContent: 'Library Page Content',
  });

  return createDivElement({
    children: [content],
  });
}
