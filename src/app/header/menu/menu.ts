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
  constructor(
    private vs: ViewportScroller,
    private router: Router,
  ) {}
  copied = false;
  @Input() isOpen = false;
  @HostBinding('class.open') get opened() {
    return this.isOpen;
  }
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
    const menuH = this.isOpen ? (this.readPxVar('--menu-h') ?? this.getMenuHeight()) : 0;

    const targetTop = window.scrollY + target.getBoundingClientRect().top;
    const top = targetTop - (headerH + menuH);
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /**
   * Closes the menu and scrolls to the active section if set, after the menu transition.
   */
  onClose(): void {
    if (!this.isOpen) return;
    this.isOpen = false;

    const durationMs = this.getMenuTransitionMs();
    if (this.activeId) {
      const target = document.getElementById(this.activeId);
      if (!target) return;
      const targetTop = window.scrollY + target.getBoundingClientRect().top;
      const headerH = this.readPxVar('--header-h') ?? this.getHeaderHeight();
      setTimeout(() => {
        const top = targetTop - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }, durationMs);
    }
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

  /**
   * Gets the menu transition duration in milliseconds.
   * @returns The transition duration in ms.
   */
  private getMenuTransitionMs(): number {
    const host = document.querySelector('app-menu') as HTMLElement | null;
    const style = host ? getComputedStyle(host) : null;
    const dur = style?.transitionDuration || '0s';
    const m = dur.match(/([\d.]+)s/);
    const secs = m ? parseFloat(m[1]) : 0;
    return Math.max(0, Math.round(secs * 1000));
  }

  /**
   * Copies the email address to the clipboard and shows a copied notification.
   */
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
