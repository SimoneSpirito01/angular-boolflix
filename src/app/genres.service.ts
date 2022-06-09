import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Genre } from './genre';
import { ContentService } from './content.service';
import { Content } from './content';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(
    private contentService: ContentService, private api: ApiService
  ) {
    this.getGenres();
    this.contentService.movies.subscribe((m) => {
      this.movies = m;
    });
    this.contentService.series.subscribe((s) => {
      if(!s) return 
      this.series = s;
      this.getActiveGenres();
    });
    this.selectedGenre.subscribe((s) => {
      this.readSelectedGenre = s;
    });
  }

  movies: Array<Content> = [] 
  series: Array<Content> = []   
  allGenres!: Genre[];
  activeGenres: Subject<Genre[]> = new Subject<Genre[]>();
  selectedGenre: Subject<Genre> = new Subject<Genre>();
  readSelectedGenre!: Genre;

  getActiveGenres() {
    this.activeGenres.next(
      this.allGenres.filter((g) =>
        [
          ...this.movies.map((g) => g.genre_ids).flat(),
          ...this.series.map((g) => g.genre_ids).flat(),
        ].includes(g.id)
      )
    );
  }

  getGenres(): void {
    let genres: Array<Genre> = [];
    let uniqueGenres: Array<Genre> = [];
    this.api.getMoviesGenres().subscribe((g) => genres.push(...g.genres));
    this.api.getSeriesGenres().subscribe((g) => {
      genres.push(...g.genres);
      for (let genre of genres) {
        if (uniqueGenres.findIndex((g) => g.id == genre.id) == -1) {
          uniqueGenres.push(genre);
        }
      }
    });
    this.allGenres = uniqueGenres;
  }
  
}
