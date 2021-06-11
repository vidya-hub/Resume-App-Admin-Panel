import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resumr3Component } from './resumr3.component';

describe('Resumr3Component', () => {
  let component: Resumr3Component;
  let fixture: ComponentFixture<Resumr3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resumr3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resumr3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
