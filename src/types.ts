export const Sort = {
  RatingDesc: 'rating-desc',
  RatingAsc: 'rating-asc',
  NameDesc: 'name-desc',
  NameAsc: 'name-asc',
} as const;

export type Sort = keyof typeof Sort;

export type Category = 'all' | 'puzzle' | 'card' | 'match' | 'farm' | 'strategy' | 'arcade';
