import { Component } from '@angular/core';
import { SayHi } from '../../say-hi/say-hi';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
export class PrivacyPolicy {
  constructor(
    private router: Router,
    private privacyService: PrivacyService,
  ) {}

  opened: boolean = false;

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   */
  ngAfterViewInit(): void {
    console.log('PrivacyPolicy ngAfterViewInit called');
  }

  /**
   * Navigates to the main page.
   */
  goToMain(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navigates to the legal (impressum) page.
   */
  goToImpressum(): void {
    this.router.navigate(['/legal']);
  }

  /**
   * Handles the event when privacy is accepted and closes the dialog.
   */
  onCloseAccepted(): void {
    console.log('onCloseAccepted called - current state', this.opened);
    this.goToMain();
    this.privacyService.accept();
  }
}
