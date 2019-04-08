import { Injectable, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Page } from './page'
import { Document } from './document'
import { File } from './file'
import * as pdfjsLib from 'pdfjs-dist'
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.min.js';

@Injectable({
  providedIn: "root"
})
export class PageRendererService {

  constructor() {

  }

  renderDocument(file: File): Observable<Document> {

    const observable = new Observable<Document>((observer) => {
      var loadingTask = pdfjsLib.getDocument(file.data);

      loadingTask.promise.then(function (pdf) {
        let pageNumber = pdf.numPages;

        let pages: Page[] = [];
        for (let i = 0; i < pageNumber; i++) {

          //Effectue le chargement des pages.
          pages.push({ pageNumber: i + 1, thumbnailData: "", data: null });
        }

        observer.next({loadedFile: file, pages: pages});
      });
    });

    return observable;
  }

  renderPage(page: Page, file: File) {

    const observable = new Observable<Page>((observer) => {
      var loadingTask = pdfjsLib.getDocument(file.data);

      loadingTask.promise.then(function (pdf) {

        pdf.getPage(page.pageNumber).then(function (page) {
          
          var scale = 1; //I must pass the correct scale for better render quality.
          var viewport = page.getViewport({ scale: scale });

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
            let dataUri = canvas.toDataURL();

            page.thumbnailData = dataUri;
            page.data = dataUri;
            // observable execution
            observer.next(page);
            observer.complete();

            console.log("Rendered page")
          });
        });
      });
    });

    return observable;
  }

  generateThumbnails(pages: Page[], scale: number): Page[] {

    for (let i = 0; i < pages.length; i++) {
      pages[i].thumbnailData = pages[i].data;
    }

    return pages;
  }
}