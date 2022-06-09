import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private queryService: QueryService,
    private router: Router
  ) {}

  query!: string

  ngOnInit(): void {
  }

  search() {
    if(this.router.url !== '/home') this.router.navigate(['/home'])
    this.queryService.setQueryChange(this.query)
  }

}
