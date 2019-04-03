import { Injectable } from '@angular/core'
import { Page } from './page'
import { File } from './file'

@Injectable({
  providedIn: "root"
})
export class PageRendererService {
  constructor() {

  }

  renderDocument(file: File): Page[] {
    //Build the pages objects based on the file.
    return [{ pageNumber: 1, thumbnailData: "", data: file.data }];

    //thumbnailData: "https://loremflickr.com/100/150", 
  }

  renderPage(page: Page) {

  }

  generateThumbnails(pages: Page[]): Page[] {

    for (let i = 0; i < pages.length; i++) {
      pages[i].thumbnailData = pages[i].data;
    }

    return pages;
  }
}