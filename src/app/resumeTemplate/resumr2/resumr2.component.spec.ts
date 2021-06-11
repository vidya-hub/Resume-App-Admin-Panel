import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resumr2Component } from './resumr2.component';

describe('Resumr2Component', () => {
  let component: Resumr2Component;
  let fixture: ComponentFixture<Resumr2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resumr2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resumr2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
