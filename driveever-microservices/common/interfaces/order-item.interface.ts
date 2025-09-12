// Order Item Interface for DriveEver Microservices
// Defines individual items within an order

export interface IOrderItem {
  id: string; // UUID
  productId: string; // UUID
  productType: 'prompt' | 'ai_response' | 'vehicle_report' | 'subscription';
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  metadata?: {
    promptTemplate?: string;
    aiProvider?: 'gemini' | 'openai' | 'claude';
    vehicleRegistration?: string;
    subscriptionDuration?: number; // in months
  };
}




