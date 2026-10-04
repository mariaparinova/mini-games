import './library-page.scss';
import {
  createButtonElement,
  createDivElement,
  createHeadingElement,
  createImgElement,
  createSpanElement,
} from '../../lib/element.ts';
import { type Chip, getChips } from '../common-components/chip/chip.ts';
import { getGameRating } from '../common-components/game-rating/game-rating.ts';
import { getGameLikes } from '../common-components/game-likes/game-likes.ts';
import { getSelectControl, type Sort } from '../common-components/select-control/select-control.ts';
import { getPagination } from '../common-components/pagination/pagination.ts';
import { createDialogElement } from '../common-components/dialog/dialog.ts';
import { getIconFavoriteElement } from '../common-components/icon-favorite/icon-favorite.ts';
import type { createSpecsElementParams } from './library-page.types.ts';
import {
  getAllGames,
  getCategories,
  getGameById,
} from '../../data-access/minigames-api/minigames.api.ts';
import type {
  AllGamesDto,
  GameDetailsDto,
} from '../../data-access/minigames-api/minigames-api.types.ts';
import type { Category } from '../../types.ts';
import { getErrorElement } from '../common-components/error-element/error-element.ts';
import { getLoaderElement } from '../common-components/loader/loader.ts';

const CARDS_PER_PAGE = 6;
const INIT_CATEGORY: Category = 'all';
const INIT_SORT_ORDER: Sort = 'rating-desc';
const libraryCardsContainerElement = getLibraryCardsContainerElement();
const currentPage = 1;
let currentCategory: Category = INIT_CATEGORY;
let currentSortOrder: Sort = INIT_SORT_ORDER;
const extendedLibraryCard = {
  data: {
    slug: 'tukoni-forest-keepers',
    name: 'Tukoni: Forest Keepers',
    heroImage: '/assets/images/games/tukoni-forest-keepers-hero.jpg',
    rating: 4.9,
    likesCount: 31200,
    isLikedByCurrentUser: false,
    fullDescription:
      'Tukoni: Forest Keepers — a cozy hand-drawn puzzle-adventure. You are Traveller, a little forest spirit on an important mission. Wander storybook meadows, visit mushroom villages, meet adorable inhabitants, solve gentle hand-crafted puzzles, brew herbal teas and help the Tukoni forest prepare peacefully for the coming winter.',
    specs: {
      genre: 'Puzzle',
      players: 'Solo',
      duration: '40-90 min',
      price: 'Free',
    },
    topRecords: [
      {
        position: 1,
        playerName: 'ForestSpirit',
        score: 356700,
        achievedAt: '2026-08-28T14:30:00Z',
      },
      {
        position: 2,
        playerName: 'TeaBrewer',
        score: 332400,
        achievedAt: '2026-08-25T09:12:00Z',
      },
      {
        position: 3,
        playerName: 'HerbalistPath',
        score: 308900,
        achievedAt: '2026-08-23T18:45:00Z',
      },
    ],
  },
};

export async function initLibraryPage() {
  const heading = getLibraryHeadingElement();
  const pageElement = createDivElement({
    classList: ['library-page-content'],
    children: [],
  });
  let controls: HTMLElement | undefined;
  let pagination: HTMLElement | undefined;

  try {
    controls = await getLibraryControlsElement();
    await updateLibraryCards();
    pagination = getPagination({ visiblePages: 4 });
  } catch (err) {
    console.error(err);
  } finally {
    if (!controls) {
      controls = getErrorElement();
    }

    if (!pagination) {
      pagination = getErrorElement();
    }

    pageElement.append(heading, controls, libraryCardsContainerElement, pagination);
  }
  return pageElement;
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

async function getLibraryControlsElement() {
  let chips: Chip[];
  let selectedChip = '';

  const categoryClickHandler = async (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.id === selectedChip) {
      return;
    }

    document.body.querySelector('.chip.selected')?.classList.remove('selected');
    target.classList.add('selected');
    selectedChip = target.id;

    currentCategory = target.id as Category;
    await updateLibraryCards();
  };

  try {
    const categories = await getCategories();
    chips = categories.data.map((category) => {
      if (category.isDefault) {
        selectedChip = category.slug;
      }

      return {
        slug: category.slug,
        label: category.label,
        isDefault: category.isDefault,
        isSelected: category.slug === currentCategory,
        onClick: categoryClickHandler,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  const chipsElement = getChips({ chips });

  const selectElement = getSelectControl({
    name: 'sort-games',
    id: 'sort-games',
    options: [
      { name: 'Rating ↓', value: 'rating-desc' },
      { name: 'Rating ↑', value: 'rating-asc' },
      { name: 'Name Z→A', value: 'name-desc' },
      { name: 'Name A→Z', value: 'name-asc' },
    ],
    onChange: async (event: Event) => {
      const target = event.target as HTMLOptionElement;
      if (!target.closest('#sort-games')) {
        return;
      }

      currentSortOrder = target.value as Sort;
      await updateLibraryCards();
    },
  });

  return createDivElement({
    classList: ['controls'],
    children: [chipsElement, selectElement],
  });
}

function getLibraryCardsContainerElement() {
  return createDivElement({
    classList: ['library-cards-container'],
  });
}

async function getDetailedLibraryCardElement({ slug }: { slug: string }) {
  let game: GameDetailsDto | undefined = undefined;

  try {
    game = await getGameById({ id: slug });
  } catch (err) {
    console.error(err);
  }

  if (!game) {
    return createDivElement({
      textContent: 'Game not found',
    });
  }

  const imgContainer = createDivElement({
    classList: ['extended-library-card-img-container'],
    children: [
      createImgElement({
        src: extendedLibraryCard.data.heroImage,
        alt: game.data.name,
      }),
    ],
  });

  const extendedLibraryCardHeader = createDivElement({
    classList: ['extended-library-card-header'],
    children: [
      createSpanElement({
        classList: ['extended-library-card-header-title'],
        textContent: game.data.name,
      }),
      createDivElement({
        classList: ['extended-library-card-rating-and-likes-container'],
        children: [getGameRating(game.data.rating), getGameLikes(game.data.likesCount)],
      }),
    ],
  });

  const extendedLibraryCardDescription = createDivElement({
    classList: ['extended-library-card-description'],
    textContent: extendedLibraryCard.data.fullDescription,
  });

  const specsElement = createSpecsElement(extendedLibraryCard.data.specs);

  const extendedLibraryCardButtons = createDivElement({
    classList: ['extended-library-card-buttons-container'],
    children: [
      createButtonElement({
        classList: ['button', 'primary'],
        textContent: 'Play Now',
      }),
      createButtonElement({
        classList: ['button', 'secondary'],
        textContent: 'Add to Favorites',
        icon: getIconFavoriteElement(),
      }),
    ],
  });

  return createDivElement({
    classList: ['extended-library-card'],
    children: [
      imgContainer,
      extendedLibraryCardHeader,
      extendedLibraryCardDescription,
      specsElement,
      extendedLibraryCardButtons,
    ],
  });
}

function createSpecsElement(params: createSpecsElementParams) {
  const { genre, players, duration, price } = params;
  const specClassList = ['game-spec-item'];
  const specLabelClassList = ['game-spec-label'];

  const genreElement = createDivElement({
    classList: specClassList,
    children: [
      createSpanElement({
        classList: specLabelClassList,
        textContent: 'genre',
      }),
      createSpanElement({
        textContent: genre,
      }),
    ],
  });

  const playersElement = createDivElement({
    classList: specClassList,
    children: [
      createSpanElement({
        classList: specLabelClassList,
        textContent: 'Players',
      }),
      createSpanElement({
        textContent: players,
      }),
    ],
  });

  const durationElement = createDivElement({
    classList: specClassList,
    children: [
      createSpanElement({
        classList: specLabelClassList,
        textContent: 'Duration',
      }),
      createSpanElement({
        textContent: duration,
      }),
    ],
  });

  const priceElement = createDivElement({
    classList: specClassList,
    children: [
      createSpanElement({
        classList: specLabelClassList,
        textContent: 'Price',
      }),
      createSpanElement({
        textContent: price,
      }),
    ],
  });

  return createDivElement({
    classList: ['extended-library-card-specs'],
    children: [genreElement, playersElement, durationElement, priceElement],
  });
}

async function updateLibraryCards() {
  const loader = getLoaderElement();
  let cardsData: AllGamesDto | undefined;

  libraryCardsContainerElement.innerHTML = '';
  libraryCardsContainerElement.append(loader);

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    cardsData = await getAllGames({
      page: currentPage,
      limit: CARDS_PER_PAGE,
      category: currentCategory,
      sort: currentSortOrder,
    });

    const cards = cardsData.data.map((card) => {
      const libraryCardElement = createDivElement({
        classList: ['library-card'],
      });

      const cardImg = createImgElement({
        classList: ['library-card-img'],
        src: card.cardImage,
        alt: card.name,
      });

      const imgContainer = createDivElement({
        classList: ['library-card-img-container'],
        children: [cardImg],
      });

      const heading = createSpanElement({
        classList: ['library-card-heading'],
        textContent: card.name,
      });

      const tag = createDivElement({
        classList: ['library-card-tag'],
        textContent: card.category,
      });

      const priceElementClassList = ['library-card-price'];

      if (card.price.toLowerCase() === 'free') {
        priceElementClassList.push('free');
      }

      const price = createSpanElement({
        classList: priceElementClassList,
        textContent: card.price,
      });

      const header = createDivElement({
        classList: ['library-card-header'],
        children: [heading, tag, price],
      });

      const description = createDivElement({
        classList: ['library-card-description'],
        textContent: card.shortDescription + card.shortDescription,
      });

      const ratingAndLikes = createDivElement({
        classList: ['library-card-rating-and-likes-container'],
        children: [getGameRating(card.rating), getGameLikes(card.likesCount)],
      });

      const detailsButton = createButtonElement({
        classList: ['button', 'primary', 'small'],
        textContent: 'Details',
        onClick: async () => {
          let extendedLibraryCardDialogElement: HTMLDialogElement | null = document.querySelector(
            `.extended-library-card-dialog`,
          );

          if (!extendedLibraryCardDialogElement) {
            extendedLibraryCardDialogElement = createDialogElement({
              classList: ['extended-library-card-dialog'],
              children: [await getDetailedLibraryCardElement({ slug: card.slug })],
            });
            document.body.append(extendedLibraryCardDialogElement);
          }

          extendedLibraryCardDialogElement.showModal();
        },
      });

      const footer = createDivElement({
        classList: ['library-card-footer'],
        children: [ratingAndLikes, detailsButton],
      });

      const cardDetails = createDivElement({
        classList: ['library-card-details'],
        children: [header, description, footer],
      });

      libraryCardElement.append(imgContainer, cardDetails);

      return libraryCardElement;
    });

    libraryCardsContainerElement.append(...cards);
  } catch (error) {
    libraryCardsContainerElement.append(getErrorElement(error));
  } finally {
    libraryCardsContainerElement.removeChild(loader);
  }
}
