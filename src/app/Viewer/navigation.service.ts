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
  selectedIndex: number = -1;

  private _selected: BehaviorSubject<Page> = new BehaviorSubject(null);
  public selectedPage$ = this._selected.asObservable();

  private pages_changed: BehaviorSubject<Page[]> = new BehaviorSubject(null);
  public pages_changed$ = this.pages_changed.asObservable();

  private _selectedIndex: BehaviorSubject<number> = new BehaviorSubject(null);
  private selectedIndex_changed$ = this._selectedIndex.asObservable();

  renderSubscription;

  constructor(private pageRenderer: PageRendererService) {
    // this.selectedIndex_changed$.pipe(switchMap(f, i => {})).subscribe(() => {
    //   console.log("test");
    // });
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

    console.log("Chegou aqui");
    this._selectedIndex.next(pageIndex);
    // if (this.pages[pageIndex].data != null) {

    // }
    // else {

    //   // this.renderSubscription = this.pageRenderer.renderPage(this.pages[this.selectedIndex], this.documents[0].loadedFile); this.renderSubscription.subscribe(x => {
    //   //   console.log("arrived here");
    //   //   this._selected.next(x);
    //   // });

    //   //  if (this.renderSubscription != null) {
    //   //   this.renderSubscription.unsubscribe();
    //   // }
    // }
  }

  addFile(file: File) {
    this.pageRenderer.renderDocument(file).subscribe(document => {

      this.documents.push(document);

      for (let i = 0; i < document.pages.length; i++) {
        this.pages.push(document.pages[i]);
      }

      if (this.selectedIndex < 0) {
        if (this.renderSubscription == null) {
          this.renderSubscription = this.selectedIndex_changed$.pipe(debounceTime(500), tap(() => {
            console.log("Started Rendering");
          }), switchMap((val) => { return this.pageRenderer.renderPage(this.pages[val], this.documents[0].loadedFile); })).subscribe((page) => {
            this.pages[this.selectedIndex] = page;
            this._selected.next(page);
          });
        }
        this._selectedIndex.next(0);
      }

      this.pages_changed.next(this.pages);
    });
  }
}