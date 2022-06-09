import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { QueryService } from '../query.service';
import { ContentService } from '../content.service';
import { Content } from '../content';
import { GenresService } from '../genres.service';
import { Genre } from '../genre';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  query!: string;

  constructor(
    private contentService: ContentService,
    private queryService: QueryService,
    private genresService: GenresService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.queryService.queryChange.subscribe((q) => {
      this.query = q;

      if (!q) {
        this.contentService.getTrending();
        return;
      }

      this.contentService.search(
        'd299e29d3e9fc17a1f45092e37356684',
        'it-IT',
        q
      );
    });

    this.contentService.movies.subscribe((m) => {
      if(!m) return
      this.movies = this.bindProperties(m);
    });
    this.contentService.series.subscribe((s) => {
      if(!s) return
      this.series = this.bindProperties(s);
    });
    this.genresService.selectedGenre.subscribe((f) => {});
  }

  genres: Genre[] = this.genresService.allGenres;
  movies!: Array<Content>;
  series!: Array<Content>;
  filters: Genre[] = [];
  selectedMode: string = 'Default'
  modes: string[] = [
    'Default', 'Griglia', 'Carosello'
  ]
  loggedUser?: string

  ngOnInit(): void {
    this.contentService.getTrending();
  }
  
  bindProperties(contents: Content[]): Content[] {
    for (let c of contents) {
      c.boolflix = Math.floor(Math.random() * 10) + 1 <= 4;
      c.genres = c.genre_ids.map((g) => this.genres.find((f) => f.id == g)?.name).join(', ');
    }
    return contents
  }

  updateFilters(): void {
    if (!this.filters.length) {
      this.contentService.movies.next(this.contentService.originalMovies);
      this.contentService.series.next(this.contentService.originalSeries);
      return;
    }
    this.contentService.movies.next(
      this.contentService.originalMovies.filter((m) =>
        this.filters.every((f) => m.genre_ids.some((g) => f.id == g))
      )
    );
    this.contentService.series.next(
      this.contentService.originalSeries.filter((m) =>
        this.filters.every((f) => m.genre_ids.some((g) => f.id == g))
      )
    );
  }

  handleModeChange(mode: string): void {
    this.selectedMode = mode
  }

  handleEventEmitter(content: Content): void {
    this.contentService.readFavorites.some(f => f.id == content.id) ? this.removeFavorite(content) : this.setFavorite(content);
  }

  handleDetailsEvent(id: number): void {
    this.router.navigate(['content', id, 'details'])
  }

  setFavorite(content: Content): void {
    this.contentService.favorites.next([
      ...(this.contentService.readFavorites || []),
      content,
    ]);
  }

  removeFavorite(content: Content): void {
    this.contentService.favorites.next(
      this.contentService.readFavorites.filter((f) => f.id != content.id)
    );
  }

  removeFilter(id: number): void {
    this.filters = this.filters.filter((f) => f.id != id);
    this.updateFilters();
  }
}
