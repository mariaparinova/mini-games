import './carousel-card.scss';
import { createDivElement, createSpanElement } from '../../../../../lib/element.ts';
import { getGameRating } from '../../../../common-components/game-rating/game-rating.ts';
import { getGameLikes } from '../../../../common-components/game-likes/game-likes.ts';

export function createCardElement(params: CardElementParams) {
  const { cardImage } = params;

  const cardElement = createDivElement({
    classList: ['carousel-card'],
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
}

interface CreateCardContentElementParams {
  name: string;
  rating: number;
  likesCount: number;
}
