import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resumr4Component } from './resumr4.component';

describe('Resumr4Component', () => {
  let component: Resumr4Component;
  let fixture: ComponentFixture<Resumr4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resumr4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resumr4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
