import { Component, ViewChild, ElementRef, OnInit, Input, SimpleChanges, HostListener } from '@angular/core';
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
    let computedStyle = window.getComputedStyle((<HTMLDivElement>this.canvasWrapper.nativeElement), null);

    console.log(computedStyle.width, computedStyle.height);

    (<HTMLCanvasElement>this.canvasRef.nativeElement).width = parseInt(computedStyle.width);
    (<HTMLCanvasElement>this.canvasRef.nativeElement).height = parseInt(computedStyle.height);

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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateCanvasSize();
  }

  updateCanvasSize() {
    let computedStyle = window.getComputedStyle((<HTMLDivElement>this.canvasWrapper.nativeElement), null);

    console.log(computedStyle.width, computedStyle.height);

    (<HTMLCanvasElement>this.canvasRef.nativeElement).width = parseInt(computedStyle.width);
    (<HTMLCanvasElement>this.canvasRef.nativeElement).height = parseInt(computedStyle.height);

    this.drawOnCanvas(this.navigationService.pages[this.navigationService.selectedIndex]);
  }

  drawOnCanvas(page) {
    if (page != null) {
      var ctx = this.context;

      // Store the current transformation matrix
      ctx.restore();

      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      var image = new Image();
      image.src = page.data;
      image.onload = () => {

        let zoomValue = this.resizeService.calculateZoomFit(ctx.canvas.width, ctx.canvas.height, image.width, image.height);

        ctx.setTransform(zoomValue, 0, 0, zoomValue, ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);

        this.context.save();
      }
    }
  }
}