import { environment } from '../../environments/environment';
import { Injectable, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFavoriteStatus, IGetMoviesResponse } from '../models/movie.interface';
import { Observable } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  public getAllMovies(): Observable<IGetMoviesResponse> {
    return this.httpClient.get<IGetMoviesResponse>(
      `${environment.BASE_URL}/movie/popular`
    );
  }

  public getFavorites(): Observable<IGetMoviesResponse> {
    return this.httpClient.get<IGetMoviesResponse>(
      `${environment.BASE_URL}/account/${environment.ACCOUNT_ID}/favorite/movies`
    );
  }

  public toggleFavoriteStatus(
    media_id: number,
    favorite: boolean
  ): Observable<IFavoriteStatus> {
    return this.httpClient.post<IFavoriteStatus>(
      `${environment.BASE_URL}/account/${environment.ACCOUNT_ID}/favorite`,
      { media_type: 'movie', media_id, favorite }
    );
  }

  public getMoviesByQuery(query: string): Observable<IGetMoviesResponse> {
    return this.httpClient.get<IGetMoviesResponse>(
      `${environment.BASE_URL}/search/movie`,
      { params: { query } }
    );
  }
}
