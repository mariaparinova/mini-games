import type { Category, Sort } from '../../types.ts';

export interface CategoryDto {
  data: Array<{
    slug: string;
    label: string;
    isDefault: boolean;
  }>;
  meta: {
    totalItems: number;
    description: string;
  };
}

export interface LeaderboardDto {
  data: LeaderboardItemDto[];
  meta: {
    totalItems: number;
    description: string;
  };
}

export interface LeaderboardItemDto {
  rank: number;
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameSlug: string;
  favoriteGameName: string;
}

export interface AllGamesDto {
  data: AllGamesItemDto[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    appliedFilter: {
      category: string;
      sort: Sort;
    };
  };
}

export interface AllGamesItemDto {
  slug: string;
  name: string;
  category: string;
  price: string;
  shortDescription: string;
  rating: number;
  likesCount: number;
  cardImage: string;
}

export interface GameDetailsDto {
  data: {
    slug: string;
    name: string;
    heroImage: string;
    rating: number;
    likesCount: number;
    isLikedByCurrentUser: boolean;
    fullDescription: string;
    specs: {
      genre: string;
      players: string;
      duration: string;
      price: string;
    };
    topRecords: TopRecordsItemDto[];
  };
}

export interface TopRecordsItemDto {
  position: number;
  playerName: string;
  score: number;
  achievedAt: string;
}

export interface FavoriteDto {
  data: {
    gameSlug: string;
    isFavorited: boolean;
    likesCount: number;
  };
}

export interface CommentDto {
  commentId: string;
  authorName: string;
  text: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string; // '2026-08-30T07:00:00Z'
}

export interface GetAllCommentsDto {
  data: CommentDto[];
  meta: {
    totalComments: number;
    returnedCount: number;
    sort: string;
  };
}

export interface GetAllGamesParams {
  featured?: boolean;
  page?: number;
  limit?: number;
  category?: Category;
  sort?: Sort;
}

export interface GetDameByIdParams {
  id: string;
  userEmail?: string;
}

export interface ToggleGameFavoriteParams {
  id: string;
  userEmail: string;
}

export interface GetAllCommentsParams {
  id: string;
  limit?: number;
  sort?: Sort;
  userEmail?: string;
}

export interface PostCommentParams {
  id: string;
  userEmail: string;
  authorName: string;
  text: string;
}

export interface ToggleCommentLikeParams {
  commentId: string;
  userEmail: string;
}
