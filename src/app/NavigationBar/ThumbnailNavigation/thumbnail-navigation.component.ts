import { Component } from '@angular/core'
import { NavigationService } from '../../Viewer/navigation.service'

@Component({
  templateUrl: './thumbnail-navigation.component.html',
  selector: 'app-thumbnailNav',
  styleUrls: ['./thumbnail-navigation.component.css']
})
export class ThumbnailNavigationComponent {

  constructor(private navigationService: NavigationService) {

  }
  
  handleThumbnailClick(page) {
    this.navigationService.goToPage(page);
  }

  scroll(){
    
  }
}