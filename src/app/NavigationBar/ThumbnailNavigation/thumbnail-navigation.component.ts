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

    return elemTop >= 0 && (elemBottom <= window.innerHeight);
  }

  ngOnInit() {
    this.navigationService.selectedPage$.subscribe((page) => {

      try {
        let element = this.document.getElementById("thumbId" + (page.pageNumber - 1));

        if (!this.isScrolledIntoView(element))
          this.scroll(element, true);
      }
      catch (e) {
        console.log(e);
      }
    });
  }
}