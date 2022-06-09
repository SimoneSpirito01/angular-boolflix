import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from '../content';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    constructor(private contentService: ContentService, private router: Router) { 
    this.contentService.favorites.subscribe(f => this.favorites = f)
  }

  favorites!: Content[]

  ngOnInit(): void {
    this.favorites = this.contentService.getLocalStorage()
    
  }

  handleEventEmitter(content: Content): void {
    this.removeFavorite(content)
  }

  handleDetailsEvent(id: number): void {
    this.router.navigate(['content', id, 'details'])
  }

  removeFavorite(content: Content): void {
    this.contentService.favorites.next(
      this.contentService.readFavorites.filter((f) => f.id != content.id)
    );
  }

}
