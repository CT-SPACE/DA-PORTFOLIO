import { Component, signal, ViewChild } from '@angular/core';
import { Menu } from '../header/menu/menu';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [Menu, CommonModule, TranslateModule, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private translate: TranslateService) {}
  frames: string[] = [
    'assets/img/burger_1.svg',
    'assets/img/burger_2.svg',
    'assets/img/burger_3.svg',
    'assets/img/burger_4.svg',
    'assets/img/burger_5.svg',
  ];
  isOpen = signal(false);
  windowWidth = signal(window.innerWidth);
  isAnimating = signal(false);
  currentIndex = signal(0);
  currentSrc = signal(this.frames[0]);
  selected = signal<'de' | 'en'>('de');
  @ViewChild(Menu) menu!: Menu;

  /**
   * Selects the language and updates the translation service and local storage.
   * @param choice The selected language ('de' or 'en').
   */
  select(choice: 'de' | 'en') {
    this.selected.set(choice);
    this.translate.use(choice);

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('lang', choice);
      } catch {}
    }
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   * Sets up resize event listener, preloads frames, and initializes language selection.
   */
  ngOnInit() {
    window.addEventListener('resize', () => this.windowWidth.set(window.innerWidth));
    this.preloadFrames();

    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('lang');
      const lang: 'de' | 'en' =
        saved === 'de' || saved === 'en'
          ? saved
          : (navigator.languages?.[0] ?? navigator.language ?? 'de').startsWith('de')
          ? 'de'
          : 'en';

      this.selected.set(lang);
      this.translate.use(lang);
    }
  }

  /**
   * Toggles the menu open/close state with animation and updates the menu accordingly.
   */
   onToggleMenu(): void {
    if (this.isAnimating()) return;
    this.isAnimating.set(true);

    const forward = !this.isOpen();
    if (forward) {
      this.isOpen.set(true);
    }

    this.playBurgerSequence(forward);
  }

  private playBurgerSequence(forward: boolean): void {
    const sequence = forward ? [0, 1, 2, 3, 4] : [4, 3, 2, 1, 0];
    const stepMs = 120;
    const totalMs = sequence.length * stepMs;

    this.startFrameTimer(sequence, stepMs, forward);

    if (!forward) {
      setTimeout(() => this.menu.onClose(), totalMs);
    }
  }

  private startFrameTimer(sequence: number[], stepMs: number, forward: boolean): void {
    let i = 0;
    const timer = setInterval(() => {
      const idx = sequence[i];
      this.currentIndex.set(idx);
      this.currentSrc.set(this.frames[idx]);
      i++;

      if (i >= sequence.length) {
        clearInterval(timer);
        if (!forward) {
          this.isOpen.set(false);
          this.menu.onClose();
        }
        this.isAnimating.set(false);
      }
    }, stepMs);
  }

  /**
   * Preloads all frame images for the menu animation.
   */
  private preloadFrames() {
    for (const src of this.frames) {
      const img = new Image();
      img.src = src;
    }
  }
}
