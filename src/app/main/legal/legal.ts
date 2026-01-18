import { Component, AfterViewInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal',
  standalone:true,
  imports: [ CommonModule, RouterLink, TranslateModule ],
  providers: [],
  templateUrl: './legal.html',
  styleUrls: ['./legal.scss', '../privacy-policy/privacy-policy.scss'],
})

export class LegalComponent implements AfterViewInit, OnDestroy {
  isOpen: boolean = false;

constructor(
    private renderer: Renderer2,
     @Inject(DOCUMENT) private document: Document
  ) {}

    /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   */
  ngAfterViewInit(): void {
 this.renderer.addClass(document.body, 'bodyNoScroll');
  }

    ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'bodyNoScroll');
  }

}
