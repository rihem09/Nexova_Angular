import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceService } from '../services/insurance.model';
import { Insurance } from '../models/insurance.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit {
  insuranceForm!: FormGroup;
  paymentForm!: FormGroup;
  currentYear = new Date().getFullYear();

  // Update the type definitions to include 'loading'
  insuranceStatus: 'pending' | 'loading' | 'success' | 'error' = 'pending';
  paymentStatus: 'pending' | 'loading' | 'success' | 'error' = 'pending';

  // Store the created insurance information
  createdInsurance: any = null;
  calculatedPremium: number = 0;
  insuranceId?: number;

  homeTypes = [
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'DETACHED_HOUSE', label: 'Detached House' },
    { value: 'VILLA', label: 'Villa' },
    { value: 'STUDIO', label: 'Studio' }
  ];

  occupancyTypes = [
    { value: 'PRIMARY_RESIDENCE', label: 'Primary Residence' },
    { value: 'SECONDARY_RESIDENCE', label: 'Secondary Residence' },
    { value: 'RENTAL', label: 'Rental' }
  ];

  insuranceTypes = [
    { value: 'PROFESSIONAL', label: 'Professional' },
    { value: 'PARTICULAR', label: 'Particular' }
  ];

  constructor(
    private fb: FormBuilder,
    private insuranceService: InsuranceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.insuranceForm = this.fb.group({
      basicInfo: this.fb.group({
        homeArea: ['', [Validators.required, Validators.min(0)]],
        numberOfRooms: ['', [Validators.required, Validators.min(1)]],
      }),
      propertyDetails: this.fb.group({
        homeType: ['', Validators.required],
        yearOfConstruction: ['', [Validators.required, Validators.min(1800), Validators.max(2025)]],
        fullAddress: ['', Validators.required],
        occupancyType: ['', Validators.required],
        insuredFurnitureValue: ['', [Validators.required, Validators.min(0)]],
        insuranceType: ['', Validators.required]
      }),
      guarantees: this.fb.group({
        alarmSystem: [false],
        antiTheftProtection: [false],
        glassProtection: [false],
        waterDamageProtection: [false],
        fireExplosionProtection: [false],
        naturalDisasterProtection: [false],
        civilLiabilityProtection: [false],
        emergencyAssistance: [false],
        newValueProtection: [false],
        electricalDamageProtection: [false],
      }),
      additionalDetails: this.fb.group({})
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      accountHolder: [''],
      iban: ['']
    });

    // Add conditional validation based on payment method
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      if (method === 'card') {
        this.paymentForm.get('cardNumber')?.setValidators([Validators.required]);
        this.paymentForm.get('expiryDate')?.setValidators([Validators.required]);
        this.paymentForm.get('cvv')?.setValidators([Validators.required]);
        this.paymentForm.get('accountHolder')?.clearValidators();
        this.paymentForm.get('iban')?.clearValidators();
      } else if (method === 'bank') {
        this.paymentForm.get('cardNumber')?.clearValidators();
        this.paymentForm.get('expiryDate')?.clearValidators();
        this.paymentForm.get('cvv')?.clearValidators();
        this.paymentForm.get('accountHolder')?.setValidators([Validators.required]);
        this.paymentForm.get('iban')?.setValidators([Validators.required]);
      }

      // Update validity
      ['cardNumber', 'expiryDate', 'cvv', 'accountHolder', 'iban'].forEach(control => {
        this.paymentForm.get(control)?.updateValueAndValidity();
      });
    });
  }

  prepareInsuranceData(): Insurance {
    const formValue = this.insuranceForm.value;
    return {
      ...formValue.basicInfo,
      ...formValue.propertyDetails,
      ...formValue.guarantees,
      additionalDetails: {
        ...formValue.additionalDetails
      }
    };
  }

  createInsurance() {
    if (this.insuranceForm.valid) {
      this.insuranceStatus = 'loading';
      const insuranceData = this.prepareInsuranceData();

      this.insuranceService.createInsurance(insuranceData).subscribe({
        next: (response) => {
          this.insuranceStatus = 'success';
          this.createdInsurance = response;
          this.insuranceId = response.id;

          // Extract the premium from the response
          if (response.additionalDetails?.['premium_calculation']) {
            this.calculatedPremium = parseFloat(response.additionalDetails?.['premium_calculation']);
          }
        },
        error: (error) => {
          this.insuranceStatus = 'error';
          console.error('Insurance creation failed:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.insuranceForm);
    }
  }

  processPayment() {
    if (this.paymentForm.valid && this.insuranceId) {
      this.paymentStatus = 'loading';

      // Create payment intent
      this.insuranceService.createPaymentIntent(this.insuranceId).subscribe({
        next: () => {
          this.confirmPayment(this.insuranceId);
        },
        error: (error) => {
          this.paymentStatus = 'error';
          console.error('Payment intent creation failed:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  confirmPayment(insuranceId: number | undefined) {
    if (!insuranceId) {
      this.paymentStatus = 'error';
      return;
    }

    this.insuranceService.confirmPayment(insuranceId).subscribe({
      next: () => {
        this.paymentStatus = 'success';
      },
      error: (error) => {
        this.paymentStatus = 'error';
        console.error('Payment confirmation failed:', error);
      }
    });
  }

  resetInsuranceCreation() {
    this.insuranceStatus = 'pending';
    this.createdInsurance = null;
    this.insuranceId = undefined;
    this.calculatedPremium = 0;
  }

  finishProcess() {
    if (this.paymentStatus === 'success') {
      this.insuranceForm.reset();
      this.paymentForm.reset();
      this.router.navigate(['/dashboard']);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get basicInfoForm() { return this.insuranceForm.get('basicInfo') as FormGroup; }
  get propertyDetailsForm() { return this.insuranceForm.get('propertyDetails') as FormGroup; }
  get guaranteesForm() { return this.insuranceForm.get('guarantees') as FormGroup; }
}
