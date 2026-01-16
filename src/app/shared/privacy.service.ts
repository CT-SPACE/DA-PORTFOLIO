import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrivacyService {
  private privacyAcceptedSubject$ = new BehaviorSubject<boolean>(false);
  public privacyAccepted$ = this.privacyAcceptedSubject$.asObservable();

  private legalContainer$ = new BehaviorSubject<boolean>(false);

  accept(): void {
    this.privacyAcceptedSubject$.next(true);
  }

  getAcceptance() {
    return this.privacyAccepted$;
  }

  openLegalContainer(): void {
    this.legalContainer$.next(true);
  }

  closeLegalContainer(): void {
    setTimeout(() => {
      this.legalContainer$.next(false);
    }, 100);
  }

  getState() {
    return this.legalContainer$.asObservable();
  }

  openLegalContainerAndScroll(targetId: string): void {
    this.openLegalContainer();
    this.scrollToTarget(targetId, -100);
    setTimeout(() => this.scrollToTarget(targetId, 40), 1000);
  }

  private scrollToTarget(targetId: string, offset: number): void {
    const el = document.getElementById(targetId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.scrollTo({
      top: rect.top + scrollTop + offset,
      behavior: 'smooth',
    });
  }

  switchToImpressum(): void {
    this.closeLegalContainer();
    setTimeout(() => {
      this.openLegalContainerAndScroll('legalAnker');
    }, 400);
  }
}
