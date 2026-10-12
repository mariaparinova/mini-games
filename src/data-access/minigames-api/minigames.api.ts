import type {
  CategoryDto,
  LeaderboardDto,
  AllGamesDto,
  GetAllGamesParams,
  GameDetailsDto,
  GetDameByIdParams,
  ToggleGameFavoriteParams,
  FavoriteDto,
  GetAllCommentsDto,
  GetAllCommentsParams,
  PostCommentParams,
  CommentDto,
  ToggleCommentLikeParams,
} from './minigames-api.types.ts';

const BASE_URL = 'https://faxb76kxra.execute-api.eu-central-1.amazonaws.com/api';

export async function getCategories(): Promise<CategoryDto> {
  const response = await fetch(`${BASE_URL}/categories`);
  return await response.json();
}

export async function getLeaderboard(): Promise<LeaderboardDto> {
  const response = await fetch(`${BASE_URL}/leaderboard`);
  return await response.json();
}

export async function getAllGames(params: GetAllGamesParams): Promise<AllGamesDto> {
  const { featured = false, category = 'all', sort = 'rating-desc', page = 1, limit = 10 } = params;
  const queryParams = new URLSearchParams();

  if (featured) {
    queryParams.append('featured', 'true');
  } else {
    queryParams.append('featured', 'false');
    queryParams.append('category', category);
    queryParams.append('sort', sort);
    queryParams.append('page', `${page}`);
    queryParams.append('limit', `${limit}`);
  }

  const response = await fetch(`${BASE_URL}/games?${queryParams}`, {
    headers: {
      accept: 'application/json',
    },
  });
  const cardsData = await response.json();

  if (cardsData.data) {
    return cardsData;
  }

  if (cardsData.error) {
    throw new Error(cardsData.error);
  }

  throw new Error('Failed to fetch games');
}

export async function getGameById(params: GetDameByIdParams): Promise<GameDetailsDto> {
  const { id, userEmail } = params;
  const queryParams = new URLSearchParams();

  if (userEmail) {
    queryParams.append('userEmail', userEmail);
  }

  const response = await fetch(`${BASE_URL}/games/${id}`);
  return await response.json();
}

export async function toggleGameFavorite(params: ToggleGameFavoriteParams): Promise<FavoriteDto> {
  const { id, userEmail } = params;
  const response = await fetch(`${BASE_URL}/games/${id}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail }),
  });

  return await response.json();
}

export async function getAllComments(params: GetAllCommentsParams): Promise<GetAllCommentsDto> {
  const { id, limit, sort, userEmail } = params;
  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append('limit', limit.toString());
  }
  if (sort) {
    queryParams.append('sort', sort);
  }
  if (userEmail) {
    queryParams.append('userEmail', userEmail);
  }

  const response = await fetch(`${BASE_URL}/games/${id}/comments`);
  return await response.json();
}

export async function postComment(params: PostCommentParams): Promise<CommentDto> {
  const { id, userEmail, text, authorName } = params;
  const body = JSON.stringify({
    userEmail,
    authorName,
    text,
  });

  const response = await fetch(`${BASE_URL}/games/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  return response.json();
}

export async function toggleCommentLike(params: ToggleCommentLikeParams) {
  const { commentId, userEmail } = params;

  const response = await fetch(`${BASE_URL}/comments/${commentId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail }),
  });
  return await response.json();
}
