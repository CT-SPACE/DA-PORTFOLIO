import { Component, HostBinding, Input } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  constructor(private vs: ViewportScroller, private router: Router) {}
  copied = false;
  @Input() isOpen = false;
  @HostBinding('class.open') get opened() {
    return this.isOpen && !this.isClosing;
  }
  @HostBinding('class.closing') isClosing = false;

  @HostBinding('attr.aria-hidden') get ariaHidden() {
    return String(!this.isOpen);
  }

  activeId: string | null = null;
  private headerHeightFallback = 50;

  /**
   * Toggles the menu item and scrolls to the given section. If on a legal/privacy page, navigates home first.
   * @param sectionId The ID of the section to scroll to.
   */
  async toggleMenuItem(sectionId: string): Promise<void> {
    this.activeId = sectionId;
    const currentUrl = this.router.url;
    if (currentUrl === '/legal' || currentUrl === '/privacy') {
      await this.router.navigate(['/']);
      setTimeout(() => this.scrollToSection(sectionId), 100);
    } else {
      this.scrollToSection(sectionId);
    }
  }

  /**
   * Scrolls smoothly to the specified section, accounting for header and menu height.
   * @param sectionId The ID of the section to scroll to.
   */
  private scrollToSection(sectionId: string): void {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerH = this.readPxVar('--header-h') ?? this.getHeaderHeight();
    const menuH = this.isOpen ? this.readPxVar('--menu-h') ?? this.getMenuHeight() : 0;

    const targetTop = window.scrollY + target.getBoundingClientRect().top;
    const top = targetTop - (headerH + menuH);
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /**
   * Closes the menu and scrolls to the active section if set, after the menu transition.
   */
  onClose(): void {
    if (!this.isOpen || this.isClosing) return;
    this.isClosing = true;

    const durationMs = this.getMenuTransitionMs();
    const finish = () => {
      this.isOpen = false;
      this.isClosing = false;
      this.scrollAfterClose();
    };

    durationMs > 0 ? setTimeout(finish, durationMs) : finish();
  }

  /**
   * Reads a CSS variable in px and returns its numeric value.
   * @param name The CSS variable name.
   * @returns The numeric value in pixels, or null if not set.
   */
  private readPxVar(name: string): number | null {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!val) return null;
    const px = parseFloat(val.replace('px', ''));
    return Number.isFinite(px) ? px : null;
  }

  /**
   * Gets the height of the header element.
   * @returns The header height in pixels.
   */
  private getHeaderHeight(): number {
    const header = document.querySelector('app-header') as HTMLElement | null;
    return header?.offsetHeight ?? this.headerHeightFallback;
  }

  /**
   * Gets the height of the menu panel element.
   * @returns The menu panel height in pixels.
   */
  private getMenuHeight(): number {
    const panel = document.querySelector('app-menu .menuPanel') as HTMLElement | null;
    return panel?.offsetHeight ?? 0;
  }

  private scrollAfterClose(): void {
    if (!this.activeId) return;
    const target = document.getElementById(this.activeId);
    if (!target) return;
    const headerH = this.readPxVar('--header-h') ?? this.getHeaderHeight();
    const targetTop = window.scrollY + target.getBoundingClientRect().top;
    window.scrollTo({ top: targetTop - headerH, behavior: 'smooth' });
  }

  /**
   * Gets the menu transition duration in milliseconds.
   * @returns The transition duration in ms.
   */
 
  private getMenuTransitionMs(): number {
    const panel = document.querySelector('app-menu .menuPanel') as HTMLElement | null;
    if (!panel) return 0;

    const toMs = (raw: string) =>
      raw
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .map((v) => (v.endsWith('ms') ? parseFloat(v) : parseFloat(v) * 1000));

    const style = getComputedStyle(panel);
    const durations = toMs(style.transitionDuration || '0s');
    const delays = toMs(style.transitionDelay || '0s');

    const longest = durations.reduce((max, duration, idx) => {
      const delay = delays[idx] ?? delays[delays.length - 1] ?? 0;
      return Math.max(max, duration + delay);
    }, 0);

    return Math.round(longest);
  }

  /**
   * Copies the email address to the clipboard and shows a copied notification.
   */
  copyEmail() {
    const A = 'christina.troitzsch';
    const B = 'web.';
    const C = 'de';
    const email = `${A}@${B}${C}`;
    navigator.clipboard.writeText(email).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }
}
