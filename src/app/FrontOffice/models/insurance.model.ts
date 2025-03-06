export interface Insurance {
  id?: number;

  // Mandatory Fields
  homeArea: number;
  numberOfRooms: number;
  homeType: 'APARTMENT' | 'DETACHED_HOUSE' | 'VILLA' | 'STUDIO';
  yearOfConstruction: number;
  fullAddress: string;
  occupancyType: 'PRIMARY_RESIDENCE' | 'SECONDARY_RESIDENCE' | 'RENTAL';
  insuredFurnitureValue: number;
  alarmSystem: boolean;

  // Optional Guarantees
  antiTheftProtection?: boolean;
  glassProtection?: boolean;
  waterDamageProtection?: boolean;
  fireExplosionProtection?: boolean;
  naturalDisasterProtection?: boolean;
  civilLiabilityProtection?: boolean;
  emergencyAssistance?: boolean;
  newValueProtection?: boolean;
  electricalDamageProtection?: boolean;

  // Insurance Type
  insuranceType: 'PROFESSIONAL' | 'PARTICULAR';

  // Additional Details
  additionalDetails?: { [key: string]: string };

  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
}
