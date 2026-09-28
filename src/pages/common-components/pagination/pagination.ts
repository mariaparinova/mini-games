import './pagination.scss';
import { createButtonElement, createDivElement } from '../../../lib/element.ts';

export function getPagination(params: getPaginationParams) {
  const { visiblePages } = params;

  const buttonToPrevious = createButtonElement({
    classList: ['button', 'button-pagination'],
    textContent: '<',
    disabled: true,
  });

  const pageButtons = new Array(visiblePages).fill(null).map((_, i) => {
    const classList = ['button', 'button-pagination', 'page-item'];

    if (i === 0) {
      classList.push('active');
    }

    return createButtonElement({
      classList,
      textContent: `${i + 1}`,
    });
  });

  const buttonToNext = createButtonElement({
    classList: ['button', 'button-pagination'],
    textContent: '>',
  });

  return createDivElement({
    classList: ['pagination'],
    children: [buttonToPrevious, ...pageButtons, buttonToNext],
  });
}

interface getPaginationParams {
  visiblePages?: number;
}
