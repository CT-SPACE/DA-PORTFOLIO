import { Component, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrivacyService } from '../shared/privacy.service';
import { HttpClient } from '@angular/common/http';
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
@ViewChild('contactForm') contactForm!: NgForm;
   showPrivacyHint: boolean = false;
   emailValid: boolean = false;
    submitResultVisible: boolean = false; 
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
saved = localStorage.getItem('contactData');


   constructor(private privacyService: PrivacyService) {}


  ngOnInit(): void {
    this.privacyService.privacyAccepted$.subscribe((state: boolean) => {
      this.privacyAccepted = state;
    });
  if (this.saved) {
    this.contactData = JSON.parse(this.saved);
  }
  }

onContactDataChange() {
  localStorage.setItem('contactData', JSON.stringify(this.contactData));
}


onTrySubmit(event: Event) {
    event.preventDefault();
  this.contactForm.control.markAllAsTouched();
  this.showPrivacyHint = !this.privacyAccepted || !this.contactForm.valid;
}


  onSubmit(ngForm: NgForm,event: Event): void {
    event.preventDefault();
     this.showSubmitResult();
    if (ngForm.valid && ngForm.submitted && !this.mailTest){
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
      .subscribe({
        next: (response) => {
          this.showSubmitResult();
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
    this.submitResultVisible = true;
    console.log('Form submitted:', this.contactData);
  }

  onTogglePrivacyAcceptance(): void {
    this.privacyAccepted = !this.privacyAccepted;
  }

  validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

resetFormAndHideResult(): void {
this.submitResultVisible = false;
this.privacyAccepted = false;
  localStorage.removeItem('contactData');
}


}
