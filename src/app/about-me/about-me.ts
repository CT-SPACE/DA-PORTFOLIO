import { Component } from '@angular/core';
import { InViewDirective } from '../shared/in-view.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [InViewDirective, TranslateModule],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {

}
