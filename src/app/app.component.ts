import { Component, OnInit } from '@angular/core';
import { File } from './Viewer/file';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';
  mockFiles: File[];

  ngOnInit() {
    this.mockFiles = [{ mimeType: "img/png", fileName: "", data: "https://dummyimage.com/300x400/000/c1c1c1" }, { mimeType: "img/png", fileName: "", data: "https://dummyimage.com/600x400/000/c1c1c1" }];
  }

  handleFileSelect() {

  }
}
