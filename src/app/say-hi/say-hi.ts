import { Component, ElementRef, ViewChild, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrivacyService } from '../shared/privacy.service';

import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-say-hi',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  standalone: true,
  providers: [],
  templateUrl: './say-hi.html',
  styleUrls: ['./say-hi.scss'],
})


export class SayHi implements OnInit {
  privacyAccepted: boolean = false;
  privacyOpened: boolean = false;
  activeId: string | null = null;
  @ViewChild('formContainerRef') formContainerRef!: ElementRef<HTMLButtonElement>;
footerVisible: boolean = false;

  contactData = {
    name: '',
    email: '',
    message: '',
  };


   constructor(private privacyService: PrivacyService) {}


  ngOnInit(): void {
    // Make sure your PrivacyService has a property or observable to subscribe to.
    // If it is privacyAccepted$ (as implied by your accept() method), use that:
    this.privacyService.privacyAccepted$.subscribe((state: boolean) => {
      this.privacyAccepted = state;
    });
  }


  onSubmit(ngForm: NgForm): void {
    if (ngForm.valid && ngForm.submitted){}

    const el = this.formContainerRef.nativeElement;
    el.innerHTML = `<div class="submit-result">
      <img src="assets/img/flieger.svg" alt="Nachricht gesendet" class="paper-plane" />
    <h3>Danke! Deine Nachricht wurde versandt.</h3></div>`;

    console.log('Form submitted:', this.contactData);
  }

  onTogglePrivacyAcceptance(): void {
    this.privacyAccepted = !this.privacyAccepted;
  }



}
