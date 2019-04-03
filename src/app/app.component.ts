import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationService } from './Viewer/navigation.service';
import { File } from './Viewer/file';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';
  mockFiles: File[];

  constructor(private cd: ChangeDetectorRef, private navigationService: NavigationService) {

  }

  ngOnInit() {
    this.mockFiles = [{ mimeType: "img/png", fileName: "", data: "https://dummyimage.com/300x400/000/c1c1c1" }, { mimeType: "img/png", fileName: "", data: "https://dummyimage.com/600x400/000/c1c1c1" }];
  }

  handleFileSelect($event) {

    if ($event.target.files[0]) {
      console.log($event.target.files[0]);

      let file = new FileReader();
      file.onload = (evt) => {

        let result = evt.target.result;

        let file = { mimeType: "img/png", fileName: "", data: result }

        //this.mockFiles.push(file);
        //this.cd.detectChanges();
        this.navigationService.addFile(file);
      };

      file.readAsDataURL($event.target.files[0]);
    }
  }
}
