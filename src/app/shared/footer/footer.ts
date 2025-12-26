import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { Input } from '@angular/core';
// 'import { InViewDirective } from '../in-view.directive';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports: [CommonModule, RouterModule],
  providers: [ Router],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  constructor(private router: Router) {}

  // footerVisible = false;
// @Input() footerVisible: boolean = false;
//  @Input() visible: boolean = false;
//  footerVisible: boolean = this.visible;
}
