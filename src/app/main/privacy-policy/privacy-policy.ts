import { SayHi } from '../../say-hi/say-hi';
import { Renderer2,  Inject, OnDestroy, AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { PrivacyService } from '../../shared/privacy.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy implements AfterViewInit, OnDestroy{
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private privacyService: PrivacyService,
     @Inject(DOCUMENT) private document: Document
  ) {}

  opened: boolean = false;

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   */
  ngAfterViewInit(): void {
 this.renderer.addClass(document.body, 'bodyNoScroll');
  }


  /**
   * Navigates to the main page and scrolls down to SayHi-Section.
   */
  goToMainAndScrollToSayhi(): void {
        this.router.navigate(['/']).then(() => {
      setTimeout(() => {
      const el = document.getElementById('sayhiAnchor');
      if (el) {
        el.scrollIntoView({ behavior: 'auto' }); 
      }
    }, 100);
  });
  }


  /**
   * Navigates to the legal (impressum) page.
   */
  goToImpressum(): void {
    this.router.navigate(['/legal']);
  }

  /**
   * Handles the event when privacy is accepted and closes the dialog.
   * Return to SayHi section on main page.
   */
  onCloseAccepted(): void {
    this.goToMainAndScrollToSayhi();
    this.privacyService.accept();
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'bodyNoScroll');
  }

}
