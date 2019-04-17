import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationControlsComponent } from './NavigationBar/NavigationControls/navigation-controls.component';
import { ThumbnailComponent } from './NavigationBar/Thumbnail/thumbnail.component';
import { NavigationBarComponent } from './NavigationBar/navigation-bar.component';
import { ViewerComponent } from './Viewer/viewer.component';
import { ThumbnailNavigationComponent } from './NavigationBar/ThumbnailNavigation/thumbnail-navigation.component'

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, NavigationControlsComponent, ThumbnailComponent, NavigationBarComponent, ViewerComponent, ThumbnailNavigationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
