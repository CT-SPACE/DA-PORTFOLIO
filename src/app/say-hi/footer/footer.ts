import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PrivacyService } from '../../shared/privacy.service';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports: [CommonModule, RouterLink, RouterModule],
  providers: [ Router],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  constructor(public privacyService: PrivacyService) {}

}
