import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PromptService } from '../services/prompt.service';
import { IPrompt, IPromptCreateRequest, IPromptUpdateRequest, PromptCategory } from '../../../common/interfaces/prompt.interface';

@ApiTags('prompts')
@Controller('prompts')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Get()
  @ApiOperation({ summary: 'Get all prompts' })
  @ApiQuery({ name: 'category', required: false, enum: PromptCategory })
  @ApiQuery({ name: 'active', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'List of prompts retrieved successfully' })
  async getAllPrompts(
    @Query('category') category?: PromptCategory,
    @Query('active') active?: boolean,
  ): Promise<IPrompt[]> {
    return await this.promptService.getAllPrompts(category, active);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get prompt by ID' })
  @ApiParam({ name: 'id', description: 'Prompt UUID' })
  @ApiResponse({ status: 200, description: 'Prompt retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Prompt not found' })
  async getPromptById(@Param('id') id: string): Promise<IPrompt> {
    return await this.promptService.getPromptById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new prompt' })
  @ApiResponse({ status: 201, description: 'Prompt created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createPrompt(@Body() createRequest: IPromptCreateRequest): Promise<IPrompt> {
    return await this.promptService.createPrompt(createRequest);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing prompt' })
  @ApiParam({ name: 'id', description: 'Prompt UUID' })
  @ApiResponse({ status: 200, description: 'Prompt updated successfully' })
  @ApiResponse({ status: 404, description: 'Prompt not found' })
  async updatePrompt(
    @Param('id') id: string,
    @Body() updateRequest: IPromptUpdateRequest,
  ): Promise<IPrompt> {
    return await this.promptService.updatePrompt(id, updateRequest);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prompt' })
  @ApiParam({ name: 'id', description: 'Prompt UUID' })
  @ApiResponse({ status: 200, description: 'Prompt deleted successfully' })
  @ApiResponse({ status: 404, description: 'Prompt not found' })
  async deletePrompt(@Param('id') id: string): Promise<{ message: string }> {
    await this.promptService.deletePrompt(id);
    return { message: 'Prompt deleted successfully' };
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get prompts by category' })
  @ApiParam({ name: 'category', enum: PromptCategory })
  @ApiResponse({ status: 200, description: 'Prompts retrieved successfully' })
  async getPromptsByCategory(@Param('category') category: PromptCategory): Promise<IPrompt[]> {
    return await this.promptService.getPromptsByCategory(category);
  }

  @Get('stats/usage')
  @ApiOperation({ summary: 'Get prompt usage statistics' })
  @ApiResponse({ status: 200, description: 'Usage statistics retrieved successfully' })
  async getUsageStatistics(): Promise<{
    totalPrompts: number;
    activePrompts: number;
    averageRating: number;
    topCategory: PromptCategory;
  }> {
    return await this.promptService.getUsageStatistics();
  }

  @Post(':id/optimize')
  @ApiOperation({ summary: 'Optimize prompt performance' })
  @ApiParam({ name: 'id', description: 'Prompt UUID' })
  @ApiResponse({ status: 200, description: 'Prompt optimization completed' })
  async optimizePrompt(@Param('id') id: string): Promise<{ message: string; optimized: boolean }> {
    const result = await this.promptService.optimizePrompt(id);
    return {
      message: result ? 'Prompt optimized successfully' : 'No optimization needed',
      optimized: result,
    };
  }
}




