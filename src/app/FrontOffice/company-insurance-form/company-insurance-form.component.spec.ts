import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInsuranceFormComponent } from './company-insurance-form.component';

describe('CompanyInsuranceFormComponent', () => {
  let component: CompanyInsuranceFormComponent;
  let fixture: ComponentFixture<CompanyInsuranceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyInsuranceFormComponent]
    });
    fixture = TestBed.createComponent(CompanyInsuranceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
