import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from "./shared/footer/footer";
import { TranslateModule } from '@ngx-translate/core';








@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,  Footer, TranslateModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {

 

}

