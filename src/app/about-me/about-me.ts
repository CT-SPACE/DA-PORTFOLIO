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

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.aboutmeContainerRef && this.aboutmeContainerRef.nativeElement) {
        const aboutmeHeight = this.aboutmeContainerRef.nativeElement.offsetHeight;
        this.setInViewMobile(aboutmeHeight);
      }
    });
  }

  setInViewMobile(containerHeight: number): void {
    // Wenn das Element höher als das Fenster ist, deaktiviere inView
    this.inViewMobile = containerHeight < this.windowHeight;
  }
}