// src/app/FrontOffice/car-insurance-form/car-insurance-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarInsuranceService } from '../services/car-insurance.service';
import { CarInsurance } from '../models/car-insurance.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-insurance-form',
  templateUrl: './car-insurance-form.component.html',
  styleUrls: ['./car-insurance-form.component.css']
})
export class CarInsuranceFormComponent implements OnInit {
  carInsuranceForm!: FormGroup;
  paymentForm!: FormGroup;
  currentYear = new Date().getFullYear();

  // Update the type definitions to include 'loading'
  insuranceStatus: 'pending' | 'loading' | 'success' | 'error' = 'pending';
  paymentStatus: 'pending' | 'loading' | 'success' | 'error' = 'pending';

  // Store the created insurance information
  createdCarInsurance: any = null;
  calculatedPremium: number = 0;
  insuranceId?: number;

  fuelTypes = [
    { value: 'PETROL', label: 'Petrol' },
    { value: 'DIESEL', label: 'Diesel' },
    { value: 'ELECTRIC', label: 'Electric' },
    { value: 'HYBRID', label: 'Hybrid' },
    { value: 'LPG', label: 'LPG' }
  ];

  constructor(
    private fb: FormBuilder,
    private carInsuranceService: CarInsuranceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.carInsuranceForm = this.fb.group({
      vehicleInfo: this.fb.group({
        make: ['', Validators.required],
        model: ['', Validators.required],
      }),
      vehicleDetails: this.fb.group({
        year: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
        power: ['', [Validators.required, Validators.min(0)]],
        fuelType: ['', Validators.required],
      }),
      coverages: this.fb.group({
        ANTI_THEFT: [false],
        GLASS_AND_WINDOW: [false],
        WATER_DAMAGE: [false],
        FIRE_AND_EXPLOSION: [false],
        NATURAL_DISASTERS: [false],
        TENANT_LIABILITY: [false],
        ASSISTANCE_24_7: [false],
        NEW_FOR_OLD: [false],
        ELECTRICAL_DAMAGE: [false],
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

  prepareCarInsuranceData(): CarInsurance {
    const formValue = this.carInsuranceForm.value;
    return {
      ...formValue.vehicleInfo,
      ...formValue.vehicleDetails,
      coverages: formValue.coverages,
      additionalDetails: {
        ...formValue.additionalDetails
      }
    };
  }

  createCarInsurance() {
    if (this.carInsuranceForm.valid) {
      this.insuranceStatus = 'loading';
      const carInsuranceData = this.prepareCarInsuranceData();

      this.carInsuranceService.createCarInsurance(carInsuranceData).subscribe({
        next: (response) => {
          this.insuranceStatus = 'success';
          this.createdCarInsurance = response;
          this.insuranceId = response.id;

          // Calculate premium based on car details and coverages
          this.calculatePremium();
        },
        error: (error) => {
          this.insuranceStatus = 'error';
          console.error('Car insurance creation failed:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.carInsuranceForm);
    }
  }

  calculatePremium() {
    const formValue = this.carInsuranceForm.value;

    // Base premium
    let premium = 500;

    // Adjust for car age
    const age = this.currentYear - formValue.vehicleDetails.year;
    if (age <= 3) {
      premium += 300;
    } else if (age <= 7) {
      premium += 200;
    } else if (age <= 12) {
      premium += 100;
    }

    // Adjust for engine power
    if (formValue.vehicleDetails.power > 150) {
      premium += 250;
    } else if (formValue.vehicleDetails.power > 100) {
      premium += 150;
    } else if (formValue.vehicleDetails.power > 70) {
      premium += 50;
    }

    // Add for each selected coverage
    const coverages = formValue.coverages;
    let coverageCost = 0;

    for (const [key, value] of Object.entries(coverages)) {
      if (value === true) {
        switch (key) {
          case 'ANTI_THEFT':
          case 'GLASS_AND_WINDOW':
            coverageCost += 50;
            break;
          case 'WATER_DAMAGE':
          case 'ELECTRICAL_DAMAGE':
            coverageCost += 30;
            break;
          case 'FIRE_AND_EXPLOSION':
          case 'NATURAL_DISASTERS':
            coverageCost += 100;
            break;
          case 'TENANT_LIABILITY':
            coverageCost += 70;
            break;
          case 'ASSISTANCE_24_7':
            coverageCost += 80;
            break;
          case 'NEW_FOR_OLD':
            coverageCost += 120;
            break;
        }
      }
    }

    this.calculatedPremium = premium + coverageCost;
  }

  processPayment() {
    if (this.paymentForm.valid && this.insuranceId) {
      this.paymentStatus = 'loading';

      // Create payment intent
      this.carInsuranceService.createPaymentIntent(this.insuranceId).subscribe({
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

    this.carInsuranceService.confirmPayment(insuranceId).subscribe({
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
    this.createdCarInsurance = null;
    this.insuranceId = undefined;
    this.calculatedPremium = 0;
  }

  finishProcess() {
    if (this.paymentStatus === 'success') {
      this.carInsuranceForm.reset();
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

  get vehicleInfoForm() { return this.carInsuranceForm.get('vehicleInfo') as FormGroup; }
  get vehicleDetailsForm() { return this.carInsuranceForm.get('vehicleDetails') as FormGroup; }
  get coveragesForm() { return this.carInsuranceForm.get('coverages') as FormGroup; }
}
