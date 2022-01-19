import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRulesComponent } from './crud-rules.component';

describe('CrudRulesComponent', () => {
  let component: CrudRulesComponent;
  let fixture: ComponentFixture<CrudRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
