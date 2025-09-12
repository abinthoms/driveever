// Core Order Interface for DriveEver Microservices
// Defines the contract for order-related data across all services

import { IOrderItem } from './order-item.interface';
import { OrderStatus } from '../enums/order-status.enum';

export interface IOrder {
  id: string; // UUID
  userId: string; // UUID
  items: IOrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
  currency: string;
  metadata?: {
    vehicleData?: any;
    promptId?: string;
    aiResponseId?: string;
    sessionId?: string;
  };
}

export interface IOrderCreateRequest {
  userId: string;
  items: Omit<IOrderItem, 'id'>[];
  metadata?: IOrder['metadata'];
}

export interface IOrderUpdateRequest {
  status?: OrderStatus;
  metadata?: Partial<IOrder['metadata']>;
}

export interface IOrderResponse extends IOrder {
  // Additional response fields
  estimatedDelivery?: Date;
  trackingNumber?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
}




