import './loader.scss';
import { createDivElement } from '../../../lib/element.ts';

export function getLoaderElement() {
  return createDivElement({
    classList: ['loader-container'],
    children: [
      createDivElement({
        classList: ['loader'],
      }),
    ],
  });
}
