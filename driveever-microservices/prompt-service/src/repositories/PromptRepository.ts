// Prompt Repository Implementation
// Extends BaseRepository for prompt-specific data access patterns

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/BaseRepository';
import { IPrompt, PromptCategory } from '../../../common/interfaces/prompt.interface';
import { PromptEntity } from '../entities/PromptEntity';

@Injectable()
export class PromptRepository extends BaseRepository<PromptEntity> {
  constructor(
    @InjectRepository(PromptEntity)
    private readonly promptRepository: Repository<PromptEntity>,
  ) {
    super(promptRepository);
  }

  /**
   * Find prompts by category
   */
  async findByCategory(category: PromptCategory): Promise<PromptEntity[]> {
    return await this.promptRepository.find({
      where: { category, isActive: true },
      order: { lastUpdated: 'DESC' },
    });
  }

  /**
   * Find active prompts
   */
  async findActivePrompts(): Promise<PromptEntity[]> {
    return await this.promptRepository.find({
      where: { isActive: true },
      order: { performance: { averageRating: 'DESC' } },
    });
  }

  /**
   * Find prompts by tags
   */
  async findByTags(tags: string[]): Promise<PromptEntity[]> {
    return await this.promptRepository
      .createQueryBuilder('prompt')
      .where('prompt.isActive = :isActive', { isActive: true })
      .andWhere('prompt.tags && :tags', { tags })
      .orderBy('prompt.performance.averageRating', 'DESC')
      .getMany();
  }

  /**
   * Find prompts by performance threshold
   */
  async findByPerformanceThreshold(minRating: number): Promise<PromptEntity[]> {
    return await this.promptRepository
      .createQueryBuilder('prompt')
      .where('prompt.isActive = :isActive', { isActive: true })
      .andWhere('prompt.performance.averageRating >= :minRating', { minRating })
      .orderBy('prompt.performance.averageRating', 'DESC')
      .getMany();
  }

  /**
   * Update prompt performance metrics
   */
  async updatePerformance(
    id: string,
    performance: Partial<IPrompt['performance']>
  ): Promise<void> {
    await this.promptRepository
      .createQueryBuilder()
      .update(PromptEntity)
      .set({
        performance: () => `jsonb_set(
          COALESCE(performance, '{}'::jsonb),
          '{averageRating}',
          '${performance.averageRating || 0}'::jsonb
        )`,
        lastUpdated: new Date(),
      })
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Find prompts by version
   */
  async findByVersion(version: string): Promise<PromptEntity[]> {
    return await this.promptRepository.find({
      where: { version, isActive: true },
    });
  }

  /**
   * Get prompt usage statistics
   */
  async getUsageStatistics(): Promise<{
    totalPrompts: number;
    activePrompts: number;
    averageRating: number;
    topCategory: PromptCategory;
  }> {
    const totalPrompts = await this.promptRepository.count();
    const activePrompts = await this.promptRepository.count({
      where: { isActive: true },
    });

    const avgRatingResult = await this.promptRepository
      .createQueryBuilder('prompt')
      .select('AVG((prompt.performance->>\'averageRating\')::float)', 'avgRating')
      .where('prompt.isActive = :isActive', { isActive: true })
      .getRawOne();

    const topCategoryResult = await this.promptRepository
      .createQueryBuilder('prompt')
      .select('prompt.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('prompt.isActive = :isActive', { isActive: true })
      .groupBy('prompt.category')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne();

    return {
      totalPrompts,
      activePrompts,
      averageRating: parseFloat(avgRatingResult?.avgRating || '0'),
      topCategory: topCategoryResult?.category || 'vehicle_advice',
    };
  }
}




