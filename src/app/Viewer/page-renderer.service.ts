import { Injectable, OnInit } from '@angular/core'
import { Page } from './page'
import { File } from './file'
import * as pdfjsLib from 'pdfjs-dist'
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.min.js';

@Injectable({
  providedIn: "root"
})
export class PageRendererService {
  constructor() {

  }

  renderDocument(file: File): Page[] {
    var loadingTask = pdfjsLib.getDocument(file.data);
    loadingTask.promise.then(function (pdf) {
      pdf.getPage(1).then(function (page) {
        var scale = 1.5;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions.
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context.
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      })
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