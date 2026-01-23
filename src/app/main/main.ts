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

   /**
   * Starts the hover animation for the arrow image by cycling through frames.
   * @param target The event target, expected to be an HTMLImageElement.
   */
startArrowHover(target: EventTarget | null): void {
  const img = target as HTMLImageElement;
  if (!img) return;

  const frames = this.prepareArrowFrames(img);
  this.runArrowAnimation(img, frames, 220);
}

/**
 * Helper method to prepare arrow animation frames.
 * @param img 
 * @returns 
 */
private prepareArrowFrames(img: HTMLImageElement): string[] {
  const frames = [
    img.dataset['frame1'] || 'assets/img/spacer-arrow_1.svg',
    img.dataset['frame2'] || 'assets/img/spacer-arrow_2.svg',
    img.dataset['frame3'] || 'assets/img/spacer-arrow_3.svg',
  ];

  frames.forEach((src) => {
    const preload = new Image();
    preload.src = src;
  });

  img.src = frames[0];
  return frames;
}

/**
 * Helper method to run arrow animation.
 * @param img 
 * @param frames 
 * @param intervalMs 
 */
private runArrowAnimation(img: HTMLImageElement, frames: string[], intervalMs: number): void {
  let index = 0;
  const animate = () => {
    if (index < frames.length) {
      img.src = frames[index];
      index++;
      setTimeout(animate, intervalMs);
    }
  };
  animate();
}


  /**
   * Stops the hover animation for the arrow image and resets to the first frame.
   * @param target The event target, expected to be an HTMLImageElement.
   */
stopArrowHover(target: EventTarget | null): void {
  const img = target as HTMLImageElement;
  if (!img) return;
  img.src = img.dataset['frame1'] || 'assets/img/spacer-arrow_1.svg';
}

}
