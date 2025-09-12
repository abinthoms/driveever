// Vehicle Interface for DriveEver Microservices
// Defines the contract for vehicle-related data across all services

export interface IVehicle {
  id: string; // UUID
  registrationNumber: string;
  make: string;
  model: string;
  manufactureYear: string;
  primaryColour: string;
  motStatus: string;
  motExpiryDate?: string;
  taxStatus: string;
  taxDueDate?: string;
  engineSize: string;
  fuelType: string;
  motAdvisories?: string[];
  motFailures?: string[];
  mileageHistory?: number[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    ownerId?: string;
    insuranceProvider?: string;
    lastServiceDate?: Date;
    nextServiceDue?: Date;
  };
}

export interface IVehicleCreateRequest {
  registrationNumber: string;
  make: string;
  model: string;
  manufactureYear: string;
  primaryColour: string;
  motStatus: string;
  motExpiryDate?: string;
  taxStatus: string;
  taxDueDate?: string;
  engineSize: string;
  fuelType: string;
  motAdvisories?: string[];
  motFailures?: string[];
  metadata?: IVehicle['metadata'];
}

export interface IVehicleUpdateRequest {
  motStatus?: string;
  motExpiryDate?: string;
  taxStatus?: string;
  taxDueDate?: string;
  motAdvisories?: string[];
  motFailures?: string[];
  mileageHistory?: number[];
  metadata?: Partial<IVehicle['metadata']>;
}




