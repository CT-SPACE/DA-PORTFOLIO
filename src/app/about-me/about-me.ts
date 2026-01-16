import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from '../shared/in-view.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectorRef } from '@angular/core';
import { request } from 'http';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, InViewDirective, TranslateModule],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe implements AfterViewInit {
  aboutmeContentRef: any;

  constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
    this.breakpointObserver
      .observe('(max-width: 800px)')
      .pipe(takeUntilDestroyed())
      .subscribe(({ matches }) => {
        this.inViewMobile = matches;
        this.cdr.markForCheck();
      });
  }

  visible = false;
  windowHeight = window.innerHeight - 100;
  @ViewChild('aboutmeContainer') aboutmeContainerRef!: ElementRef;
  public inViewMobile = false;

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Calculates the height of the about me container and sets the inViewMobile flag accordingly.
   */
  ngAfterViewInit() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = this.aboutmeContentRef?.nativeElement;
        if (el) {
          const height = el.scrollHeight;
          this.setInViewMobile(height);
        }
      });
    });
  }

  /**
   * Sets the inViewMobile flag based on the container's height compared to the window height.
   * @param containerHeight The height of the #aboutmeContainer.
   */
  setInViewMobile(containerHeight: number): void {
    setTimeout(() => {
      this.inViewMobile = this.windowHeight <= containerHeight;
    }, 100);
  }
}
