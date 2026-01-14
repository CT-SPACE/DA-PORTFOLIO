import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './shared/footer/footer';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, TranslateModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private translate = inject(TranslateService);

  constructor() {
    const savedLang = window.localStorage.getItem('lang');
    const lang = savedLang === 'de' || savedLang === 'en' ? savedLang : 'de';
    this.translate.setFallbackLang('de');
    this.translate.use(lang);
  }
}
