 import { Component, signal } from '@angular/core'

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  frames: string[] = ['assets/img/burger_1.svg', 'assets/img/burger_2.svg', 'assets/img/burger_3.svg', 'assets/img/burger_4.svg', 'assets/img/burger_5.svg'];
isOpen = signal(false);
isAnimating = signal(false);
currentIndex = signal(0);
currentSrc = signal(this.frames[0]);
selected: string | null = null;

select(choice: string) {
  this.selected = choice;
}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.preloadFrames();
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
