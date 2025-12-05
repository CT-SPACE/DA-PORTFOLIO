import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Headline } from "./headline/headline";
import { AboutMe } from "./about-me/about-me";
import { MySkills } from "./my-skills/my-skills";
import { Portfolio } from "./portfolio/portfolio";
import { SayHi } from "./say-hi/say-hi";

@Component({
  selector: 'app-root',
  imports: [Header, Headline, AboutMe, MySkills, Portfolio, SayHi],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('DA-PORTFOLIO');
}
