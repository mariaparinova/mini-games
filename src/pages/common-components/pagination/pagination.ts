import './pagination.scss';
import { createButtonElement, createDivElement } from '../../../lib/element.ts';

const DEFAULT_MAX_VISIBLE_PAGES = 4;

export function getPagination(params: PaginationParams) {
  const {
    currentPage,
    totalPages,
    maxVisiblePages = DEFAULT_MAX_VISIBLE_PAGES,
    onPageChange,
  } = params;

  const buttonToPrevious = createButtonElement({
    classList: ['button', 'button-pagination', 'to-previous'],
    textContent: '<',
    disabled: currentPage <= 1,
  });
  buttonToPrevious.addEventListener('click', () => onPageChange(currentPage - 1));

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageButtons: HTMLButtonElement[] = [];

  for (let page = startPage; page <= endPage; page++) {
    const classList = ['button', 'button-pagination', 'page-item'];
    if (page === currentPage) {
      classList.push('active');
    }

    const button = createButtonElement({
      classList,
      textContent: `${page}`,
    });

    button.addEventListener('click', () => onPageChange(page));
    pageButtons.push(button);
  }

  const buttonToNext = createButtonElement({
    classList: ['button', 'button-pagination', 'to-next'],
    textContent: '>',
    disabled: currentPage >= totalPages,
  });
  buttonToNext.addEventListener('click', () => onPageChange(currentPage + 1));

  return createDivElement({
    classList: ['pagination'],
    children: [buttonToPrevious, ...pageButtons, buttonToNext],
  });
}

export interface PaginationParams {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange: (page: number) => void;
}
