import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IGetMoviesResponse, IMovie } from '../../models/movie.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public movies: IMovie[] = [];

  constructor(private movieService: MovieService) {
    this.movieService.getFavorites().subscribe((movies: IGetMoviesResponse) => {
      this.movies = movies.results.map((movie: IMovie) => ({
        ...movie,
        poster_path:
          'https://www.themoviedb.org/t/p/w440_and_h660_face' +
          movie.poster_path,
        favorite: true,
      }));
    });
  }
  removeFromFavorites({ id, favorite }: { id: number; favorite: boolean }) {
    this.movieService.toggleFavoriteStatus(id, !favorite).subscribe((_) => {
      this.movies = this.movies.filter((movie) => movie.id !== id);
    });
  }

  ngOnInit(): void {}
}
