import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Content } from './content';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  readMovies!: Content[];
  readSeries!: Content[];
  readFavorites!: Content[];
  originalMovies!: Content[];
  originalSeries!: Content[];
  movies: Subject<Content[]> = new Subject<Content[]>();
  series: Subject<Content[]> = new Subject<Content[]>();
  favorites: Subject<Content[]> = new Subject<Content[]>();

  constructor(private api: ApiService) {
    this.readFavorites = this.getLocalStorage();

    this.movies.subscribe((m) => (this.readMovies = m));
    this.series.subscribe((s) => (this.readSeries = s));
    this.favorites.subscribe((f) => {
      this.readFavorites = f;
      this.setLocalStorage(f);
    });
  }

  getTrending(): void {
    this.api.getTrendingMovies().subscribe((m) => {
      this.movies.next(m.results);
      this.originalMovies = m.results;
    });
    this.api.getTrendingSeries().subscribe((s) => {
      this.series.next(s.results);
      this.originalSeries = s.results;
    });
  }

  search(key: string, lang: string, query: string): void {
    this.api.searchMovies(key, lang, query).subscribe((m) => {
      this.movies.next(m.results);
      this.originalMovies = m.results;
    });
    this.api.searchSeries(key, lang, query).subscribe((s) => {
      this.series.next(s.results);
      this.originalSeries = s.results;
    });
  }

  setLocalStorage(favorites: Content[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  getLocalStorage(): Content[] {
    let favorites = localStorage.getItem('favorites');
    if (!!favorites) {
      return JSON.parse(favorites);
    }
    return [];
  }
}
