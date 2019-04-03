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
  @ViewChild('canvasWrapper') canvasWrapper: ElementRef;
  context: CanvasRenderingContext2D;

  constructor(private navigationService: NavigationService) {

  }

  ngOnInit() {
    this.context = (<HTMLCanvasElement>this.canvasRef.nativeElement).getContext('2d');

    (<HTMLCanvasElement>this.canvasRef.nativeElement).width = (<HTMLDivElement>this.canvasWrapper.nativeElement).clientWidth;
    (<HTMLCanvasElement>this.canvasRef.nativeElement).height = (<HTMLDivElement>this.canvasWrapper.nativeElement).clientHeight;

    for (let i = 0; i < this.files.length; i++) {
      setTimeout(() => { this.navigationService.addFile(this.files[i]); }, 1000 * (5 * i))
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