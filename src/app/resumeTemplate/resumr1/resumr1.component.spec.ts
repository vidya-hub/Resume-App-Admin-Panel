import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resumr1Component } from './resumr1.component';

describe('Resumr1Component', () => {
  let component: Resumr1Component;
  let fixture: ComponentFixture<Resumr1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resumr1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resumr1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
