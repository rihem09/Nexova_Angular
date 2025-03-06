import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInsuranceEditDialogComponent } from './company-insurance-edit-dialog.component';

describe('CompanyInsuranceEditDialogComponent', () => {
  let component: CompanyInsuranceEditDialogComponent;
  let fixture: ComponentFixture<CompanyInsuranceEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyInsuranceEditDialogComponent]
    });
    fixture = TestBed.createComponent(CompanyInsuranceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
