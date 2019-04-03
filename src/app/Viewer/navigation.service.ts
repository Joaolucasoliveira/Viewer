import { Injectable } from '@angular/core'
import { PageRendererService } from './page-renderer.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { Page } from './page'
import { File } from './file'

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  pages: Page[] = [];
  selectedIndex: number;

  private _selected: BehaviorSubject<Page> = new BehaviorSubject(null);
  public selectedPage$ = this._selected.asObservable();

  constructor(private pageRenderer: PageRendererService) {

  }

  nextPage() {
    this.goToPage(this.selectedIndex + 1);
  }

  previousPage() {
    this.goToPage(this.selectedIndex - 1);
  }

  firstPage() {
    this.goToPage(0);
  }

  lastPage() {
    this.goToPage(this.pages.length - 1);
  }

  goToPage(pageIndex: number) {
    if (pageIndex < 0)
      pageIndex = this.pages.length - 1;
    else if (pageIndex > this.pages.length - 1)
      pageIndex = 0;

    this.selectedIndex = pageIndex;
    this._selected.next(this.pages[pageIndex]);
  }

  addFile(file: File) {
    var addedPages = this.pageRenderer.renderDocument(file);
    for (let i = 0; i < addedPages.length; i++) {
      this.pages.push(addedPages[i]);
    }

    this.selectedIndex = 0;
    this._selected.next(this.pages[0]);
  }
}