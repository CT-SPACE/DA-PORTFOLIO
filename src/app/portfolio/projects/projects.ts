import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  public projects: Project[] = [
    {
      id: 1,
      title: 'El Pollo Loco',
      description:
        'Jump-and-Run Spiel, bei dem der Spieler verschiedene Items sammeln muss, um Punkte zu sammeln und den Endboss zu besiegen. Es geht um Hühner.',
      imgSrc: 'assets/img/project_el-pollo-loco.png',
      tools: ['JavaScript', 'HTML', 'CSS', 'Kanban-Board'],
      gitLink: 'https://github.com/CT-SPACE/EL-POLLO-LOCO',
      slug: 'el-pollo-loco',
      liveLink: 'https://www.troitzsch.de/DA/EL-POLLO-LOCO/',
    },
    {
      id: 2,
      title: "King's Cup",
      description:
        'Das ist die Digitale Version des beliebten Kartenspiels "King\'s Cup". Entwickelt mit Angular und Firebase, bietet diese App eine interaktive Möglichkeit, das Spiel online zu spielen. Es können gleichzeitig mehrere Gruppen unabhängig voneinander spielen.',
      imgSrc: 'assets/img/project_kingscup.png',
      tools: ['Angular', 'TypeScript', 'SCSS', 'Firebase'],
      gitLink: 'https://github.com/CT-SPACE/KINGS-CUP',
      slug: 'kings-cup',
      liveLink: 'https://troitzsch.de/DA/ANGULAR/KINGS-CUP/',
    },

    {
      id: 3,
      title: 'Join',
      description:
        'Ein Task Manager der sich an dem Kanban System anlehnt und mit dem man Aufgaben erstellen kann und mit Drag and Drop organisiert wird. Man kann sich Registieren und seine Kontakte pflegen.',
      imgSrc: 'assets/img/project_join.png',
      tools: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'Figma'],
      gitLink: '',
      slug: 'join-app',
      liveLink: 'https://troitzsch.de/DA/JOIN/',
    },
    {
      id: 4,
      title: 'Pokedex',
      description:
        'Hier werden die Inhalte über API gespeist, sodass alles Wissenswerte über die kleinen Racker abgerufen werden kann.',
      imgSrc: 'assets/img/project_pokedex.png',
      tools: ['JavaScript', 'HTML', 'CSS', 'API'],
      gitLink: '',
      slug: 'pokedex',
      liveLink: 'https://troitzsch.de/DA/POKEDEX/',
    },
    {
      id: 5,
      title: 'Quiz-App',
      description: 'Eine Bootstrap basierte Singlepage App. ',
      imgSrc: 'assets/img/project_quizapp.png',
      tools: ['JavaScript', 'CSS', 'HTML', 'Bootstrap'],
      gitLink: '',
      slug: 'quiz-app',
      liveLink: 'https://troitzsch.de/DA/QUIZ-APP/',
    },
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
