import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Insurance } from '../models/insurance.model';

@Component({
  selector: 'app-insurance-edit-dialog',
  templateUrl: './insurance-edit-dialog.component.html',
  styleUrls: ['./insurance-edit-dialog.component.css']
})
export class InsuranceEditDialogComponent {
  insuranceForm: FormGroup;

  // Options for dropdowns
  homeTypes = ['APARTMENT', 'DETACHED_HOUSE', 'VILLA', 'STUDIO'];
  occupancyTypes = ['PRIMARY_RESIDENCE', 'SECONDARY_RESIDENCE', 'RENTAL'];
  insuranceTypes = ['PROFESSIONAL', 'PARTICULAR'];

  // Protection options for the form
  protectionOptions = [
    { key: 'antiTheftProtection', label: 'Anti-Theft Protection' },
    { key: 'glassProtection', label: 'Glass Protection' },
    { key: 'waterDamageProtection', label: 'Water Damage Protection' },
    { key: 'fireExplosionProtection', label: 'Fire & Explosion Protection' },
    { key: 'naturalDisasterProtection', label: 'Natural Disaster Protection' },
    { key: 'civilLiabilityProtection', label: 'Civil Liability Protection' },
    { key: 'emergencyAssistance', label: 'Emergency Assistance' },
    { key: 'newValueProtection', label: 'New Value Protection' },
    { key: 'electricalDamageProtection', label: 'Electrical Damage Protection' }
  ];

  constructor(
    public dialogRef: MatDialogRef<InsuranceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Insurance,
    private fb: FormBuilder
  ) {
    this.insuranceForm = this.fb.group({
      id: [data.id],
      homeArea: [data.homeArea, [Validators.required, Validators.min(1)]],
      numberOfRooms: [data.numberOfRooms, [Validators.required, Validators.min(1)]],
      homeType: [data.homeType, Validators.required],
      yearOfConstruction: [data.yearOfConstruction, [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear())
      ]],
      fullAddress: [data.fullAddress, Validators.required],
      occupancyType: [data.occupancyType, Validators.required],
      insuredFurnitureValue: [data.insuredFurnitureValue, [Validators.required, Validators.min(0)]],
      alarmSystem: [data.alarmSystem],
      insuranceType: [data.insuranceType, Validators.required],

      // Optional protections
      antiTheftProtection: [data.antiTheftProtection || false],
      glassProtection: [data.glassProtection || false],
      waterDamageProtection: [data.waterDamageProtection || false],
      fireExplosionProtection: [data.fireExplosionProtection || false],
      naturalDisasterProtection: [data.naturalDisasterProtection || false],
      civilLiabilityProtection: [data.civilLiabilityProtection || false],
      emergencyAssistance: [data.emergencyAssistance || false],
      newValueProtection: [data.newValueProtection || false],
      electricalDamageProtection: [data.electricalDamageProtection || false],

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

  formatHomeType(type: string): string {
    return type.replace(/_/g, ' ');
  }

  formatOccupancyType(type: string): string {
    return type.replace(/_/g, ' ');
  }

  // Helper method for validating forms
  isFieldInvalid(fieldName: string): boolean {
    const field = this.insuranceForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Get current year for validation
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
