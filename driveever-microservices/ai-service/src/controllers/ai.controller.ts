// AI Service Controller
// RESTful API endpoints for AI functionality

import { Controller, Post, Get, Body, Query, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AIService } from '../services/ai.service';
import { IAIResponse, AIProvider } from '../../../common/interfaces/ai-response.interface';

interface GenerateRequestDto {
  prompt: string;
  question: string;
  provider?: AIProvider;
  context?: {
    promptId?: string;
    userId?: string;
    vehicleId?: string;
    vehicleData?: any;
    sessionId?: string;
    requestId?: string;
  };
}

interface GenerateMultipleRequestDto {
  prompt: string;
  question: string;
  providers: AIProvider[];
  context?: {
    promptId?: string;
    userId?: string;
    vehicleId?: string;
    vehicleData?: any;
    sessionId?: string;
    requestId?: string;
  };
}

@ApiTags('ai')
@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate AI response' })
  @ApiResponse({ status: 200, description: 'AI response generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 500, description: 'AI service error' })
  async generateResponse(@Body() request: GenerateRequestDto): Promise<IAIResponse> {
    try {
      const { prompt, question, provider = 'gemini', context } = request;
      
      if (!prompt || !question) {
        throw new HttpException('Prompt and question are required', HttpStatus.BAD_REQUEST);
      }

      return await this.aiService.generateResponse(prompt, question, provider, context);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to generate AI response',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('generate-with-fallback')
  @ApiOperation({ summary: 'Generate AI response with fallback' })
  @ApiResponse({ status: 200, description: 'AI response generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 500, description: 'All AI providers failed' })
  async generateResponseWithFallback(@Body() request: GenerateRequestDto): Promise<IAIResponse> {
    try {
      const { prompt, question, provider = 'gemini', context } = request;
      
      if (!prompt || !question) {
        throw new HttpException('Prompt and question are required', HttpStatus.BAD_REQUEST);
      }

      return await this.aiService.generateResponseWithFallback(prompt, question, provider, context);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to generate AI response',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('generate-multiple')
  @ApiOperation({ summary: 'Generate responses from multiple AI providers' })
  @ApiResponse({ status: 200, description: 'AI responses generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 500, description: 'AI service error' })
  async generateMultipleResponses(@Body() request: GenerateMultipleRequestDto): Promise<IAIResponse[]> {
    try {
      const { prompt, question, providers, context } = request;
      
      if (!prompt || !question) {
        throw new HttpException('Prompt and question are required', HttpStatus.BAD_REQUEST);
      }

      if (!providers || providers.length === 0) {
        throw new HttpException('At least one provider is required', HttpStatus.BAD_REQUEST);
      }

      return await this.aiService.generateMultipleResponses(prompt, question, providers, context);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to generate AI responses',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('providers')
  @ApiOperation({ summary: 'Get available AI providers' })
  @ApiResponse({ status: 200, description: 'Available providers retrieved successfully' })
  async getAvailableProviders(): Promise<{ providers: AIProvider[] }> {
    const providers = this.aiService.getAvailableProviders();
    return { providers };
  }

  @Get('providers/status')
  @ApiOperation({ summary: 'Get AI provider status' })
  @ApiResponse({ status: 200, description: 'Provider status retrieved successfully' })
  async getProviderStatus(): Promise<Record<AIProvider, boolean>> {
    return await this.aiService.getProviderStatus();
  }

  @Get('health')
  @ApiOperation({ summary: 'AI service health check' })
  @ApiResponse({ status: 200, description: 'Health status retrieved successfully' })
  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    providers: Record<AIProvider, boolean>;
    availableCount: number;
    totalCount: number;
  }> {
    return await this.aiService.healthCheck();
  }

  @Get('test')
  @ApiOperation({ summary: 'Test AI service with sample data' })
  @ApiQuery({ name: 'provider', required: false, enum: ['gemini', 'openai', 'claude'] })
  async testAI(@Query('provider') provider: AIProvider = 'gemini'): Promise<IAIResponse> {
    const testPrompt = `You are an expert vehicle advisor. Provide advice for: {{userQuestion}}`;
    const testQuestion = 'Is my car safe to drive?';
    const testContext = {
      promptId: 'test_prompt',
      userId: 'test_user',
      vehicleData: {
        make: 'Toyota',
        model: 'Corolla',
        year: '2020',
        mileage: 50000
      },
      sessionId: 'test_session',
      requestId: 'test_request'
    };

    return await this.aiService.generateResponse(testPrompt, testQuestion, provider, testContext);
  }
}




