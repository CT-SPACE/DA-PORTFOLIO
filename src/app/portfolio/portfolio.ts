import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Projects } from '../portfolio/projects/projects';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, Projects, TranslateModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {}
