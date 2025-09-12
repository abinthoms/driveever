// Prompt Interface for DriveEver Microservices
// Defines the contract for prompt-related data across all services

export interface IPrompt {
  id: string; // UUID
  name: string;
  description: string;
  category: PromptCategory;
  version: string;
  template: string;
  variables: string[];
  expectedOutput: string;
  performance: IPromptPerformance;
  tags: string[];
  lastUpdated: Date;
  createdAt: Date;
  isActive: boolean;
  metadata?: {
    author?: string;
    source?: string;
    optimizationLevel?: 'basic' | 'intermediate' | 'advanced';
    testResults?: any;
  };
}

export interface IPromptPerformance {
  averageRating: number;
  totalUses: number;
  successRate: number;
  averageResponseTime: number;
  lastTested?: Date;
}

export type PromptCategory =
  | 'vehicle_advice'
  | 'safety_assessment'
  | 'maintenance_guidance'
  | 'cost_analysis'
  | 'purchase_recommendation'
  | 'technical_support'
  | 'general_inquiry'
  | 'emergency_guidance'
  | 'insurance_advice';

export interface IPromptCreateRequest {
  name: string;
  description: string;
  category: PromptCategory;
  template: string;
  variables: string[];
  expectedOutput: string;
  tags: string[];
  metadata?: IPrompt['metadata'];
}

export interface IPromptUpdateRequest {
  name?: string;
  description?: string;
  template?: string;
  variables?: string[];
  expectedOutput?: string;
  tags?: string[];
  isActive?: boolean;
  metadata?: Partial<IPrompt['metadata']>;
}




