import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PromptRepository } from '../repositories/PromptRepository';
import { IPrompt, IPromptCreateRequest, IPromptUpdateRequest, PromptCategory } from '../../../common/interfaces/prompt.interface';
import { PromptEntity } from '../entities/PromptEntity';

@Injectable()
export class PromptService {
  constructor(private readonly promptRepository: PromptRepository) {}

  async getAllPrompts(category?: PromptCategory, active?: boolean): Promise<IPrompt[]> {
    const options: any = {};
    
    if (category) {
      options.category = category;
    }
    
    if (active !== undefined) {
      options.isActive = active;
    }

    return await this.promptRepository.findMany({ where: options });
  }

  async getPromptById(id: string): Promise<IPrompt> {
    const prompt = await this.promptRepository.findOne(id);
    if (!prompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }
    return prompt;
  }

  async createPrompt(createRequest: IPromptCreateRequest): Promise<IPrompt> {
    // Validate template variables
    this.validateTemplateVariables(createRequest.template, createRequest.variables);

    const promptData: Partial<PromptEntity> = {
      ...createRequest,
      performance: {
        averageRating: 0,
        totalUses: 0,
        successRate: 0,
        averageResponseTime: 0,
      },
      isActive: true,
    };

    return await this.promptRepository.create(promptData);
  }

  async updatePrompt(id: string, updateRequest: IPromptUpdateRequest): Promise<IPrompt> {
    const existingPrompt = await this.promptRepository.findOne(id);
    if (!existingPrompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }

    // Validate template variables if template is being updated
    if (updateRequest.template && updateRequest.variables) {
      this.validateTemplateVariables(updateRequest.template, updateRequest.variables);
    }

    await this.promptRepository.update(id, updateRequest);
    return await this.promptRepository.findOne(id);
  }

  async deletePrompt(id: string): Promise<void> {
    const prompt = await this.promptRepository.findOne(id);
    if (!prompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }

    await this.promptRepository.delete(id);
  }

  async getPromptsByCategory(category: PromptCategory): Promise<IPrompt[]> {
    return await this.promptRepository.findByCategory(category);
  }

  async getUsageStatistics(): Promise<{
    totalPrompts: number;
    activePrompts: number;
    averageRating: number;
    topCategory: PromptCategory;
  }> {
    return await this.promptRepository.getUsageStatistics();
  }

  async optimizePrompt(id: string): Promise<boolean> {
    const prompt = await this.promptRepository.findOne(id);
    if (!prompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }

    // Simple optimization logic - in a real implementation, this would be more sophisticated
    const currentRating = prompt.performance.averageRating;
    const totalUses = prompt.performance.totalUses;

    // Only optimize if the prompt has been used enough and has a low rating
    if (totalUses >= 10 && currentRating < 3.0) {
      // Update performance metrics (simplified)
      await this.promptRepository.updatePerformance(id, {
        averageRating: Math.min(currentRating + 0.5, 5.0),
        totalUses: totalUses,
        successRate: Math.min(prompt.performance.successRate + 0.1, 1.0),
        averageResponseTime: Math.max(prompt.performance.averageResponseTime - 100, 500),
      });
      return true;
    }

    return false;
  }

  private validateTemplateVariables(template: string, variables: string[]): void {
    // Check if all variables in the template are declared
    const templateVariables = template.match(/\{\{(\w+)\}\}/g);
    if (templateVariables) {
      const declaredVariables = templateVariables.map(v => v.replace(/\{\{|\}\}/g, ''));
      const missingVariables = declaredVariables.filter(v => !variables.includes(v));
      
      if (missingVariables.length > 0) {
        throw new BadRequestException(
          `Template contains undeclared variables: ${missingVariables.join(', ')}`
        );
      }
    }
  }
}




