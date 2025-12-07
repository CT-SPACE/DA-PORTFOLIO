import { Component, signal } from '@angular/core'
import { Menu } from '../header/menu/menu';

@Component({
  selector: 'app-header',
  imports: [Menu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  frames: string[] = ['assets/img/burger_1.svg', 'assets/img/burger_2.svg', 'assets/img/burger_3.svg', 'assets/img/burger_4.svg', 'assets/img/burger_5.svg'];
isOpen = signal(false);
isAnimating = signal(false);
currentIndex = signal(0);
currentSrc = signal(this.frames[0]);
selected = signal<'DE' | 'EN'>('DE');

select(choice: 'DE' | 'EN') {
  this.selected.set(choice);
  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem('lang', choice); } catch {}
  }
}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.preloadFrames();
      const saved = window.localStorage.getItem('lang');
      if (saved === 'DE' || saved === 'EN') {
        this.selected.set(saved as 'DE' | 'EN');
      } else {
        const locale = navigator.languages?.[0] ?? navigator.language ?? 'en';
        const lower = locale.toLowerCase();
        this.selected.set(lower.startsWith('de') ? 'DE' : 'EN');
      }
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
  }

  private preloadFrames() {
    for (const src of this.frames) {
      const img = new Image();
      img.src = src;
    }
  }
}
