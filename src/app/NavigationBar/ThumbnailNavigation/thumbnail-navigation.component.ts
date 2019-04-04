import { Component, OnChanges, OnInit, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common';
import { NavigationService } from '../../Viewer/navigation.service'

@Component({
  templateUrl: './thumbnail-navigation.component.html',
  selector: 'app-thumbnailNav',
  styleUrls: ['./thumbnail-navigation.component.css']
})
export class ThumbnailNavigationComponent implements OnInit {

  document: any;

  constructor(private navigationService: NavigationService, @Inject(DOCUMENT) document) {
    this.document = document;
  }

  handleThumbnailClick(page, el) {
    this.navigationService.goToPage(page);
    // var target = event.target || event.srcElement || event.currentTarget;
    // this.scroll(target, true);
  }

  scroll(el, selected: boolean) {
    if (selected) {
      el.scrollIntoView();
    }
  }

  isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    console.log(rect);
    // Only completely visible elements return true:
    return elemTop >= 0 && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //return elemTop < window.innerHeight && elemBottom >= 0;
  }

  ngOnInit() {
    this.navigationService.selectedPage$.subscribe((page) => {

      try {
        let element = this.document.getElementById("thumbId" + (page.pageNumber - 1));
        console.log("thumbId" + (page.pageNumber - 1));
        console.log(element);

        if (!this.isScrolledIntoView(element))
          this.scroll(element, true);
      }
      catch (e) {
        console.log(e);
      }

      // this.scroll(element, true);
    });
  }
}