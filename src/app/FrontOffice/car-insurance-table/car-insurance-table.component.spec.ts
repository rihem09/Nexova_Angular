import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceTableComponent } from './car-insurance-table.component';

describe('CarInsuranceTableComponent', () => {
  let component: CarInsuranceTableComponent;
  let fixture: ComponentFixture<CarInsuranceTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarInsuranceTableComponent]
    });
    fixture = TestBed.createComponent(CarInsuranceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
