export interface IMovie {
  id: number;
  vote_average: number;
  title: string;
  release_date: string;
  favorite?: boolean;
  poster_path: string;
}
export interface IGetMoviesResponse {
  results: IMovie[];
}
export interface IFavoriteStatus {
  status_code: number;
  status_message: string;
}
