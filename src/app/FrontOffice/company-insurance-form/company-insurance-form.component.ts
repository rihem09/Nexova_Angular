import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyInsuranceService } from '../services/company-insurance.service';
import { CompanyInsurance, PremisesOccupationType, InsuranceType } from '../models/company-insurance.model';

@Component({
  selector: 'app-company-insurance-form',
  templateUrl: './company-insurance-form.component.html',
  styleUrls: ['./company-insurance-form.component.css']
})
export class CompanyInsuranceFormComponent implements OnInit {
  companyDetailsForm!: FormGroup;
  businessDetailsForm!: FormGroup;
  coveragesForm!: FormGroup;
  paymentForm!: FormGroup;
  calculatedPremium: number = 0;
  insuranceStatus: 'pending' | 'loading' | 'success' | 'error' = 'pending';
  paymentStatus: 'pending' | 'loading' | 'success' | 'error' = 'pending';
  insuranceId: number | null = null;

  premisesTypes = [
    { value: PremisesOccupationType.OWNER, label: 'Owner' },
    { value: PremisesOccupationType.TENANT, label: 'Tenant' },
    { value: PremisesOccupationType.MIXED, label: 'Mixed' }
  ];

  insuranceTypes = [
    { value: InsuranceType.MULTI_RISK, label: 'Multi-Risk Insurance' },
    { value: InsuranceType.PROFESSIONAL_LIABILITY, label: 'Professional Liability' },
    { value: InsuranceType.CYBER_INSURANCE, label: 'Cyber Insurance' },
    { value: InsuranceType.PROPERTY_INSURANCE, label: 'Property Insurance' }
  ];

  industrySectors = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Education',
    'Food & Beverage',
    'Transportation',
    'Construction',
    'Energy',
    'Media & Entertainment'
  ];

  constructor(
    private fb: FormBuilder,
    private companyInsuranceService: CompanyInsuranceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.companyDetailsForm = this.fb.group({
      companyName: ['', Validators.required],
      industrySector: ['', Validators.required],
      taxRegistrationNumber: ['', Validators.required],
      headOfficeAddress: ['', Validators.required]
    });

    this.businessDetailsForm = this.fb.group({
      businessPremisesSize: ['', [Validators.required, Validators.min(0)]],
      numberOfEmployees: ['', [Validators.required, Validators.min(1)]],
      valueOfProfessionalEquipment: ['', [Validators.required, Validators.min(0)]],
      premisesOccupationType: ['', Validators.required],
      typeOfInsuranceRequired: ['', Validators.required],
      presenceOfSecuritySystem: [false]
    });

    this.coveragesForm = this.fb.group({
      FIRE_COVERAGE: [false],
      THEFT_COVERAGE: [false],
      LIABILITY_COVERAGE: [false],
      NATURAL_DISASTER_COVERAGE: [false]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      accountHolder: [''],
      iban: ['']
    });

    // Calculate premium whenever form values change
    this.businessDetailsForm.valueChanges.subscribe(() => {
      this.calculatePremium();
    });

    this.coveragesForm.valueChanges.subscribe(() => {
      this.calculatePremium();
    });
  }

  calculatePremium() {
    // Simple premium calculation logic - replace with your actual logic
    if (!this.businessDetailsForm.valid) return;

    const baseAmount = 1000;
    const businessDetails = this.businessDetailsForm.value;

    // Equipment value factor
    const equipmentValueFactor = businessDetails.valueOfProfessionalEquipment * 0.001;

    // Employee count factor
    const employeeFactor = businessDetails.numberOfEmployees * 50;

    // Premises size factor
    const premisesFactor = businessDetails.businessPremisesSize * 0.5;

    // Security system discount
    const securityDiscount = businessDetails.presenceOfSecuritySystem ? 0.9 : 1;

    // Coverage options factor
    const coveragesSelected = Object.values(this.coveragesForm.value).filter(Boolean).length;
    const coveragesFactor = 1 + (coveragesSelected * 0.15);

    this.calculatedPremium = (baseAmount + equipmentValueFactor + employeeFactor + premisesFactor) * coveragesFactor * securityDiscount;
  }

  createCompanyInsurance() {
    this.insuranceStatus = 'loading';

    if (this.companyDetailsForm.valid && this.businessDetailsForm.valid) {
      const insuranceData = this.prepareInsuranceData();

      this.companyInsuranceService.createCompanyInsurance(insuranceData).subscribe({
        next: (response) => {
          this.insuranceStatus = 'success';
          this.insuranceId = response.id || null;

          // Add premium to additional details
          if (response.id) {
            const updatedInsurance = {
              ...response,
              additionalDetails: {
                ...response.additionalDetails,
                premium_calculation: this.calculatedPremium.toString()
              }
            };

            this.companyInsuranceService.updateCompanyInsurance(response.id, updatedInsurance).subscribe();
          }
        },
        error: (error) => {
          console.error('Error creating company insurance', error);
          this.insuranceStatus = 'error';
        }
      });
    } else {
      this.markFormGroupTouched(this.companyDetailsForm);
      this.markFormGroupTouched(this.businessDetailsForm);
      this.insuranceStatus = 'error';
    }
  }

  prepareInsuranceData(): CompanyInsurance {
    const companyDetails = this.companyDetailsForm.value;
    const businessDetails = this.businessDetailsForm.value;
    const coverages = this.coveragesForm.value;

    return {
      ...companyDetails,
      ...businessDetails,
      insuranceOptions: {
        FIRE_COVERAGE: coverages.FIRE_COVERAGE,
        THEFT_COVERAGE: coverages.THEFT_COVERAGE,
        LIABILITY_COVERAGE: coverages.LIABILITY_COVERAGE,
        NATURAL_DISASTER_COVERAGE: coverages.NATURAL_DISASTER_COVERAGE
      },
      additionalDetails: {
        premium_calculation: this.calculatedPremium.toString()
      }
    };
  }

  resetInsuranceCreation() {
    this.insuranceStatus = 'pending';
  }

  processPayment() {
    if (this.paymentForm.valid && this.insuranceId) {
      this.paymentStatus = 'loading';

      this.companyInsuranceService.createPaymentIntent(this.insuranceId).subscribe({
        next: () => {
          this.confirmPayment();
        },
        error: (error) => {
          console.error('Error creating payment intent', error);
          this.paymentStatus = 'error';
        }
      });
    } else {
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  confirmPayment() {
    if (this.insuranceId) {
      this.companyInsuranceService.confirmPayment(this.insuranceId).subscribe({
        next: () => {
          this.paymentStatus = 'success';
        },
        error: (error) => {
          console.error('Error confirming payment', error);
          this.paymentStatus = 'error';
        }
      });
    }
  }

  finishProcess() {
    if (this.paymentStatus === 'success') {
      this.companyDetailsForm.reset();
      this.businessDetailsForm.reset();
      this.coveragesForm.reset();
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
}
