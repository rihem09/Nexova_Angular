import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarInsurance } from '../models/car-insurance.model';

@Component({
  selector: 'app-car-insurance-edit-dialog',
  templateUrl: './car-insurance-edit-dialog.component.html',
  styleUrls: ['./car-insurance-edit-dialog.component.css']
})
export class CarInsuranceEditDialogComponent {
  insuranceForm: FormGroup;
  fuelTypes = ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'LPG'];
  coverageOptions = [
    { key: 'ANTI_THEFT', label: 'Anti Theft' },
    { key: 'GLASS_AND_WINDOW', label: 'Glass and Window' },
    { key: 'WATER_DAMAGE', label: 'Water Damage' },
    { key: 'FIRE_AND_EXPLOSION', label: 'Fire and Explosion' },
    { key: 'NATURAL_DISASTERS', label: 'Natural Disasters' },
    { key: 'TENANT_LIABILITY', label: 'Tenant Liability' },
    { key: 'ASSISTANCE_24_7', label: 'Assistance 24/7' },
    { key: 'NEW_FOR_OLD', label: 'New for Old' },
    { key: 'ELECTRICAL_DAMAGE', label: 'Electrical Damage' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CarInsuranceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarInsurance,
    private fb: FormBuilder
  ) {
    this.insuranceForm = this.fb.group({
      id: [data.id],
      make: [data.make, Validators.required],
      model: [data.model, Validators.required],
      year: [data.year, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      power: [data.power, [Validators.required, Validators.min(1)]],
      fuelType: [data.fuelType, Validators.required],
      coverages: this.fb.group({
        ANTI_THEFT: [data.coverages?.ANTI_THEFT || false],
        GLASS_AND_WINDOW: [data.coverages?.GLASS_AND_WINDOW || false],
        WATER_DAMAGE: [data.coverages?.WATER_DAMAGE || false],
        FIRE_AND_EXPLOSION: [data.coverages?.FIRE_AND_EXPLOSION || false],
        NATURAL_DISASTERS: [data.coverages?.NATURAL_DISASTERS || false],
        TENANT_LIABILITY: [data.coverages?.TENANT_LIABILITY || false],
        ASSISTANCE_24_7: [data.coverages?.ASSISTANCE_24_7 || false],
        NEW_FOR_OLD: [data.coverages?.NEW_FOR_OLD || false],
        ELECTRICAL_DAMAGE: [data.coverages?.ELECTRICAL_DAMAGE || false]
      })
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
}
