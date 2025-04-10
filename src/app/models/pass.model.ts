
export class Pass {
    idPass!: number;
    price!: string;
    validFrom!: Date;
    validUntil!: Date;
    type!: PassType;
  }
  
  export enum PassType {
    TYPE1 = 'STANDARD',
    TYPE2 = 'VIP',
    TYPE3 = 'PREMIUM',
  }
  