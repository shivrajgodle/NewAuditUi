import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDocComponent } from './specific-doc.component';

describe('SpecificDocComponent', () => {
  let component: SpecificDocComponent;
  let fixture: ComponentFixture<SpecificDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
