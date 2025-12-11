import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-skills',
  imports: [CommonModule],
  templateUrl: './my-skills.html',
  styleUrl: './my-skills.scss',
})
export class MySkills {
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

public knowledges: string[] = [
  'Scrum',
  'CanBan',
  'Ki-Prompting'
];

public tools: string[] = [
  'Visual-Studio-Code',
  'Figma',
  'Gimp',
  'Browser-Dev-Tools',
      'Git',
    'Github',
        'Firebase',
        'Adservers'

];



public getKnowledges(): string[]{
    return this.skills;
}

public getSkills(): string[]{
    return this.skills;
}
public getTools(): string[]{
    return this.skills;
}
}
