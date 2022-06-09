import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../content';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {
    this.contentService.movies.subscribe((m) => {
      this.movies = m;
    });
    this.contentService.series.subscribe((s) => {
      this.series = s;
    });
  }

  @Input() content!: Content | undefined;
  id!: number | null;
  movies!: Content[];
  series!: Content[];

  ngOnInit(): void {
    this.movies = this.contentService.readMovies;
    this.series = this.contentService.readSeries;
    if (!this.movies && !this.series) this.contentService.getTrending();
    this.getContent();
  }

  getContent(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      if (!this.id) return;
      this.content =
        this.movies.find((m) => m.id == this.id) ||
        this.series.find((s) => s.id == this.id);
      if (!!this.content?.vote_average)
        this.content.vote_average = Math.round(this.content.vote_average / 2);
    });
  }
}
