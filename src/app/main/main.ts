import 'zone.js';
import { Component, signal } from '@angular/core';
import { Headline } from '../headline/headline';
import { AboutMe } from '../about-me/about-me';
import { MySkills } from '../my-skills/my-skills';
import { Portfolio } from '../portfolio/portfolio';
import { SayHi } from '../say-hi/say-hi';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  imports: [Headline, AboutMe, MySkills, Portfolio, SayHi, TranslateModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  protected readonly title = signal('DA-PORTFOLIO');

  private hoverTimers = new Map<HTMLImageElement, number>();
  private frameIndex = new Map<HTMLImageElement, number>();

  /**
   * Starts the hover animation for the arrow image by cycling through frames.
   * @param target The event target, expected to be an HTMLImageElement.
   */
  startArrowHover(target: EventTarget | null): void {
    const img = target as HTMLImageElement;
    if (!img) return;

    const frames = [
      img.dataset['frame1'] || 'assets/img/spacer-arrow_1.svg',
      img.dataset['frame2'] || 'assets/img/spacer-arrow_2.svg',
      img.dataset['frame3'] || 'assets/img/spacer-arrow_3.svg',
    ];

    // Preload
    frames.forEach((src) => {
      const i = new Image();
      i.src = src;
    });

    img.src = frames[0];
    this.frameIndex.set(img, 0);

    if (this.hoverTimers.has(img)) return;

    const intervalMs = 220;
    const id = window.setInterval(() => {
      const idx = ((this.frameIndex.get(img) || 0) + 1) % frames.length;
      this.frameIndex.set(img, idx);
      img.src = frames[idx];
    }, intervalMs);

    this.hoverTimers.set(img, id);
  }

  /**
   * Stops the hover animation for the arrow image and resets to the first frame.
   * @param target The event target, expected to be an HTMLImageElement.
   */
  stopArrowHover(target: EventTarget | null): void {
    const img = target as HTMLImageElement;
    if (!img) return;

    const id = this.hoverTimers.get(img);
    if (id) {
      clearInterval(id);
      this.hoverTimers.delete(img);
    }

    const first = img.dataset['frame1'] || 'assets/img/spacer-arrow_1.svg';
    img.src = first;
    this.frameIndex.delete(img);
  }

  /**
   * Scrolls the window smoothly to the bottom of the page.
   */
  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}
