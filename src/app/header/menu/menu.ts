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

  // @Input() set isOpen(value: boolean) {
  //   this.open = !!value;
  // }

  toggleMenuItem(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
