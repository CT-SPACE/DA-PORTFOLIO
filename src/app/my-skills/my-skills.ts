import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from '../shared/in-view.directive';

@Component({
  selector: 'app-my-skills',
  imports: [CommonModule, InViewDirective],
  templateUrl: './my-skills.html',
  styleUrls: ['./my-skills.scss'],
})
export class MySkills {
  windowHeight = window.innerHeight;
visible = { tools: false, skills: false, knowledges: false };

  public skills: string[] = [
    'JavaScript',
    'Typescript',
    'Angular',
    'Api',
    'html',
    'Css',
    'Bootstrap',
    'Material-Design',
  ];

  public knowledges: string[] = ['Scrum', 'Kanban', 'Ki-Prompting'];

  public tools: string[] = [
    'VSCode',
    'Figma',
    'Browser-Dev-Tools',
    'Git',
    'Github',
    'Firebase',
    'GAM360',
    'Salesforce',
    'Confluence',
    'Jira',
    'Trello',
  ];

  public getKnowledges(): string[] {
    return this.knowledges;
  }

  public getSkills(): string[] {
    return this.skills;
  }
  public getTools(): string[] {
    return this.tools;
  }


setSectionVisible(section:'skills' | 'knowledges' | 'tools', value: boolean) { 
  this.visible[section] = value; }
}
