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
