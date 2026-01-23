import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-headline',
  imports: [TranslateModule],
  templateUrl: './headline.html',
  styleUrl: './headline.scss',
})
export class Headline {
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      if (data['scrollToSayHi']) {
        setTimeout(() => {
          document.getElementById('sayhiAnchor')?.scrollIntoView({ behavior: 'auto' });
        }, 100);
      }
    });
  }



  /**
   * Scrolls the window smoothly to the bottom of the page.
   */
  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }


}
