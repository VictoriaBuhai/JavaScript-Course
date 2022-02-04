import { Component, OnInit } from '@angular/core';
import { IGetMoviesResponse, IMovie } from 'src/app/models/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public movies: IMovie[] = [];
  private popularMovies: IMovie[] = [];
  public query = '';

  constructor(private movieService: MovieService) {
    this.movieService.getAllMovies().subscribe((movies: IGetMoviesResponse) => {
      const data = movies.results.map((movie: IMovie) => ({
        ...movie,
        poster_path:
          'https://www.themoviedb.org/t/p/w440_and_h660_face' +
          movie.poster_path,
        favorite: false,
      }));
      this.movies = data;
      this.popularMovies = data;
    });
  }

  onInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.query = input.value;
  };

  searchButtonClick = () => {
    if (this.query === '') {
      this.movies = this.popularMovies;
      return;
    }

    this.movieService
      .getMoviesByQuery(this.query)
      .subscribe((movies: IGetMoviesResponse) => {
        const data = movies.results.map((movie: IMovie) => ({
          ...movie,
          poster_path:
            'https://www.themoviedb.org/t/p/w440_and_h660_face' +
            movie.poster_path,
          favorite: false,
        }));

        this.movies = data;
      });
  };

  toggleFavorite = ({ id, favorite }: { id: number; favorite: boolean }) => {
    this.movieService.toggleFavoriteStatus(id, !favorite).subscribe((_) => {
      this.movies = this.movies.map((movie) => {
        if (movie.id === id) {
          movie.favorite = !movie.favorite;
        }
        return movie;
      });
    });
  };

  ngOnInit(): void {}
}
