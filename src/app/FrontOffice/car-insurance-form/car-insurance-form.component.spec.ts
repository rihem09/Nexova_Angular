import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceFormComponent } from './car-insurance-form.component';

describe('CarInsuranceFormComponent', () => {
  let component: CarInsuranceFormComponent;
  let fixture: ComponentFixture<CarInsuranceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarInsuranceFormComponent]
    });
    fixture = TestBed.createComponent(CarInsuranceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
