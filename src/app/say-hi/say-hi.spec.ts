import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SayHi } from './say-hi';

describe('SayHi', () => {
  let component: SayHi;
  let fixture: ComponentFixture<SayHi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SayHi],
    }).compileComponents();

    fixture = TestBed.createComponent(SayHi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
