import { Component, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrivacyService } from '../shared/privacy.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-say-hi',
  imports: [TranslateModule, CommonModule, FormsModule, RouterModule, RouterLink],
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
  @ViewChild('contactForm') contactForm!: NgForm;
  showPrivacyHint: boolean = false;
  emailValid: boolean = false;
  submitResultVisible: boolean = false;
  mailTest: boolean = false;
  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: '',
  };
  post = {
    endPoint: 'https://www.troitzsch.de/contactMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: { 'Content-Type': 'text/plain', responseType: 'text' },
    },
  };
  saved = localStorage.getItem('contactData');

  constructor(private privacyService: PrivacyService) {}

  /**
   * Angular lifecycle hook called after component initialization.
   * Subscribes to privacy acceptance and loads saved contact data from localStorage.
   */
  ngOnInit(): void {
    this.privacyService.privacyAccepted$.subscribe((state: boolean) => {
      this.privacyAccepted = state;
    });
    if (this.saved) {
      try {
        const parsed = JSON.parse(this.saved);
        if (
          parsed &&
          typeof parsed === 'object' &&
          'name' in parsed &&
          'email' in parsed &&
          'message' in parsed
        ) {
          this.contactData = parsed;
        }
      } catch (e) {}
    }
  }

  /**
   * Saves the current contact data to localStorage whenever it changes.
   */
  onContactDataChange() {
    localStorage.setItem('contactData', JSON.stringify(this.contactData));
  }

  /**
   * Handles the attempt to submit the form, marking all fields as touched and showing privacy hint if needed.
   * @param event The submit event.
   */
  onTrySubmit(event: Event) {
    event.preventDefault();
    this.contactForm.control.markAllAsTouched();
    this.showPrivacyHint = !this.privacyAccepted || !this.contactForm.valid;
  }

  /**
   * Handles the actual form submission, sending data via HTTP if valid, and showing the result.
   * @param ngForm The Angular form object.
   * @param event The submit event.
   */
  onSubmit(ngForm: NgForm, event: Event): void {
    event.preventDefault();
    this.showSubmitResult();
    if (ngForm.valid && ngForm.submitted && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
        .subscribe({
          next: (response) => {
            this.showSubmitResult();
            ngForm.resetForm();
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
          complete: () => {
            console.info('Send post completed successfully.');
          },
        });
    } else if (ngForm.submitted && ngForm.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }

  /**
   * Displays the submit result and logs the contact data.
   */
  showSubmitResult(): void {
    this.submitResultVisible = true;
    console.log('Form submitted:', this.contactData);
  }

  /**
   * Toggles the privacy acceptance state.
   */
  onTogglePrivacyAcceptance(): void {
    this.privacyAccepted = !this.privacyAccepted;
  }

  /**
   * Validates the email format.
   * @param email The email string to validate.
   * @returns True if valid, false otherwise.
   */
  validateEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  /**
   * Validates the message length (minimum 5 non-whitespace characters).
   * @param message The message string to validate.
   * @returns True if valid, false otherwise.
   */
  validateMessage(message: string): boolean {
    const cleaned = message.replace(/\s/g, '');
    return cleaned.length >= 5;
  }

  /**
   * Resets the form and hides the submit result, also clears privacy acceptance and contact data.
   */
  resetFormAndHideResult(): void {
    this.submitResultVisible = false;
    this.privacyAccepted = false;
    this.contactData = { name: '', email: '', message: '' };

    localStorage.removeItem('contactData');
    if (this.contactForm) {
      this.contactForm.resetForm();
    }
  }
}
