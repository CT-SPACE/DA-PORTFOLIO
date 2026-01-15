import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, TranslateModule],
  providers: [Router],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  constructor(private router: Router) {}
  showFirst = true;
  copied = false;
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.showFirst = !this.showFirst;
    }, 500);
  }

  /**
   * Angular lifecycle hook called when the component is destroyed.
   */
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  /**
   * Scrolls the window to the top smoothly.
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Determines whether to hide the "Go to Top" button based on the current route.
   */
  get hideGoTop(): boolean {
  return this.router.url === '/privacy' || this.router.url === '/legal';
}


  copyEmail() {
    const A = 'christina.troitzsch';
    const B = 'web';
    const C = '.de';
    const email = `${A}@${B}${C}`;
    navigator.clipboard.writeText(email).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }
}
