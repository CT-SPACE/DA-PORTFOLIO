import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Projects } from '../portfolio/projects/projects';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, Projects],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {


}
