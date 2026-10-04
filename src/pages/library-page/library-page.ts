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
import { getSelectControl } from '../common-components/select-control/select-control.ts';
import { getPagination } from '../common-components/pagination/pagination.ts';
import { createDialogElement } from '../common-components/dialog/dialog.ts';
import { getIconFavoriteElement } from '../common-components/icon-favorite/icon-favorite.ts';
import type { createSpecsElementParams, LibraryCard } from './library-page.types.ts';
import { getCategories } from '../../data-access/minigames-api/minigames.api.ts';

const libraryCards = {
  data: [
    {
      slug: 'vacation-cafe-simulator',
      name: 'Vacation Cafe Simulator',
      category: 'strategy',
      price: 'Free',
      shortDescription:
        'Cozy Italian Vacation Cafe 🏖️ No timers, No stress 😌 cook traditional dishes 🍝 upgrade and customize 🏠 just drink Prosecco 🥂 relax and grow your dream cafe ✨',
      rating: 4.8,
      likesCount: 28750,
      cardImage: '/assets/images/games/vacation-cafe-simulator-card.jpg',
      featured: true,
    },
    {
      slug: 'winter-burrow',
      name: 'Winter Burrow',
      category: 'farm',
      price: 'Free',
      shortDescription:
        'A cozy woodland survival game about a mouse restoring their childhood burrow. Explore, gather resources, craft, knit warm sweaters, bake pies and meet the locals.',
      rating: 4.9,
      likesCount: 32400,
      cardImage: '/assets/images/games/winter-burrow-card.jpg',
      featured: true,
    },
    {
      slug: 'shelve-the-potions',
      name: 'Shelve the Potions!',
      category: 'puzzle',
      price: 'Free',
      shortDescription:
        "Organize 2000+ potions on shelves after the witch's cats have knocked them over, using clues around an enchanted cellar. Learn strange symbols and decipher cryptic notes.",
      rating: 4.7,
      likesCount: 21300,
      cardImage: '/assets/images/games/shelve-the-potions-card.jpg',
      featured: true,
    },
    {
      slug: 'heartopia',
      name: 'Heartopia',
      category: 'strategy',
      price: '$1.99',
      shortDescription:
        'A multiplayer life simulation game crafted for creativity, freedom, and peace. Build your dream home, explore hobbies, and forge warm connections with friends in a cozy town.',
      rating: 4.6,
      likesCount: 46800,
      cardImage: '/assets/images/games/heartopia-card.jpg',
      featured: true,
    },
    {
      slug: 'palia',
      name: 'Palia',
      category: 'strategy',
      price: 'Free',
      shortDescription:
        'A free-to-play fantasy life sim adventure where you can craft, explore, and create the life and home of your dreams in a vibrant, heartwarming world.',
      rating: 4.8,
      likesCount: 89500,
      cardImage: '/assets/images/games/palia-card.jpg',
      featured: true,
    },
    {
      slug: 'cat-mail-co',
      name: 'Cat Mail Co.',
      category: 'puzzle',
      price: 'Free',
      shortDescription:
        'Run a cozy cat post office. Sort and deliver parcels from the daily boat. At night, the moon reveals hidden truths about packages. Clear a strange backlog and unlock new destinations.',
      rating: 4.9,
      likesCount: 38200,
      cardImage: '/assets/images/games/cat-mail-co-card.jpg',
      featured: true,
    },
    {
      slug: 'leaf-it-alone',
      name: 'Leaf it Alone',
      category: 'arcade',
      price: 'Free',
      shortDescription:
        "Finally, it's that time of the year to clean up this leafy mess. Derust your raking skills and don't waste a second — there's a whole lawn waiting!",
      rating: 4.4,
      likesCount: 12600,
      cardImage: '/assets/images/games/leaf-it-alone-card.jpg',
      featured: false,
    },
    {
      slug: 'leafy-corner',
      name: 'Leafy Corner',
      category: 'farm',
      price: '$1.99',
      shortDescription:
        'Run a cute little plant shop. Grow, sell, and care for real-life plants, help customers find their dream plants, complete orders, and customize your cozy shop.',
      rating: 4.7,
      likesCount: 19800,
      cardImage: '/assets/images/games/leafy-corner-card.jpg',
      featured: false,
    },
    {
      slug: 'grimshire',
      name: 'Grimshire',
      category: 'strategy',
      price: 'Free',
      shortDescription:
        'A deadly plague threatens the village of Grimshire. Manage farmland, forage wilds, stop harvest rot and keep the cellar full. Can you help the community survive?',
      rating: 4.6,
      likesCount: 15700,
      cardImage: '/assets/images/games/grimshire-card.jpg',
      featured: false,
    },
    {
      slug: 'tiny-glade',
      name: 'Tiny Glade',
      category: 'arcade',
      price: '$3.99',
      shortDescription:
        'A small diorama builder where you doodle whimsical castles, cozy cottages & romantic ruins. No management, combat or goals — just lovable dioramas.',
      rating: 4.9,
      likesCount: 67300,
      cardImage: '/assets/images/games/tiny-glade-card.jpg',
      featured: true,
    },
    {
      slug: 'whisper-of-the-house',
      name: 'Whisper of the House',
      category: 'puzzle',
      price: 'Free',
      shortDescription:
        'A cozy organizing & decorating game. Help townspeople move, organize, and clean their spaces. Your gentle touch may change their lives and uncover hidden stories.',
      rating: 4.8,
      likesCount: 24900,
      cardImage: '/assets/images/games/whisper-of-the-house-card.jpg',
      featured: false,
    },
    {
      slug: 'tukoni-forest-keepers',
      name: 'Tukoni: Forest Keepers',
      category: 'puzzle',
      price: 'Free',
      shortDescription:
        'A cute cozy puzzle adventure. Play as a forest spirit exploring hand-drawn magical locations, meet charming characters, solve puzzles, collect herbs and tea recipes.',
      rating: 4.9,
      likesCount: 31200,
      cardImage: '/assets/images/games/tukoni-forest-keepers-card.jpg',
      featured: false,
    },
    {
      slug: 'cat-chess',
      name: 'Cat Chess',
      category: 'strategy',
      price: 'Free',
      shortDescription:
        'Play the ancient and thrilling game of Chess but with... cats! Lead your furry friends to the Purrfect battle of brains and whiskers!',
      rating: 4.6,
      likesCount: 17400,
      cardImage: '/assets/images/games/cat-chess-card.jpg',
      featured: false,
    },
    {
      slug: 'cast-n-chill',
      name: 'Cast n Chill',
      category: 'arcade',
      price: 'Free',
      shortDescription:
        'A relaxing fishing game where you explore serene lakes, rivers, and oceans. Catch rare fish, upgrade your gear and reel in legendary catches - all with your loyal companion.',
      rating: 4.7,
      likesCount: 26800,
      cardImage: '/assets/images/games/cast-n-chill-card.jpg',
      featured: false,
    },
    {
      slug: 'little-corners',
      name: 'Little Corners',
      category: 'puzzle',
      price: 'Free',
      shortDescription:
        'Peel, place, and arrange stickers across tiny windows into different worlds. Relax and unwind to lofi beats, collect unique stickers and share cozy creations.',
      rating: 4.8,
      likesCount: 41500,
      cardImage: '/assets/images/games/little-corners-card.jpg',
      featured: false,
    },
    {
      slug: 'tailside-cozy-cafe-sim',
      name: 'Tailside: Cozy Cafe Sim',
      category: 'strategy',
      price: 'Free',
      shortDescription:
        'Run your own cozy café in Tailside! Brew coffee, decorate your café, follow small stories in the daily newspaper. Unlock new items, skills, villagers, and creature visitors.',
      rating: 4.8,
      likesCount: 35600,
      cardImage: '/assets/images/games/tailside-cozy-cafe-sim-card.jpg',
      featured: true,
    },
    {
      slug: 'islanders-new-shores',
      name: 'ISLANDERS: New Shores',
      category: 'strategy',
      price: 'Free',
      shortDescription:
        'Build your island retreat in a calm, minimalist world with exciting new features that keep the classic charm while inspiring fresh creativity.',
      rating: 4.9,
      likesCount: 54200,
      cardImage: '/assets/images/games/islanders-new-shores-card.jpg',
      featured: true,
    },
    {
      slug: 'camper-van-make-it-home',
      name: 'Camper Van: Make it Home',
      category: 'puzzle',
      price: 'Free',
      shortDescription:
        'Decorate and organize the camper van of your dreams! Build your own home-on-wheels using creative block organization puzzles and relaxing interior design.',
      rating: 4.7,
      likesCount: 29300,
      cardImage: '/assets/images/games/camper-van-make-it-home-card.jpg',
      featured: false,
    },
    {
      slug: 'organized-inside',
      name: 'Organized Inside',
      category: 'puzzle',
      price: 'Free',
      shortDescription:
        'A slow-paced life sim and tidying up game about a cat, passion, transformation and growth. Categorize household items while uncovering the meaning of life through organization.',
      rating: 4.8,
      likesCount: 22700,
      cardImage: '/assets/images/games/organized-inside-card.jpg',
      featured: false,
    },
    {
      slug: 'cozy-solitaire',
      name: 'Cozy Solitaire',
      category: 'card',
      price: 'Free',
      shortDescription: 'Classic Solitaire game, accompanied by music and kitties.',
      rating: 4.5,
      likesCount: 38900,
      cardImage: '/assets/images/games/cozy-solitaire-card.jpg',
      featured: false,
    },
    {
      slug: 'cozy-sudoku',
      name: 'Cozy Sudoku',
      category: 'puzzle',
      price: 'Free',
      shortDescription: 'Sudoku, tunes, and some furry friends.',
      rating: 4.6,
      likesCount: 21500,
      cardImage: '/assets/images/games/cozy-sudoku-card.jpg',
      featured: false,
    },
    {
      slug: 'koroneko',
      name: 'KoroNeko',
      category: 'puzzle',
      price: 'Free',
      shortDescription:
        'Roll your way through a cozy, kawaii world full of charming characters and challenging puzzles to save your siblings from Strawberry the Witch!',
      rating: 4.9,
      likesCount: 47300,
      cardImage: '/assets/images/games/koroneko-card.jpg',
      featured: false,
    },
    {
      slug: 'wytchwood',
      name: 'Wytchwood',
      category: 'strategy',
      price: '$4.99',
      shortDescription:
        'A crafting adventure game set in a land of gothic fables. As the old witch, explore, collect ingredients, brew spells, and pass judgement upon a capricious cast of characters.',
      rating: 4.7,
      likesCount: 33100,
      cardImage: '/assets/images/games/wytchwood-card.jpg',
      featured: false,
    },
    {
      slug: 'the-wild-at-heart',
      name: 'The Wild at Heart',
      category: 'strategy',
      price: 'Free',
      shortDescription:
        'Wield a herd of quirky creatures to rebuild paths, battle beasts, and solve puzzles in a rich, interconnected nostalgic storybook fantasy world.',
      rating: 4.8,
      likesCount: 30400,
      cardImage: '/assets/images/games/the-wild-at-heart-card.jpg',
      featured: false,
    },
  ],
  meta: {
    totalItems: 24,
    description: 'Full MiniGames library — seed snapshot (24 cozy titles), resets daily 03:00 UTC',
    featuredCount: 9,
  },
};

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

export async function getLibraryPageElement() {
  const heading = getLibraryHeadingElement();
  const pagination = getPagination({ visiblePages: 4 });

  try {
    const controls = await getLibraryControlsElement();
    const cards = getLibraryCardsElement({ data: libraryCards.data });

    return createDivElement({
      classList: ['library-page-content'],
      children: [heading, controls, cards, pagination],
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
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

  const chipClickHandler = (event: MouseEvent) => {
    const chip = event.target as HTMLElement;

    if (chip.classList.contains(selectedChip)) {
      return;
    }

    document.body.querySelector('.chip.selected')?.classList.remove('selected');
    chip.classList.add('selected');
    selectedChip = chip.innerHTML;
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
        isSelected: category.slug === selectedChip,
        onClick: chipClickHandler,
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
      { name: 'Rating ↑', type: 'rating_asc' },
      { name: 'Rating ↓', type: 'rating_desc' },
      { name: 'Name A→Z', type: 'name_asc' },
      { name: 'Name Z→A', type: 'name_desc' },
    ],
    onChange: () => {},
  });

  return createDivElement({
    classList: ['controls'],
    children: [chipsElement, selectElement],
  });
}

function getLibraryCardsElement({ data }: { data: LibraryCard[] }) {
  const cards = data.map((card) => {
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
      onClick: () => {
        let extendedLibraryCardDialogElement: HTMLDialogElement | null = document.querySelector(
          `.extended-library-card-dialog`,
        );

        if (!extendedLibraryCardDialogElement) {
          extendedLibraryCardDialogElement = createDialogElement({
            classList: ['extended-library-card-dialog'],
            children: [getDetailedLibraryCardElement({ slug: card.slug })],
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

  return createDivElement({
    classList: ['library-cards-container'],
    children: [...cards],
  });
}

function getDetailedLibraryCardElement({ slug }: { slug: string }) {
  const game = libraryCards.data.find((game) => game.slug === slug);

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
        alt: game.name,
      }),
    ],
  });

  const extendedLibraryCardHeader = createDivElement({
    classList: ['extended-library-card-header'],
    children: [
      createSpanElement({
        classList: ['extended-library-card-header-title'],
        textContent: game.name,
      }),
      createDivElement({
        classList: ['extended-library-card-rating-and-likes-container'],
        children: [getGameRating(game.rating), getGameLikes(game.likesCount)],
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
