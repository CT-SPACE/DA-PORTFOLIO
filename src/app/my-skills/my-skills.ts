import { Component,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from '../shared/in-view.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-skills',
  imports: [CommonModule, InViewDirective, TranslateModule],
  templateUrl: './my-skills.html',
  styleUrls: ['./my-skills.scss'],
})
export class MySkills implements AfterViewInit {
  windowHeight = window.innerHeight - 100;
visible = { tools: false, skills: false, knowledges: false };
@ViewChild('skillsContainer') skillsContainerRef!: ElementRef;
@ViewChild('knowledgesContainer') knowledgesContainerRef!: ElementRef;
@ViewChild('toolsContainer') toolsContainerRef!: ElementRef;

public inViewMobileSkills = false;
public inViewMobileTools = false;
public inViewMobileKnowledges = false;

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
  this.visible[section] = value; 
}

ngAfterViewInit() {
  setTimeout(() => {
    if (this.skillsContainerRef && this.skillsContainerRef.nativeElement) {
      const skillsHeight = this.skillsContainerRef.nativeElement.offsetHeight;
      this.setInViewMobile('skills', skillsHeight);
    }
    if (this.toolsContainerRef && this.toolsContainerRef.nativeElement) {
      const toolsHeight = this.toolsContainerRef.nativeElement.offsetHeight;
      this.setInViewMobile('tools', toolsHeight);
    }
    if (this.knowledgesContainerRef && this.knowledgesContainerRef.nativeElement) {
      const knowledgeHeight = this.knowledgesContainerRef.nativeElement.offsetHeight;
      this.setInViewMobile('knowledges', knowledgeHeight);
    }
  });
}

setInViewMobile(type: 'skills' | 'tools' | 'knowledges', containerHeight: number) {
  console.log(`Calculating inViewMobile for ${type}: windowHeight = ${this.windowHeight}, containerHeight = ${containerHeight}`);
  const flag: boolean = this.windowHeight <= containerHeight;
  console.log(`Setting inViewMobile for ${type}: ${flag} (windowHeight: ${this.windowHeight}, containerHeight: ${containerHeight})`);
  if (type === 'skills') {
    this.inViewMobileSkills = flag;
      } else if (type === 'knowledges') {
    this.inViewMobileKnowledges = flag;
  
  } else if (type === 'tools') {
    this.inViewMobileTools = flag;
    console.log(`inViewMobileTools set to: ${flag}`);
  }
}
}
