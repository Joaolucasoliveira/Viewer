import { Injectable, OnInit } from '@angular/core'
import { Page } from './page'
import { File } from './file'
import * as pdfjsLib from 'pdfjs-dist'
pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/pdf.worker.min.js';

@Injectable({
  providedIn: "root"
})
export class PageRendererService implements OnInit {
  constructor() {

  }

  ngOnInit() {
    pdfjsLib.GlobalWorkerOptions.isWorkerDisabled = true;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/pdf.worker.min.js';
  }

  renderDocument(file: File): Page[] {
    var loadingTask = pdfjsLib.getDocument(file.data);
    loadingTask.promise.then(function (pdf) {
      console.log("On est arrivé ici");
    });

    //Build the pages objects based on the file.
    return [{ pageNumber: 1, thumbnailData: "", data: file.data }];
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