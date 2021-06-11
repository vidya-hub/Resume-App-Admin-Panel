import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleSubDataComponent } from './job-title-sub-data.component';

describe('JobTitleSubDataComponent', () => {
  let component: JobTitleSubDataComponent;
  let fixture: ComponentFixture<JobTitleSubDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTitleSubDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitleSubDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
