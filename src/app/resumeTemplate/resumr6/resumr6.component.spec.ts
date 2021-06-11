import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resumr6Component } from './resumr6.component';

describe('Resumr6Component', () => {
  let component: Resumr6Component;
  let fixture: ComponentFixture<Resumr6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resumr6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resumr6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
