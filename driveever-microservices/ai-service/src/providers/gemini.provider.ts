// Google Gemini AI Provider
// Real integration with Google's Gemini API

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAIResponse, AIProvider } from '../../../common/interfaces/ai-response.interface';

@Injectable()
export class GeminiProvider {
  private readonly logger = new Logger(GeminiProvider.name);
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      this.logger.warn('GEMINI_API_KEY not found, Gemini provider will be disabled');
      return;
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(
    prompt: string,
    question: string,
    context?: any
  ): Promise<IAIResponse> {
    const startTime = Date.now();
    
    try {
      if (!this.model) {
        throw new Error('Gemini provider not initialized - API key missing');
      }

      // Prepare the full prompt with context
      const fullPrompt = this.buildFullPrompt(prompt, question, context);
      
      // Generate response
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      const responseTime = Date.now() - startTime;

      return {
        id: `gemini_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        promptId: context?.promptId || 'unknown',
        userId: context?.userId || 'anonymous',
        vehicleId: context?.vehicleId,
        provider: 'gemini' as AIProvider,
        question,
        answer: text,
        confidence: this.calculateConfidence(text),
        sources: this.extractSources(text),
        responseTime,
        success: true,
        createdAt: new Date(),
        metadata: {
          sessionId: context?.sessionId,
          requestId: context?.requestId,
          model: 'gemini-pro',
          usage: {
            promptTokens: this.estimateTokens(fullPrompt),
            completionTokens: this.estimateTokens(text),
            totalTokens: this.estimateTokens(fullPrompt) + this.estimateTokens(text),
          }
        }
      };

    } catch (error) {
      this.logger.error('Gemini API error:', error);
      
      return {
        id: `gemini_error_${Date.now()}`,
        promptId: context?.promptId || 'unknown',
        userId: context?.userId || 'anonymous',
        vehicleId: context?.vehicleId,
        provider: 'gemini' as AIProvider,
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

  private buildFullPrompt(template: string, question: string, context?: any): string {
    let fullPrompt = template;
    
    // Replace template variables
    if (context?.vehicleData) {
      fullPrompt = fullPrompt.replace(/\{\{vehicleData\}\}/g, JSON.stringify(context.vehicleData));
    }
    if (context?.userQuestion) {
      fullPrompt = fullPrompt.replace(/\{\{userQuestion\}\}/g, context.userQuestion);
    }
    if (question) {
      fullPrompt = fullPrompt.replace(/\{\{userQuestion\}\}/g, question);
    }
    
    // Add context information
    if (context?.vehicleData) {
      fullPrompt += `\n\nVehicle Information:\n${JSON.stringify(context.vehicleData, null, 2)}`;
    }
    
    return fullPrompt;
  }

  private calculateConfidence(text: string): number {
    // Simple confidence calculation based on response length and content
    const minConfidence = 0.7;
    const maxConfidence = 0.95;
    
    if (text.length < 50) return minConfidence;
    if (text.length > 500) return maxConfidence;
    
    // Check for specific indicators of quality
    const qualityIndicators = [
      'based on', 'according to', 'recommend', 'suggest', 'consider',
      'important', 'safety', 'maintenance', 'inspection'
    ];
    
    const indicatorCount = qualityIndicators.filter(indicator => 
      text.toLowerCase().includes(indicator)
    ).length;
    
    return Math.min(maxConfidence, minConfidence + (indicatorCount * 0.05));
  }

  private extractSources(text: string): string[] {
    const sources = [];
    
    // Look for common source indicators
    const sourcePatterns = [
      /(?:source|reference|according to|based on):\s*([^.\n]+)/gi,
      /(?:see|refer to|check):\s*([^.\n]+)/gi,
    ];
    
    sourcePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const source = match.replace(/^(?:source|reference|according to|based on|see|refer to|check):\s*/i, '').trim();
          if (source && !sources.includes(source)) {
            sources.push(source);
          }
        });
      }
    });
    
    // Default sources if none found
    if (sources.length === 0) {
      sources.push('Vehicle Database', 'MOT Records', 'Safety Standards');
    }
    
    return sources;
  }

  private estimateTokens(text: string): number {
    // Rough estimation: 1 token ≈ 4 characters for English text
    return Math.ceil(text.length / 4);
  }

  isAvailable(): boolean {
    return !!this.model;
  }
}




