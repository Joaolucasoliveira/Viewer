import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { File } from './file'
import { NavigationService } from './navigation.service'

@Component({
  selector: "app-viewer",
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  @Input() files: File[] = []
  @ViewChild('canvasDoc') canvasRef: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor(private navigationService: NavigationService) {

  }

  ngOnInit() {
    this.context = (<HTMLCanvasElement>this.canvasRef.nativeElement).getContext('2d');

    for (let i = 0; i < this.files.length; i++) {
      this.navigationService.addFile(this.files[i]);
    }

    this.navigationService.selectedPage$.subscribe(page => {
      this.drawOnCanvas(page);
    });
  }

  drawOnCanvas(page) {
    if (page != null) {
      var ctx = this.context;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      var image = new Image();
      image.src = page.data;
      image.onload = () => {
        this.context.drawImage(image, 0, 0);
      }
    }
  }
}