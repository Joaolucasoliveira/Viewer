import { Injectable, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
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

  renderDocument(file: File): Observable<Page[]> {

    const simpleObservable = new Observable<Page[]>((observer) => {
      var loadingTask = pdfjsLib.getDocument(file.data);
      loadingTask.promise.then(function (pdf) {
        let pageNumber = pdf.numPages;

        let pages: Page[] = [];
        for (let i = 0; i < pageNumber; i++) {
 pages.push({ pageNumber: 1, thumbnailData: "", data: file.data });
          pdf.getPage(i + 1).then(function (page) {
          var scale = 1.5;
          var viewport = page.getViewport(scale, 0);

          // Prepare canvas using PDF page dimensions.
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context.
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
pages[i].thumbnailData = canvas.toDataURL()
            // observable execution
        observer.next(pages);
        observer.complete()
            //console.log()
          });
        })
         
        }
        
        
      });
    });

    return simpleObservable;
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