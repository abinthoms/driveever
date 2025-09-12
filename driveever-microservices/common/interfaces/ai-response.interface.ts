// AI Response Interface for DriveEver Microservices
// Defines the contract for AI response data across all services

export interface IAIResponse {
  id: string; // UUID
  promptId: string; // UUID
  vehicleId?: string; // UUID
  userId: string; // UUID
  provider: AIProvider;
  question: string;
  answer: string;
  confidence?: number;
  sources?: string[];
  responseTime: number;
  success: boolean;
  error?: string;
  createdAt: Date;
  metadata?: {
    sessionId?: string;
    requestId?: string;
    optimizationData?: any;
    securityData?: any;
    versionData?: any;
  };
}

export type AIProvider = 'gemini' | 'openai' | 'claude';

export interface IAIResponseCreateRequest {
  promptId: string;
  vehicleId?: string;
  userId: string;
  provider: AIProvider;
  question: string;
  context?: any;
}

export interface IAIResponseUpdateRequest {
  answer?: string;
  confidence?: number;
  sources?: string[];
  success?: boolean;
  error?: string;
  metadata?: Partial<IAIResponse['metadata']>;
}




