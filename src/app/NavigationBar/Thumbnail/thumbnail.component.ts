import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core'
import { Page } from '../../Viewer/page'

@Component({
  templateUrl: './thumbnail.component.html',
  selector: 'app-thumbnail',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @Input() page: Page
  @Input() selected: boolean
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  handleClick() {
    this.onClick.emit(this.page);
  }

  ngOnInit() {
    console.log('component created')
  }
}