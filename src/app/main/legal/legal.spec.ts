import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalComponent } from './legal';

describe('Legal', () => {
  let component: LegalComponent;
  let fixture: ComponentFixture<LegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
