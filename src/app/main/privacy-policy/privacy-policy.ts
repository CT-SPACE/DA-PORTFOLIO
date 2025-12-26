import { Component, inject, AfterViewInit } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { PrivacyService } from '../../shared/privacy.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicy {
    // public privacyService = inject(PrivacyService);
    // constructor(private router: Router, public privacyService: PrivacyService) {
    constructor (private router: Router) {}


   opened: boolean = false;

   ngAfterViewInit(): void {
    console.log('PrivacyPolicy ngAfterViewInit called');
  }

  goToMain(): void {
    this.router.navigate(['/']);
  }

  goToImpressum(): void {
    this.router.navigate(['/legal']);
  }

    ngOnInit(): void {
    // this.privacyService.getState().subscribe((state: boolean) => {
    //   this.opened = state;
    // });
  }

  onCloseAccepted(): void {
    console.log('onCloseAccepted called - current state', this.opened);
    // this.privacyService.accept();
    // this.privacyService.closeLegalContainer();
  }
}
