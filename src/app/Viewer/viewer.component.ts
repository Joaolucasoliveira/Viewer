import { Component, ViewChild, ElementRef, OnInit, Input, SimpleChanges } from '@angular/core';
import { File } from './file'
import { NavigationService } from './navigation.service'
import { ResizeService } from './resize.service'

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

  constructor(private navigationService: NavigationService, private resizeService: ResizeService) {

  }

  ngOnInit() {
    this.context = (<HTMLCanvasElement>this.canvasRef.nativeElement).getContext('2d');

    (<HTMLCanvasElement>this.canvasRef.nativeElement).width = (<HTMLDivElement>this.canvasWrapper.nativeElement).clientWidth;
    (<HTMLCanvasElement>this.canvasRef.nativeElement).height = (<HTMLDivElement>this.canvasWrapper.nativeElement).clientHeight;

    this.loadFiles(this.files);

    this.navigationService.selectedPage$.subscribe(page => {
      this.drawOnCanvas(page);
    });
  }

  loadFiles(files: File[]) {
    for (let i = 0; i < this.files.length; i++) {
      setTimeout(() => { this.navigationService.addFile(this.files[i]); }, 1000 * (5 * i))
    }
  }

  drawOnCanvas(page) {
    if (page != null) {
      var ctx = this.context;

      this.context.restore();
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      //this.context.restore();
      this.context.setTransform(1, 0, 0, 1, 0, 0);

      var image = new Image();
      image.src = page.data;
      image.onload = () => {

        let zoomValue = this.resizeService.calculateZoomFit((<HTMLCanvasElement>this.canvasRef.nativeElement).width, (<HTMLCanvasElement>this.canvasRef.nativeElement).height, image.width, image.height);

        this.context.scale(zoomValue, zoomValue);
        //(((<HTMLCanvasElement>this.canvasRef.nativeElement).width / 2))
        this.context.drawImage(image, 0, 0);

        this.context.save();
      }
    }
  }
}