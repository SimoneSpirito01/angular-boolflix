import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  queryChange: Subject<string> = new Subject<string>();

  constructor() {}

  setQueryChange(query: string) {
    this.queryChange.next(query);
  }
}
