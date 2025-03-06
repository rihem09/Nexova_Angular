// src/app/FrontOffice/models/car-insurance.model.ts
export interface CarInsurance {
  id?: number;

  // Mandatory Fields
  make: string;
  model: string;
  year: number;
  power: number;
  fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'LPG';

  // Coverages
  coverages: {
    ANTI_THEFT?: boolean;
    GLASS_AND_WINDOW?: boolean;
    WATER_DAMAGE?: boolean;
    FIRE_AND_EXPLOSION?: boolean;
    NATURAL_DISASTERS?: boolean;
    TENANT_LIABILITY?: boolean;
    ASSISTANCE_24_7?: boolean;
    NEW_FOR_OLD?: boolean;
    ELECTRICAL_DAMAGE?: boolean;
  };

  // Additional Details
  additionalDetails?: { [key: string]: string };

  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
}
