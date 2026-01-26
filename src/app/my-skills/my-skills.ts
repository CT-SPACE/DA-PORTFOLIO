import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from '../shared/in-view.directive';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-my-skills',
  imports: [CommonModule, InViewDirective, TranslateModule],
  templateUrl: './my-skills.html',
  styleUrls: ['./my-skills.scss'],
})
export class MySkills implements AfterViewInit {
constructor(
  private breakpointObserver: BreakpointObserver,
  private cdr: ChangeDetectorRef,
) {
  this.breakpointObserver
    .observe('(max-width: 800px)')
    .pipe(takeUntilDestroyed())
    .subscribe(({ matches }) => {
      this.inViewMobileSkills = matches;
      this.cdr.markForCheck();
    });
}

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

  /**
   * Returns the list of knowledges.
   * @returns Array of knowledges.
   */
  public getKnowledges(): string[] {
    return this.knowledges;
  }

  /**
   * Returns the list of skills.
   * @returns Array of skills.
   */
  public getSkills(): string[] {
    return this.skills;
  }
  /**
   * Returns the list of tools.
   * @returns Array of tools.
   */
  public getTools(): string[] {
    return this.tools;
  }

  /**
   * Sets the visibility of a section (skills, knowledges, or tools).
   * @param section The section to update.
   * @param value The visibility state.
   */
  setSectionVisible(section: 'skills' | 'knowledges' | 'tools', value: boolean) {
    this.visible[section] = value;
  }

  /**
   * Lifecycle hook called after the component's view has been fully initialized.
   * Calculates the height of each section and sets the inViewMobile flags accordingly.
   */
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

  /**
   * Sets the inViewMobile flag for the given section based on its height compared to the window height.
   * @param type The section type ('skills', 'tools', or 'knowledges').
   * @param containerHeight The height of the section container.
   */
  setInViewMobile(type: 'skills' | 'tools' | 'knowledges', containerHeight: number) {
    const flag: boolean = this.windowHeight <= containerHeight;
    if (type === 'skills') {
      this.inViewMobileSkills = flag;
    } else if (type === 'knowledges') {
      this.inViewMobileKnowledges = flag;
    } else if (type === 'tools') {
      this.inViewMobileTools = flag;
    }
  }
}
