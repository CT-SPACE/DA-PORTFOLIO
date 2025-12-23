import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {
  private privacyAccepted$ = new BehaviorSubject<boolean>(false);
  private legalContainer$ = new BehaviorSubject<boolean>(false);

  accept(): void {
    this.privacyAccepted$.next(true);
  }

  getAcceptance() {
    return this.privacyAccepted$.asObservable();
  }



openLegalContainer(): void {
  console.log('openLegalContainer aufgerufen');
  this.legalContainer$.next(true);
}

closeLegalContainer(): void {
  console.log('closeLegalContainer aufgerufen');
  setTimeout(() => {
    this.legalContainer$.next(false);
  }, 100);
}

  getState() {
    return this.legalContainer$.asObservable();
  }

 openLegalContainerAndScroll(targetId: string): void {
    this.openLegalContainer();
    
    // Schritt 1: Sofort scrollen
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      window.scrollTo({
        top: rect.top + scrollTop - 100,
        behavior: 'smooth'
      });
    }
    
    // Schritt 2: Nachkorrektur nach Animation
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        window.scrollTo({
          top: rect.top + scrollTop + 40,
          behavior: 'smooth'
        });
      }
    }, 1000);
  }

  switchToImpressum(): void {
  this.closeLegalContainer();
  setTimeout(() => {
    this.openLegalContainerAndScroll('legalAnker'); 
  }, 400); 
}

}
