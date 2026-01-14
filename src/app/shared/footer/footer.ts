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

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
