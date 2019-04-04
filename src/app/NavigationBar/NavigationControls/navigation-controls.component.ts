import { Component, Output, Input, EventEmitter } from '@angular/core'

@Component({
  selector: "app-viewer-navControls",
  templateUrl: "./navigation-controls.component.html",
  styleUrls: ['./navigation-controls.component.css']
})
export class NavigationControlsComponent {
  @Input() totalPage: number;
  @Input() actualPage: number
  @Output() nextClick: EventEmitter<any> = new EventEmitter();
  @Output() previousClick: EventEmitter<any> = new EventEmitter();
  @Output() firstPageClick: EventEmitter<any> = new EventEmitter();
  @Output() lastPageClick: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  handleNextClick() {
    this.nextClick.emit(null);
  }

  handlePreviousClick() {
    this.previousClick.emit(null);
  }

  handleFirstPageClick() {
    this.firstPageClick.emit(null);
  }

  handleLastPageClick() {
    this.lastPageClick.emit(null);
  }
}