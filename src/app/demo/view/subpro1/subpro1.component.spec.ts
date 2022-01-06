import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subpro1Component } from './subpro1.component';

describe('Subpro1Component', () => {
  let component: Subpro1Component;
  let fixture: ComponentFixture<Subpro1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Subpro1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Subpro1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
