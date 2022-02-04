import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovie } from 'src/app/models/movie.interface';
import { MovieService } from 'src/app/services/movie.service';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  @Output() public clickHandler = new EventEmitter<{
    id: number;
    favorite: boolean;
  }>();

  @Input('movie') movie: IMovie = {} as IMovie;

  public onClick() {
    this.clickHandler.emit({
      id: this.movie.id,
      favorite: this.movie.favorite!,
    });
  }
  ngOnInit(): void {}
}
