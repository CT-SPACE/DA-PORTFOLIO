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
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('resizer') resizer!: ElementRef<HTMLSpanElement>;

  showPrivacyHint: boolean = false;
  emailValid: boolean = false;
  nameValid: boolean = false;
  messageValid: boolean = false;
  submitResultVisible: boolean = false;
  isSuccess: boolean = false;
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
  onTrySubmit(form: NgForm | null, event: Event) {
    event.preventDefault();
    const ngForm = form ?? this.contactForm;
    if (!ngForm) return;
    ngForm.control.markAllAsTouched();
    this.showPrivacyHint =
      !this.validateName(this.contactData.name) ||
      !this.validateEmail(this.contactData.email) ||
      !this.validateMessage(this.contactData.message) ||
      !this.privacyAccepted;
  }

  /**
   * Handles the actual form submission, sending data via HTTP if valid, and showing the result.
   * @param ngForm The Angular form object.
   * @param event The submit event.
   */
  onSubmit(ngForm: NgForm, event: Event): void {
    event.preventDefault();

    if (!this.canSubmit(ngForm)) {
      this.showSubmitResult(false); // Fehlerfall
      this.showPrivacyHint = !this.privacyAccepted;
      return;
    }

    this.showSubmitResult(true); // Erfolgsfall (wird ggf. von sendMail überschrieben)
    if (this.mailTest) {
      ngForm.resetForm();
      return;
    }

    this.sendMail(ngForm);
  }

  /**
   * Helper methode for onSubmit() to verifying if the email was sent or not.
   * @param ngForm
   */
  private sendMail(ngForm: NgForm): void {
    this.http
      .post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
      .subscribe({
        next: () => {
          this.showSubmitResult(true); // Erfolg
          ngForm.resetForm();
        },
        error: () => {
          this.showSubmitResult(false); // Fehler
        },
      });
  }

  /**
   * Validates if the form can be submitted.
   * @param ngForm
   * @returns
   */
  private canSubmit(ngForm: NgForm): boolean {
    if (!ngForm.valid || !ngForm.submitted) {
      ngForm.control.markAllAsTouched();
      return false;
    }
    return true;
  }

  /**
   * Displays the submit result and logs the contact data.
   */
  showSubmitResult(isSuccess: boolean): void {
    this.isSuccess = isSuccess;
    this.submitResultVisible = true;
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

  validateName(name: string): boolean {
    const cleaned = name.replace(/\s/g, '');
    this.nameValid = cleaned.length >= 2;
    return this.nameValid;
  }

  /**
   * Validates the message length (minimum 5 non-whitespace characters).
   * @param message The message string to validate.
   * @returns True if valid, false otherwise.
   */
  validateMessage(message: string): boolean {
    const cleaned = message.replace(/\s/g, '');
    this.messageValid = cleaned.length >= 5;
    return this.messageValid;
  }

  /**
   * Resizes the textarea on mobile devices by typing
   * @param event 
   */
  autoResize(event: Event) {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
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
