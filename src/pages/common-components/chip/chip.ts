import './chip.scss';
import { createDivElement, createButtonElement } from '../../../lib/element.ts';

export function getChips(params: getChipsParams) {
  const { chips } = params;
  const chipsElements = chips.map((chip) => getChip(chip));
  return createDivElement({
    classList: ['chips-container'],
    children: [...chipsElements],
  });
}

function getChip(chipProps: Chip) {
  const { slug, label, onClick, isDefault } = chipProps;

  const classList = ['chip', slug];
  if (isDefault) {
    classList.push('selected');
  }

  return createButtonElement({
    classList,
    textContent: label,
    onClick,
    id: slug,
  });
}

export interface getChipsParams {
  chips: Chip[];
}

export interface Chip {
  slug: string;
  label: string;
  onClick?: (event: MouseEvent) => void;
  isDefault: boolean;
}
