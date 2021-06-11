import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldOfStudyComponent } from './field-of-study.component';

describe('FieldOfStudyComponent', () => {
  let component: FieldOfStudyComponent;
  let fixture: ComponentFixture<FieldOfStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldOfStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
