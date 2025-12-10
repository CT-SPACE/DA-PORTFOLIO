import { Component, HostBinding, Input} from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})


export class Menu {
  constructor(private vs: ViewportScroller) {}

  @Input() isOpen = false;
  @HostBinding('class.open') get opened() { return this.isOpen; }
  @HostBinding('attr.aria-hidden') get ariaHidden() { return String(!this.isOpen); }

  activeId: string | null = null;
  private headerHeightFallback = 49; // px fallback

  toggleMenuItem(sectionId: string): void {
    this.activeId = sectionId;
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerH = this.readPxVar('--header-h') ?? this.getHeaderHeight();
    const menuH = this.isOpen ? (this.readPxVar('--menu-h') ?? this.getMenuHeight()) : 0;

    const targetTop = window.scrollY + target.getBoundingClientRect().top;
    const top = targetTop - (headerH + menuH);
    window.scrollTo({ top, behavior: 'smooth' });
  }

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

  private readPxVar(name: string): number | null {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!val) return null;
    const px = parseFloat(val.replace('px', ''));
    return Number.isFinite(px) ? px : null;
  }

  private getHeaderHeight(): number {
    const header = document.querySelector('app-header') as HTMLElement | null;
    return header?.offsetHeight ?? this.headerHeightFallback;
  }

  private getMenuHeight(): number {
    const host = (this as any).el?.nativeElement as HTMLElement | null;
    const panel = host?.querySelector('.menuPanel') as HTMLElement | null;
    return panel?.offsetHeight ?? 0;
  }

  private getMenuTransitionMs(): number {
    const host = (this as any).el?.nativeElement as HTMLElement | null;
    const style = host ? getComputedStyle(host) : null;
    const dur = style?.transitionDuration || '0s';
    const m = dur.match(/([\d.]+)s/);
    const secs = m ? parseFloat(m[1]) : 0;
    return Math.max(0, Math.round(secs * 1000));
  }
}
