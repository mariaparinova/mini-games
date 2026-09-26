import './chip.scss';
import { createDivElement } from '../../../lib/element.ts';

export function getChips(params: getChipsParams) {
  const { chips } = params;
  const chipsElements = chips.map((chip) => getChip(chip));
  return createDivElement({
    classList: ['chips-container'],
    children: [...chipsElements],
  });
}

function getChip(chipProps: Chip) {
  const { textContent, onClick, isSelected } = chipProps;

  const classList = ['chip', textContent.replace(/\s+/g, '-')];
  if (isSelected) {
    classList.push('selected');
  }

  return createDivElement({
    classList,
    textContent,
    onClick,
  });
}

export interface getChipsParams {
  chips: Chip[];
}

export interface Chip {
  textContent: string;
  onClick?: (event: MouseEvent) => void;
  isSelected: boolean;
}
