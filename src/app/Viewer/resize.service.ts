import { Injectable } from '@angular/core'

@Injectable({ providedIn: "root" })
export class ResizeService {
  constructor() {

  }

  calculateZoomFit(height: number, width: number, containerHeight: number, containerWidth: number): number {

    let widthRatio = width / containerWidth;
    let heightRatio = height / containerHeight;

    return Math.min(widthRatio, heightRatio);
  }
}