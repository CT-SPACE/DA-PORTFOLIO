import { Component, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { Footer } from './footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { PrivacyService } from '../shared/privacy.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-say-hi',
  imports: [Footer, RouterLinkActive, RouterOutlet, RouterLink, CommonModule, FormsModule],
  standalone: true,
  providers: [],
  templateUrl: './say-hi.html',
  styleUrls: ['./say-hi.scss'],
})
export class SayHi implements OnInit {
  privacyAccepted: boolean = false;
  privacyOpened: boolean = false;
  public privacyService = inject(PrivacyService);
  activeId: string | null = null;
  @ViewChild('formContainerRef') formContainerRef!: ElementRef<HTMLButtonElement>;

  contactData = {
    name: '',
    email: '',
    message: '',
  };


  constructor() {
    this.privacyService
      .getState()
      .pipe(takeUntilDestroyed())
      .subscribe(state => { 
        this.privacyOpened = state;
              console.log('SayHi - privacyOpened state:', state); // ← Debug-Log

      }); 

    this.privacyService
      .getAcceptance()
      .pipe(takeUntilDestroyed())
      .subscribe(accepted => {
        this.privacyAccepted = accepted;
      });
  }

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


ngOnInit(): void {
    // Initial load of acceptance state
}
}
