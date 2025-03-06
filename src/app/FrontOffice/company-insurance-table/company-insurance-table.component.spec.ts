import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInsuranceTableComponent } from './company-insurance-table.component';

describe('CompanyInsuranceTableComponent', () => {
  let component: CompanyInsuranceTableComponent;
  let fixture: ComponentFixture<CompanyInsuranceTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyInsuranceTableComponent]
    });
    fixture = TestBed.createComponent(CompanyInsuranceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
