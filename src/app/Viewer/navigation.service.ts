import { Injectable } from '@angular/core'
import { PageRendererService } from './page-renderer.service'
import { BehaviorSubject, Observable, of, from } from 'rxjs'
import { switchMap, switchAll, tap, map, debounceTime } from 'rxjs/operators';
import { Page } from './page'
import { File } from './file'
import { Document } from './document'

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  pages: Page[] = [];
  documents: Document[] = [];
  selectedIndex: number = -1; //Default selected index, before page select

  private _selected: BehaviorSubject<Page> = new BehaviorSubject(null);
  public selectedPage$ = this._selected.asObservable();

  private pages_changed: BehaviorSubject<Page[]> = new BehaviorSubject(null);
  public pages_changed$ = this.pages_changed.asObservable();

  private _selectedIndex: BehaviorSubject<number> = new BehaviorSubject(null);
  private selectedIndex_changed$ = this._selectedIndex.asObservable();

  renderSubscription;

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

    this._selectedIndex.next(pageIndex);
  }

  subscribeToPageChange() {
    if (this.renderSubscription == null) {
      this.renderSubscription = this.selectedIndex_changed$.pipe(debounceTime(500), tap(() => {
        console.log("Started rendering");

      }), switchMap((val) => { return this.pageRenderer.renderPage(this.pages[val], this.documents[0].loadedFile); })).subscribe((page) => {

        console.log("Finished rendering");

        this.pages[this.selectedIndex] = page;
        this._selected.next(page);
      });
    }
  }

  addFile(file: File) {
    this.pageRenderer.renderDocument(file).subscribe(document => {

      this.documents.push(document);

      for (let i = 0; i < document.pages.length; i++) {
        this.pages.push(document.pages[i]);

        this.pageRenderer.generateThumbnail(document.pages[i], document.loadedFile, 1).subscribe(page => {
          this.pages[i] = page;
          this.pages_changed.next(this.pages);
        });
      }

      if (this.selectedIndex < 0) {
        this.subscribeToPageChange();
        this._selectedIndex.next(0);
      }
    });
  }
}