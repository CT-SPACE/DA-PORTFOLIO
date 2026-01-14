import { Component, AfterViewInit } from '@angular/core';
import { InViewDirective } from '../shared/in-view.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [InViewDirective, TranslateModule],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe implements AfterViewInit {
  visible = false;
  windowHeight = window.innerHeight - 100;
  @ViewChild('aboutmeContainer') aboutmeContainerRef!: ElementRef;
  public inViewMobile = true;


  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Calculates the height of the about me container and sets the inViewMobile flag accordingly.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.aboutmeContainerRef && this.aboutmeContainerRef.nativeElement) {
        const aboutmeHeight = this.aboutmeContainerRef.nativeElement.offsetHeight;
        this.setInViewMobile(aboutmeHeight);
      }
    });
  }

  /**
   * Sets the inViewMobile flag based on the container's height compared to the window height.
   * @param containerHeight The height of the about me container.
   */
  setInViewMobile(containerHeight: number): void {
    this.inViewMobile = containerHeight < this.windowHeight;
  }
}