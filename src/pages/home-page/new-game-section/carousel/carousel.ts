import './carousel.scss';
import { createDivElement, createSpanElement } from '../../../../lib/element.ts';
import { getGameRating } from '../../../common-components/game-rating/game-rating.ts';
import { getGameLikes } from '../../../common-components/game-likes/game-likes.ts';

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
    children: [...cards.map((card, i) => createCardElement({ ...card, id: i + 1 }))],
  });

  return createDivElement({
    classList: ['carousel'],
    children: [cardsContainer],
  });
}

function createCardElement(params: CardElementParams) {
  const { cardImage } = params;

  const cardElement = createDivElement({
    classList: ['carousel-card', `carousel-card-${params.id}`],
    children: [createCardContentElement(params)],
  });
  cardElement.style.backgroundImage = `url(${cardImage})`;

  return cardElement;
}

function createCardContentElement(params: CreateCardContentElementParams) {
  const { name, rating, likesCount } = params;

  const nameElement = createSpanElement({
    classList: ['name'],
    textContent: name,
  });

  const additionalInfoElement = createDivElement({
    classList: ['additional-info'],
    children: [getGameRating(rating), getGameLikes(likesCount)],
  });

  return createDivElement({
    classList: ['carousel-card-content'],
    children: [nameElement, additionalInfoElement],
  });
}

export interface CardElementParams {
  cardImage: string;
  name: string;
  rating: number;
  likesCount: number;
  id?: number;
}

interface CreateCardContentElementParams {
  name: string;
  rating: number;
  likesCount: number;
}
