import { Component, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrivacyService } from '../../shared/privacy.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  imports: [ CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {



 privacyAccepted: boolean = false;
  privacyOpened: boolean = false;
  activeId: string | null = null;
  @ViewChild('formContainerRef') formContainerRef!: ElementRef<HTMLButtonElement>;

  mailTest: boolean = true;
  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: '',
  };
  post = {
    endPoint: 'https://www.troitzsch.de/contactMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options:{
      headers: { 'Content-Type': 'text/plain',
      responseType: 'text',
       },
  },
};

   constructor(private privacyService: PrivacyService) {}


  ngOnInit(): void {
    this.privacyService.privacyAccepted$.subscribe((state: boolean) => {
      this.privacyAccepted = state;
    });
  }



  onSubmit(ngForm: NgForm): void {
    if (ngForm.valid && ngForm.submitted && !this.mailTest){
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
      .subscribe({
        next: (response) => {
          ngForm.resetForm();
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
        complete:() => {
          console.info('Send post completed successfully.');
        }
        });
      } else if (ngForm.submitted && ngForm.valid && this.mailTest) {
        ngForm.resetForm();
      }
    }
    
  showSubmitResult(): void {
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