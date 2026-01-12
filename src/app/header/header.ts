import { Component, signal, ViewChild } from '@angular/core'
import { Menu } from '../header/menu/menu';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [Menu, CommonModule, TranslateModule, TranslatePipe ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
 constructor(private translate: TranslateService) {
  // if (typeof window !== 'undefined') {
  //   const saved = window.localStorage.getItem('lang');
  //   if (saved) {
  //     this.translate.use(saved);
  //   }
  // }
};
  frames: string[] = ['assets/img/burger_1.svg', 'assets/img/burger_2.svg', 'assets/img/burger_3.svg', 'assets/img/burger_4.svg', 'assets/img/burger_5.svg'];
isOpen = signal(false);
windowWidth = signal(window.innerWidth);
isAnimating = signal(false);
currentIndex = signal(0);
currentSrc = signal(this.frames[0]);
selected = signal < 'de' | 'en' > ('de');
@ViewChild(Menu) menu!: Menu;


select(choice: 'de' | 'en') {
  this.selected.set(choice);
  this.translate.use(choice);

  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem('lang', choice); } catch {}
  }
}


  ngOnInit() {
  window.addEventListener('resize', () => this.windowWidth.set(window.innerWidth));
  this.preloadFrames();

  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem('lang');
    const lang: 'de' | 'en' =
      saved === 'de' || saved === 'en'
        ? saved
        : (navigator.languages?.[0] ?? navigator.language ?? 'de').startsWith('de') ? 'de' : 'en';

    this.selected.set(lang);
    this.translate.use(lang);
  }
}

  onToggleMenu(): void {
    if (this.isAnimating()) return;
    this.isAnimating.set(true);
    const forward = !this.isOpen();
    this.isOpen.set(!this.isOpen());
    const sequence = forward ? [0,1,2,3,4] : [4,3,2,1,0] ;
    let i = 0;
    const stepMs = 120;
    const timer = setInterval(() => {
      const idx = sequence[i];
      this.currentIndex.set(idx);
      this.currentSrc.set(this.frames[idx]);
      i++;
      if (i >= sequence.length) {
        clearInterval(timer);
        this.isOpen.set(forward);
        this.isAnimating.set(false);
      }
    }, stepMs);
    if (!forward){
      this.menu.onClose();
   }
  }

  private preloadFrames() {
    for (const src of this.frames) {
      const img = new Image();
      img.src = src;
    }
  }
}
