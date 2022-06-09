import { Content } from '../content';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  @Input() type!: string
  @Input() contents!: Array<Content>
  @Input() onlyHeart!: boolean
  @Input() mode?: string
  @Output() eventEmitter = new EventEmitter<Content>()
  @Output() detailsEvent = new EventEmitter<number>()

  handleEventEmitter(content: Content): void {
    this.eventEmitter.emit(content)
  }

  handleDetailsEvent(id: number): void {
    this.detailsEvent.emit(id)
  }

  

  ngOnInit(): void {
  }

}
