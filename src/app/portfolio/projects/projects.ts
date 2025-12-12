import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {



  public projects: Project[] = [
    {
      id: 1,
      title: 'El Pollo Loco',
      description: 'Jump-and-run game built with JavaScript, HTML, CSS.',
      imgSrc: 'assets/img/project_pollo.png',
      tools: ['JavaScript', 'HTML', 'CSS', 'Kanban-Board'],
      gitLink: 'https://github.com/CT-SPACE/EL-POLLO-LOCO',
      slug: 'el-pollo-loco',
      liveLink: 'https://www.troitzsch.de/da/el-pollo-loco/'
    },
    {
      id: 2,
      title: 'Join',
      description: 'Ein Task Manager der sich an dem Kanban System anlehnt und mit dem man Aufgaben erstellen kann und mit Drag and Drop organisiert wird. Man kann sich Registieren und seine Kontakte pflegen.',
      imgSrc: 'assets/img/project_join.png',
      tools: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'Kanban-Board'],
      gitLink: 'https://github.com/CT-SPACE/JOIN-124_Gruppenarbeit',
      slug: 'join-app',
      liveLink: 'https://www.troitzsch.de/da/join/'  
    }
    ,
    {
      id: 3,
      title: 'King\'s Cup',
      description: 'Das ist die Digitale Version des beliebten Kartenspiels "King\'s Cup". Entwickelt mit Angular und Firebase, bietet diese App eine interaktive Möglichkeit, das Spiel online zu spielen. Es können gleichzeitig mehrere Gruppen unabhängig voneinander spielen.',
      imgSrc: 'assets/img/project_kingscup.png',
      tools: ['Angular', 'TypeScript', 'SCSS', 'Firebase'],
      gitLink: 'https://github.com/CT-SPACE/KINGS-CUP',
      slug: 'kings-cup',
      liveLink: 'https://www.troitzsch.de/da/kings-cup/'
    }
    ,
    {
      id: 4,
      title: 'Pokedex',
      description: 'Hier werden die Inhalte über API gespeist, sodass alles Wissenswerte über die kleinen Racker abgerufen werden kann.',
      imgSrc: 'assets/img/project_pokedex.png',
      tools: ['Angular', 'TypeScript', 'SCSS', 'API'],
      gitLink: '' ,
      slug: 'pokedex',
      liveLink: 'https://www.troitzsch.de/da/pokedex/'}
    ,
    {
      id: 5,
      title: 'Quiz-App',
      description: 'Eine Bootstrap basierte App ohne Vorgaben an Gestaltung und Inhalt.',
      imgSrc: 'assets/img/project_quizapp.png',
      tools: ['JavaScript', 'CSS'],
      gitLink: '',
      slug: 'quiz-app',
      liveLink: 'https://www.troitzsch.de/da/quiz-app/'
      
    }
  ];


  openNewTab(url: string): void {
    window.open(url, '_blank', 'noopener');
  }
}

export interface Project {
  id: number | string;
  title: string;
  description: string;
  imgSrc: string;
  tools: string[];
  gitLink: string;
  liveLink?: string;
  slug?: string;
}
