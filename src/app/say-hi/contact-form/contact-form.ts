import { Component, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrivacyService } from '../../shared/privacy.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  imports: [ TranslateModule, CommonModule, FormsModule, RouterModule, RouterLink],
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


  /**
   * Angular lifecycle hook called after component initialization.
   * Subscribes to privacy acceptance state.
   */
  ngOnInit(): void {
    this.privacyService.privacyAccepted$.subscribe((state: boolean) => {
      this.privacyAccepted = state;
    });
  }



  /**
   * Handles the form submission, sends data via HTTP if valid, and resets the form.
   * @param ngForm The Angular form object.
   */
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
    
  /**
   * Displays the submit result message and logs the contact data.
   */
  showSubmitResult(): void {
    const el = this.formContainerRef.nativeElement;
    el.innerHTML = `<div class="submit-result">
      <img src="assets/img/flieger.svg" alt="Nachricht gesendet" class="paper-plane" />
    <h3>Danke! Deine Nachricht wurde versandt.</h3></div>`;
  }

  /**
   * Toggles the privacy acceptance state.
   */
  onTogglePrivacyAcceptance(): void {
    this.privacyAccepted = !this.privacyAccepted;
  }

}