import { Injectable, OnInit } from '@angular/core'
import { PageRendererService } from './page-renderer.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { switchMap, tap, map } from 'rxjs/operators';
import { Page } from './page'
import { File } from './file'

@Injectable({
  providedIn: "root"
})
export class NavigationService implements OnInit {
  pages: Page[] = [];
  documents: Document[] = [];
  selectedIndex: number = -1;

  private _selected: BehaviorSubject<Page> = new BehaviorSubject(null);
  public selectedPage$ = this._selected.asObservable();

  private pages_changed: BehaviorSubject<Page[]> = new BehaviorSubject(null);
  public pages_changed$ = this.pages_changed.asObservable();

  private _selectedIndex: BehaviorSubject<number> = new BehaviorSubject(null);
  private selectedIndex_changed$ = this._selectedIndex.asObservable();

  constructor(private pageRenderer: PageRendererService) {
    this.selectedIndex_changed$.pipe(switchMap(val => {
      console.log("arrived here");
      return this.pageRenderer.renderPage(this.pages[val], this.documents[0].loadedFile);
      
    })).subscribe(() => { console.log("arrived here") });
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

    this._selectedIndex.next(pageIndex);
    // this.selectedIndex = pageIndex;

    // if(this.pages[pageIndex].data != null){
    //   this._selected.next(this.pages[pageIndex]);
    // }
    // else{

    // }
  }

  addFile(file: File) {
    this.pageRenderer.renderDocument(file).subscribe(document => {

      this.documents.push(document);

      for (let i = 0; i < document.pages.length; i++) {
        this.pages.push(document.pages[i]);
      }

      if (this.selectedIndex < 0) {
        this._selectedIndex.next(0);
      }

      this.pages_changed.next(this.pages);
    });
  }

  ngOnInit() {
    console.log("init service");

  }
}