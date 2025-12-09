import { Directive, ElementRef, EventEmitter, Input, Output, OnDestroy } from '@angular/core';

@Directive({
  selector: '[inView]',
   standalone: true,
})
export class InViewDirective implements OnDestroy {
  private observer?: IntersectionObserver;

  @Input() threshold = 1;
  @Input() rootMargin = '-20% 0px -10%';
  @Input() activeClass = 'in-view';
  @Output() inViewChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef<HTMLElement>) {
    if (typeof window === 'undefined') {
      return;
    }
    const target = this.el.nativeElement;
    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = (entry?.intersectionRatio ?? 0) >= this.threshold;
        if (visible) {
          target.classList.add(this.activeClass);
        } else {
          target.classList.remove(this.activeClass);
        }
        this.inViewChange.emit(visible);
        console.log('meText inView:', visible);
      },
      { threshold: this.threshold, rootMargin: this.rootMargin }
    );
    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
