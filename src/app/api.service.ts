import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getTrendingMovies(): Observable<any> {
    return this.http.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=d299e29d3e9fc17a1f45092e37356684'
    );
  }

  getTrendingSeries(): Observable<any> {
    return this.http.get(
      'https://api.themoviedb.org/3/trending/tv/day?api_key=d299e29d3e9fc17a1f45092e37356684'
    );
  }

  searchMovies(key: string, lang: string, query: string): Observable<any> {
    let params = new HttpParams()
      .set('api_key', key)
      .set('language', lang)
      .set('query', query);
    return this.http.get('https://api.themoviedb.org/3/search/movie', {
      params,
    });
  }

  searchSeries(key: string, lang: string, query: string): Observable<any> {
    let params = new HttpParams()
      .set('api_key', key)
      .set('language', lang)
      .set('query', query);
    return this.http.get('https://api.themoviedb.org/3/search/tv', {
      params,
    });
  }

  getMoviesGenres(): Observable<any> {
    return this.http.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=d299e29d3e9fc17a1f45092e37356684&language=it-IT'
    );
  }

  getSeriesGenres(): Observable<any> {
    return this.http.get(
      'https://api.themoviedb.org/3/genre/tv/list?api_key=d299e29d3e9fc17a1f45092e37356684&language=it-IT'
    );
  }
}
