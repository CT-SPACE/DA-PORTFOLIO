import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './shared/footer/footer';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, TranslateModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private translate = inject(TranslateService);
  isOpen = false;

  constructor(private router: Router) {
    const savedLang = window.localStorage.getItem('lang');
    const lang = savedLang === 'de' || savedLang === 'en' ? savedLang : 'de';
    this.translate.setFallbackLang('de');
    this.translate.use(lang);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOpen =
          event.urlAfterRedirects === '/legal' || event.urlAfterRedirects === '/privacy';
      });
  }
}
