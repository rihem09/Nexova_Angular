import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementComponent } from './retirement.component';

describe('RetirementComponent', () => {
  let component: RetirementComponent;
  let fixture: ComponentFixture<RetirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetirementComponent]
    });
    fixture = TestBed.createComponent(RetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
