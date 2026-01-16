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

export class LegalComponent {
  isOpen: boolean = false;

  constructor() {}

  

}
