import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from "./shared/footer/footer";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,  Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {


}

