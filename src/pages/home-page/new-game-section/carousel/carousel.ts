import './carousel.scss';
import { createDivElement, createSpanElement } from '../../../../lib/element.ts';
import { getGameRating } from '../../../common-components/game-rating/game-rating.ts';
import { getGameLikes } from '../../../common-components/game-likes/game-likes.ts';
import { getAllGames } from '../../../../data-access/minigames-api/minigames.api.ts';
import type { AllGamesDto } from '../../../../data-access/minigames-api/minigames-api.types.ts';
import { getErrorElement } from '../../../common-components/error-element/error-element.ts';

export async function getCarousel() {
  let cardsData: AllGamesDto['data'] | undefined;

  try {
    const response = await getAllGames({ featured: true });
    cardsData = response.data;
  } catch (error) {
    return getErrorElement(error);
  }

  const cards =
    cardsData?.slice(0, 5).map((card, i) => createCardElement({ ...card, id: i + 1 })) || [];

  const cardsContainer = createDivElement({
    classList: ['cards-container'],
    children: [...cards],
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
