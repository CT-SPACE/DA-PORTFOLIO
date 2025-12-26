import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// import { PrivacyService } from '../../shared/privacy.service';  


@Component({
  selector: 'app-legal',
  standalone:true,
  imports: [ CommonModule, RouterLink],
  providers: [],
  templateUrl: './legal.html',
  styleUrls: ['./legal.scss', '../privacy-policy/privacy-policy.scss'],
})

export class LegalComponent implements OnInit {
  isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // this.privacyService.getState().subscribe((state: boolean) => {
    //   this.isOpen = state;
    // });
  }

  // closePrivacy(): void {
  //   this.privacyService.closeLegalContainer();
  // }

  // acceptPrivacy(): void {
  //   this.privacyService.accept();
  //   this.closePrivacy();
  // }
}
