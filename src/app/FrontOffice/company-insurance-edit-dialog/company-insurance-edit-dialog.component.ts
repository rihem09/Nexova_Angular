import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyInsurance, InsuranceType, PremisesOccupationType } from '../models/company-insurance.model';

@Component({
  selector: 'app-company-insurance-edit-dialog',
  templateUrl: './company-insurance-edit-dialog.component.html',
  styleUrls: ['./company-insurance-edit-dialog.component.css']
})
export class CompanyInsuranceEditDialogComponent {
  insuranceForm: FormGroup;

  // Enum options for dropdowns
  premisesOccupationTypes = Object.values(PremisesOccupationType);
  insuranceTypes = Object.values(InsuranceType);

  // Insurance options
  insuranceOptions = [
    { key: 'FIRE_COVERAGE', label: 'Fire Coverage' },
    { key: 'THEFT_COVERAGE', label: 'Theft Coverage' },
    { key: 'LIABILITY_COVERAGE', label: 'Liability Coverage' },
    { key: 'NATURAL_DISASTER_COVERAGE', label: 'Natural Disaster Coverage' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CompanyInsuranceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyInsurance,
    private fb: FormBuilder
  ) {
    this.insuranceForm = this.fb.group({
      id: [data.id],
      companyName: [data.companyName, Validators.required],
      industrySector: [data.industrySector, Validators.required],
      taxRegistrationNumber: [data.taxRegistrationNumber, Validators.required],
      headOfficeAddress: [data.headOfficeAddress, Validators.required],
      businessPremisesSize: [data.businessPremisesSize, [Validators.required, Validators.min(0)]],
      numberOfEmployees: [data.numberOfEmployees, [Validators.required, Validators.min(0)]],
      valueOfProfessionalEquipment: [data.valueOfProfessionalEquipment, [Validators.required, Validators.min(0)]],
      premisesOccupationType: [data.premisesOccupationType, Validators.required],
      typeOfInsuranceRequired: [data.typeOfInsuranceRequired, Validators.required],
      presenceOfSecuritySystem: [data.presenceOfSecuritySystem],
      insuranceOptions: this.fb.group({
        FIRE_COVERAGE: [data.insuranceOptions?.FIRE_COVERAGE || false],
        THEFT_COVERAGE: [data.insuranceOptions?.THEFT_COVERAGE || false],
        LIABILITY_COVERAGE: [data.insuranceOptions?.LIABILITY_COVERAGE || false],
        NATURAL_DISASTER_COVERAGE: [data.insuranceOptions?.NATURAL_DISASTER_COVERAGE || false]
      }),
      additionalDetails: [data.additionalDetails || {}]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.insuranceForm.valid) {
      this.dialogRef.close(this.insuranceForm.value);
    }
  }

  formatInsuranceType(type: string): string {
    return type.replace(/_/g, ' ');
  }

  formatPremisesType(type: string): string {
    return type.charAt(0) + type.slice(1).toLowerCase();
  }

  // Helper method for validating forms
  isFieldInvalid(fieldName: string): boolean {
    const field = this.insuranceForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}
