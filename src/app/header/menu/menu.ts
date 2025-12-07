import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
constructor(private vs: ViewportScroller) {}

toggleMenuItem(sectionId: string): void {
document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


}
