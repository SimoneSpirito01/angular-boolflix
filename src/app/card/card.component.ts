import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from '../content';
import { ContentService } from '../content.service';
import { Genre } from '../genre';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(
    private contentService: ContentService,
    private genresService: GenresService,
  ) {
    this.contentService.favorites.subscribe(f => this.checkFavorite(f))
  }

  genres: Genre[] = this.genresService.allGenres;
  hover: boolean = false;
  actHover: boolean = false;
  timeout: any;
  favorite?: boolean

  @Input() content!: Content;
  @Input() onlyHeart!: boolean;
  @Output() clickEvent = new EventEmitter<Content>()
  @Output() detailsEvent = new EventEmitter<number>()

  ngOnInit(): void {
    this.checkFavorite()
  }

  checkFavorite(favorites: Genre[] = this.contentService.readFavorites): void {
    this.favorite = favorites.some(f => f.id == this.content?.id)
  }

  setHover(value: boolean): void {
    if (value) {
      this.actHover = true;
      this.timeout = setTimeout(() => {
        if (this.actHover == true) this.hover = true;
      }, 300);
    } else {
      clearTimeout(this.timeout);
      this.hover = false;
      this.actHover = false;
    }
  }

  handleClick(content: Content): void {
    this.clickEvent.emit(content)
  }

  handleDetails(id: number): void {
    this.detailsEvent.emit(id)
  }
    
  
}
