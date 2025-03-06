import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceEditDialogComponent } from './car-insurance-edit-dialog.component';

describe('CarInsuranceEditDialogComponent', () => {
  let component: CarInsuranceEditDialogComponent;
  let fixture: ComponentFixture<CarInsuranceEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarInsuranceEditDialogComponent]
    });
    fixture = TestBed.createComponent(CarInsuranceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
