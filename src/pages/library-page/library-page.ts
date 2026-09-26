import './library-page.scss';
import { createDivElement, createHeadingElement, createSpanElement } from '../../lib/element.ts';
import { type Chip, getChips } from '../common-components/chip/chip.ts';

export function getLibraryPageElement() {
  const heading = getLibraryHeadingElement();
  const controls = getLibraryControls();

  return createDivElement({
    classList: ['library-page-content'],
    children: [heading, controls],
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

function getLibraryControls() {
  let selected = ['all games'];
  const chips = ['all games', 'puzzle', 'card', 'match', 'farm', 'strategy'];

  const chipClickHandler = (event: MouseEvent) => {
    const chip = event.target as HTMLElement;

    if (
      selected.length === 1 &&
      chip.classList.contains('all-games') &&
      selected[0] === 'all games'
    ) {
      return;
    }

    if (selected.length === 1 && !chip.classList.contains('all-games')) {
      const allGamesElement = document.querySelector('.chip.all-games');

      if (!allGamesElement) {
        console.warn('all games element not found');
        return;
      }

      allGamesElement.classList.add('selected');
      selected.push('all games');
    }

    if (chip.classList.contains('selected')) {
      selected = selected.filter((s) => s !== chip.innerHTML);
      chip.classList.remove('selected');
    } else {
      selected.push(chip.innerHTML);
      chip.classList.add('selected');
    }
  };

  const chipsData: Chip[] = chips.map((chip) => {
    return {
      textContent: chip,
      onClick: chipClickHandler,
      isSelected: selected.includes(chip),
    };
  });

  const chipsElement = getChips({ chips: chipsData });

  return createDivElement({
    classList: ['controls'],
    children: [chipsElement],
  });
}
