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
        'portfolio.description_polloloco',
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
       'portfolio.description_kingscup',
      imgSrc: 'assets/img/project_kingscup.png',
      tools: ['Angular', 'TypeScript', 'SCSS', 'Firebase'],
      gitLink: 'https://github.com/CT-SPACE/KINGS-CUP',
      slug: 'kings-cup',
      liveLink: 'https://troitzsch.de/DA/ANGULAR/KINGS-CUP/',
    },

    {
      id: 3,
      title: 'Join',
      description: 'portfolio.description_join',
      imgSrc: 'assets/img/project_join.png',
      tools: ['Angular', 'TypeScript', 'SCSS', 'Firebase', 'Figma'],
      gitLink: '',
      slug: 'join-app',
      liveLink: 'https://troitzsch.de/DA/JOIN/',
    },
    {
      id: 4,
      title: 'Pokedex',
      description: 'portfolio.description_pokedex',
      imgSrc: 'assets/img/project_pokedex.png',
      tools: ['JavaScript', 'HTML', 'CSS', 'API'],
      gitLink: '',
      slug: 'pokedex',
      liveLink: 'https://troitzsch.de/DA/POKEDEX/',
    },
    {
      id: 5,
      title: 'Quiz-App',
      description: 'portfolio.description_quizapp',
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
