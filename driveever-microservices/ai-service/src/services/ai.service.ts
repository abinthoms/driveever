// Main AI Service
// Orchestrates all AI providers and manages responses

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiProvider } from '../providers/gemini.provider';
import { OpenAIProvider } from '../providers/openai.provider';
import { ClaudeProvider } from '../providers/claude.provider';
import { IAIResponse, AIProvider } from '../../../common/interfaces/ai-response.interface';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private providers: Map<AIProvider, any> = new Map();

  constructor(
    private configService: ConfigService,
    private geminiProvider: GeminiProvider,
    private openaiProvider: OpenAIProvider,
    private claudeProvider: ClaudeProvider,
  ) {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize available providers
    if (this.geminiProvider.isAvailable()) {
      this.providers.set('gemini', this.geminiProvider);
      this.logger.log('Gemini provider initialized');
    }

    if (this.openaiProvider.isAvailable()) {
      this.providers.set('openai', this.openaiProvider);
      this.logger.log('OpenAI provider initialized');
    }

    if (this.claudeProvider.isAvailable()) {
      this.providers.set('claude', this.claudeProvider);
      this.logger.log('Claude provider initialized');
    }

    this.logger.log(`Initialized ${this.providers.size} AI providers`);
  }

  async generateResponse(
    prompt: string,
    question: string,
    provider: AIProvider = 'gemini',
    context?: any
  ): Promise<IAIResponse> {
    const startTime = Date.now();
    
    try {
      // Check if requested provider is available
      if (!this.providers.has(provider)) {
        // Fallback to first available provider
        const availableProviders = Array.from(this.providers.keys());
        if (availableProviders.length === 0) {
          throw new Error('No AI providers available');
        }
        
        provider = availableProviders[0];
        this.logger.warn(`Requested provider not available, using fallback: ${provider}`);
      }

      const providerInstance = this.providers.get(provider);
      const response = await providerInstance.generateResponse(prompt, question, context);
      
      const totalTime = Date.now() - startTime;
      this.logger.log(`AI response generated in ${totalTime}ms using ${provider}`);

      return response;

    } catch (error) {
      this.logger.error('AI Service error:', error);
      
      return {
        id: `ai_error_${Date.now()}`,
        promptId: context?.promptId || 'unknown',
        userId: context?.userId || 'anonymous',
        vehicleId: context?.vehicleId,
        provider,
        question,
        answer: '',
        responseTime: Date.now() - startTime,
        success: false,
        error: error.message,
        createdAt: new Date(),
        metadata: {
          sessionId: context?.sessionId,
          requestId: context?.requestId,
          error: error.message,
        }
      };
    }
  }

  async generateResponseWithFallback(
    prompt: string,
    question: string,
    preferredProvider: AIProvider = 'gemini',
    context?: any
  ): Promise<IAIResponse> {
    const providers = this.getAvailableProviders();
    
    if (providers.length === 0) {
      throw new Error('No AI providers available');
    }

    // Try preferred provider first
    if (providers.includes(preferredProvider)) {
      try {
        return await this.generateResponse(prompt, question, preferredProvider, context);
      } catch (error) {
        this.logger.warn(`Preferred provider ${preferredProvider} failed, trying fallbacks`);
      }
    }

    // Try other providers in order
    for (const provider of providers) {
      if (provider !== preferredProvider) {
        try {
          return await this.generateResponse(prompt, question, provider, context);
        } catch (error) {
          this.logger.warn(`Provider ${provider} failed, trying next`);
        }
      }
    }

    throw new Error('All AI providers failed');
  }

  async generateMultipleResponses(
    prompt: string,
    question: string,
    providers: AIProvider[],
    context?: any
  ): Promise<IAIResponse[]> {
    const responses: IAIResponse[] = [];
    
    for (const provider of providers) {
      if (this.providers.has(provider)) {
        try {
          const response = await this.generateResponse(prompt, question, provider, context);
          responses.push(response);
        } catch (error) {
          this.logger.warn(`Provider ${provider} failed:`, error.message);
        }
      }
    }

    return responses;
  }

  getAvailableProviders(): AIProvider[] {
    return Array.from(this.providers.keys());
  }

  isProviderAvailable(provider: AIProvider): boolean {
    return this.providers.has(provider);
  }

  async getProviderStatus(): Promise<Record<AIProvider, boolean>> {
    const status: Record<AIProvider, boolean> = {
      gemini: this.providers.has('gemini'),
      openai: this.providers.has('openai'),
      claude: this.providers.has('claude'),
    };

    return status;
  }

  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    providers: Record<AIProvider, boolean>;
    availableCount: number;
    totalCount: number;
  }> {
    const providers = await this.getProviderStatus();
    const availableCount = Object.values(providers).filter(Boolean).length;
    const totalCount = Object.keys(providers).length;

    let status: 'healthy' | 'degraded' | 'unhealthy';
    if (availableCount === totalCount) {
      status = 'healthy';
    } else if (availableCount > 0) {
      status = 'degraded';
    } else {
      status = 'unhealthy';
    }

    return {
      status,
      providers,
      availableCount,
      totalCount,
    };
  }
}




