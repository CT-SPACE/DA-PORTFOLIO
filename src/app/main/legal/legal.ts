import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  }

}
