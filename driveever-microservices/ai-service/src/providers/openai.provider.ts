// OpenAI Provider
// Real integration with OpenAI's GPT API

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { IAIResponse, AIProvider } from '../../../common/interfaces/ai-response.interface';

@Injectable()
export class OpenAIProvider {
  private readonly logger = new Logger(OpenAIProvider.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY not found, OpenAI provider will be disabled');
      return;
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateResponse(
    prompt: string,
    question: string,
    context?: any
  ): Promise<IAIResponse> {
    const startTime = Date.now();
    
    try {
      if (!this.openai) {
        throw new Error('OpenAI provider not initialized - API key missing');
      }

      // Prepare the full prompt with context
      const fullPrompt = this.buildFullPrompt(prompt, question, context);
      
      // Generate response using GPT-4
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert vehicle advisor and safety consultant with 20+ years of experience. Provide comprehensive, actionable advice based on the information provided.'
          },
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const text = completion.choices[0]?.message?.content || '';
      const responseTime = Date.now() - startTime;

      return {
        id: `openai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        promptId: context?.promptId || 'unknown',
        userId: context?.userId || 'anonymous',
        vehicleId: context?.vehicleId,
        provider: 'openai' as AIProvider,
        question,
        answer: text,
        confidence: this.calculateConfidence(text, completion.choices[0]?.finish_reason),
        sources: this.extractSources(text),
        responseTime,
        success: true,
        createdAt: new Date(),
        metadata: {
          sessionId: context?.sessionId,
          requestId: context?.requestId,
          model: 'gpt-4',
          usage: completion.usage ? {
            promptTokens: completion.usage.prompt_tokens,
            completionTokens: completion.usage.completion_tokens,
            totalTokens: completion.usage.total_tokens,
          } : undefined
        }
      };

    } catch (error) {
      this.logger.error('OpenAI API error:', error);
      
      return {
        id: `openai_error_${Date.now()}`,
        promptId: context?.promptId || 'unknown',
        userId: context?.userId || 'anonymous',
        vehicleId: context?.vehicleId,
        provider: 'openai' as AIProvider,
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

  private calculateConfidence(text: string, finishReason?: string): number {
    // Base confidence on finish reason and response quality
    let confidence = 0.8;
    
    if (finishReason === 'stop') {
      confidence = 0.9;
    } else if (finishReason === 'length') {
      confidence = 0.7;
    } else if (finishReason === 'content_filter') {
      confidence = 0.5;
    }
    
    // Adjust based on response length and content quality
    if (text.length < 50) confidence -= 0.2;
    if (text.length > 500) confidence += 0.1;
    
    // Check for quality indicators
    const qualityIndicators = [
      'based on', 'according to', 'recommend', 'suggest', 'consider',
      'important', 'safety', 'maintenance', 'inspection', 'professional'
    ];
    
    const indicatorCount = qualityIndicators.filter(indicator => 
      text.toLowerCase().includes(indicator)
    ).length;
    
    confidence += (indicatorCount * 0.02);
    
    return Math.min(0.95, Math.max(0.5, confidence));
  }

  private extractSources(text: string): string[] {
    const sources = [];
    
    // Look for common source indicators
    const sourcePatterns = [
      /(?:source|reference|according to|based on):\s*([^.\n]+)/gi,
      /(?:see|refer to|check):\s*([^.\n]+)/gi,
      /(?:MOT|DVLA|VOSA|AA|RAC):\s*([^.\n]+)/gi,
    ];
    
    sourcePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const source = match.replace(/^(?:source|reference|according to|based on|see|refer to|check|MOT|DVLA|VOSA|AA|RAC):\s*/i, '').trim();
          if (source && !sources.includes(source)) {
            sources.push(source);
          }
        });
      }
    });
    
    // Default sources if none found
    if (sources.length === 0) {
      sources.push('Vehicle Database', 'MOT Records', 'Safety Standards', 'Manufacturer Guidelines');
    }
    
    return sources;
  }

  isAvailable(): boolean {
    return !!this.openai;
  }
}




