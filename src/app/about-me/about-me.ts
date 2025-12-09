import { Component } from '@angular/core';
import { InViewDirective } from '../shared/in-view.directive';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {

}
