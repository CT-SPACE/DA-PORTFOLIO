import { Component, ElementRef, ViewChild } from '@angular/core';
import { Footer } from "./footer/footer";
import { PrivacyPolicy } from "./privacy-policy/privacy-policy";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-say-hi',
  imports: [Footer, PrivacyPolicy, CommonModule, FormsModule],
  templateUrl: './say-hi.html',
  styleUrls: ['./say-hi.scss'],
})
export class SayHi {
privacyAccepted: boolean = false;
privacyOpened: boolean = false;
activeId: string | null = null;
@ViewChild('formContainerRef') formContainerRef!: ElementRef<HTMLDivElement>;

contactData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(): void {
    const el = this.formContainerRef.nativeElement;
    el.innerHTML = `<div class="submit-result">
      <img src="assets/img/flieger.svg" alt="Nachricht gesendet" class="paper-plane" />
    <h3>Danke! Deine Nachricht wurde versandt.</h3></div>`;
 
    console.log('Form submitted:', this.contactData);
  }

onTogglePrivacyAcceptance(): void {
    this.privacyAccepted = !this.privacyAccepted;
  }

openPrivacyPolicy(): void {
    // this.onTogglePrivacyAcceptance();
    this.privacyOpened = true;

  }

  closePrivacyPolicy(): void {
    this.privacyOpened = false;
  }

 onPrivacyAccepted(): void {
    this.privacyAccepted = true;
    this.privacyOpened = false;
  }


}
