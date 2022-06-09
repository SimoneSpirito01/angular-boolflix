import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Properties } from 'devextreme/ui/tab_panel';
import { Genre } from '../genre';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  constructor(private genresService: GenresService) {
    this.genresService.activeGenres.subscribe((s) => {
      this.activeFilters = s;
    });
  }

  activeFilters: Array<Genre> = []
  @Input() public set filters(genres: Genre[]) {
    this._filters = genres
    this.filtersChange.emit(this._filters);
  }
  public get filters(): Genre[] {
    return this._filters
  }
  private _filters: Genre[] = []
  @Output() filtersChange = new EventEmitter<Genre[]>();

  setSelectedFilters(genres: {value: Number[]}): void {
    if(!genres?.value) return
    this.filters = genres.value.map(g => this.activeFilters.find(f => f.id == g) || {id: 0, name: ''})
  }

  handleSelectFilter(newFilter: Genre): void {
    if (this.filters?.some(f => f.id == newFilter.id)) {
      this.filters = this.filters.filter(f => f.id != newFilter.id);
    } else {
      this.filters = [...this.filters || [], newFilter]
    }
  }

  checkIfSelected(filter: Genre): boolean {
    return !!this.filters && this.filters.some(f => f.id == filter.id)
  }

  ngOnInit(): void {}
}
