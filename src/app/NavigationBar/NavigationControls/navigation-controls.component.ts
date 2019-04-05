import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core'

@Component({
  selector: "app-viewer-navControls",
  templateUrl: "./navigation-controls.component.html",
  styleUrls: ['./navigation-controls.component.css']
})
export class NavigationControlsComponent implements OnInit {
  @Input() totalPage: number;
  @Output() nextClick: EventEmitter<any> = new EventEmitter();
  @Output() previousClick: EventEmitter<any> = new EventEmitter();
  @Output() firstPageClick: EventEmitter<any> = new EventEmitter();
  @Output() lastPageClick: EventEmitter<any> = new EventEmitter();
  @Output() pageTyped: EventEmitter<any> = new EventEmitter();;
  displayPage: number;
  private _actualPage: number;

  @Input() set actualPage(value: number) {

    this.displayPage = this._actualPage = value;
  }

  get actualPage(): number {

    return this._actualPage;

  }

  constructor() {

  }

  onSubmit() {
    this.pageTyped.emit(this.displayPage - 1);
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

  ngOnInit() {

  }
}