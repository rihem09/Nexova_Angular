import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementBackComponent } from './retirement-back.component';

describe('RetirementBackComponent', () => {
  let component: RetirementBackComponent;
  let fixture: ComponentFixture<RetirementBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetirementBackComponent]
    });
    fixture = TestBed.createComponent(RetirementBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
