import type { Sort } from '../common-components/select-control/select-control.ts';
import type { Category } from '../../types.ts';

export interface createSpecsElementParams {
  genre: string;
  players: string;
  duration: string;
  price: string;
}

export interface LibraryCard {
  slug: string;
  name: string;
  category: string;
  price: string;
  shortDescription: string;
  rating: number;
  likesCount: number;
  cardImage: string;
}

export interface LibraryUrlParams {
  category: Category;
  sort: Sort;
  page: number;
}
