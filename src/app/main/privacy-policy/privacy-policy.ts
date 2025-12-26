import { Component} from '@angular/core';
import { SayHi} from '../../say-hi/say-hi';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrivacyService } from '../../shared/privacy.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicy {
    // public privacyService = inject(PrivacyService);
    constructor(private router: Router, private privacyService: PrivacyService) {
  }

    // sayHi = new SayHi();


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
    // this.sayHi.privacyAccepted = true;
    this.goToMain();
    this.privacyService.accept();
    // this.privacyService.closeLegalContainer();
  }
}
