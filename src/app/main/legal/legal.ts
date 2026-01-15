import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal',
  standalone:true,
  imports: [ CommonModule, RouterLink, TranslateModule ],
  providers: [],
  templateUrl: './legal.html',
  styleUrls: ['./legal.scss', '../privacy-policy/privacy-policy.scss'],
})

export class LegalComponent implements OnInit {
  isOpen: boolean = false;

  constructor() {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
  }

  
  // /**
  //  * Navigates to the main page and scrolls down to SayHi-Section.
  //  */
  // goToMainAndScrollToSayhi(): void {
  //       this.router.navigate(['/']).then(() => {
  //     setTimeout(() => {
  //     const el = document.getElementById('sayhiAnchor');
  //     if (el) {
  //       el.scrollIntoView({ behavior: 'auto' }); 
  //     }
  //   }, 100);
  // });
  // }

}
