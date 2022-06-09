import { Genre } from './genre';

export interface Content {
  backdrop_path: string;
  poster_path: string;
  genre_ids: Number[];
  genres: string;
  id: number;
  title: string;
  name: string;
  boolflix: boolean;
  overview: string;
  vote_average: number
  media_type: string;
  favorite: boolean;
}
