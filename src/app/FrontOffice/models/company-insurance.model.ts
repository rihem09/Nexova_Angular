export interface CompanyInsurance {
  id?: number;
  companyName: string;
  industrySector: string;
  taxRegistrationNumber: string;
  headOfficeAddress: string;
  businessPremisesSize: number;
  numberOfEmployees: number;
  valueOfProfessionalEquipment: number;
  premisesOccupationType: PremisesOccupationType;
  typeOfInsuranceRequired: InsuranceType;
  presenceOfSecuritySystem: boolean;
  insuranceOptions: InsuranceOptions;
  additionalDetails?: Record<string, string>;
}

export enum PremisesOccupationType {
  OWNER = 'OWNER',
  TENANT = 'TENANT',
  MIXED = 'MIXED'
}

export enum InsuranceType {
  MULTI_RISK = 'MULTI_RISK',
  PROFESSIONAL_LIABILITY = 'PROFESSIONAL_LIABILITY',
  CYBER_INSURANCE = 'CYBER_INSURANCE',
  PROPERTY_INSURANCE = 'PROPERTY_INSURANCE'
}

export interface InsuranceOptions {
  FIRE_COVERAGE: boolean;
  THEFT_COVERAGE: boolean;
  LIABILITY_COVERAGE: boolean;
  NATURAL_DISASTER_COVERAGE: boolean;
}
