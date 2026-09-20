import './carousel.scss';
import { createCardElement, type CardElementParams } from './carousel-card/carousel-card.ts';
import { createDivElement } from '../../../../lib/element.ts';

const cards: CardElementParams[] = [
  {
    name: 'Shelve the Potions!',
    rating: 4.7,
    likesCount: 21300,
    cardImage: '/assets/images/games/shelve-the-potions-card.jpg',
  },
  {
    name: 'ISLANDERS: New Shores',
    rating: 4.9,
    likesCount: 54200,
    cardImage: '/assets/images/games/islanders-new-shores-card.jpg',
  },
  {
    name: 'Vacation Cafe Simulator',
    rating: 4.8,
    likesCount: 28750,
    cardImage: 'assets/images/games/vacation-cafe-simulator-card.jpg',
  },
  {
    name: 'Winter Burrow',
    rating: 4.9,
    likesCount: 32400,
    cardImage: '/assets/images/games/winter-burrow-card.jpg',
  },
  {
    name: 'Heartopia',
    rating: 4.6,
    likesCount: 46800,
    cardImage: '/assets/images/games/heartopia-card.jpg',
  },
];

export function getCarousel() {
  const cardsContainer = createDivElement({
    classList: ['cards-container'],
    children: [...cards.map((card) => createCardElement(card))],
  });

  return createDivElement({
    classList: ['carousel'],
    children: [cardsContainer],
  });
}
