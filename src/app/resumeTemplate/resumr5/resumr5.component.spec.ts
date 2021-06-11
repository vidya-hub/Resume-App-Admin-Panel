import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resumr5Component } from './resumr5.component';

describe('Resumr5Component', () => {
  let component: Resumr5Component;
  let fixture: ComponentFixture<Resumr5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resumr5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resumr5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
