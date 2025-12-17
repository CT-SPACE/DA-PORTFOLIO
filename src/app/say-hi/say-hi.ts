import { Component } from '@angular/core';
import { Footer } from "./footer/footer";


@Component({
  selector: 'app-say-hi',
  imports: [Footer],
  templateUrl: './say-hi.html',
  styleUrl: './say-hi.scss',
})
export class SayHi {
privacyAccepted: boolean = false;

onTogglePrivacyAcceptance(): void {
    this.privacyAccepted = !this.privacyAccepted;
  }

openPrivacyPolicy(): void {
   this.onTogglePrivacyAcceptance();
    window.open('/shared/privacy-policy.html', '_blank');
  }

}
