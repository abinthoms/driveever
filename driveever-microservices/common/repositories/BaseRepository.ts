// Generic Base Repository Abstract Class for DriveEver Microservices
// Provides consistent data access patterns across all services using TypeORM

import { Repository, FindOptionsWhere, FindManyOptions, UpdateResult, DeleteResult } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseRepository<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  /**
   * Create a new entity
   */
  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create({
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    
    return await this.repository.save(entity);
  }

  /**
   * Find one entity by ID
   */
  async findOne(id: string): Promise<T | null> {
    return await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  /**
   * Find one entity by criteria
   */
  async findOneBy(criteria: FindOptionsWhere<T>): Promise<T | null> {
    return await this.repository.findOne({
      where: criteria,
    });
  }

  /**
   * Find multiple entities
   */
  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  /**
   * Find all entities
   */
  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  /**
   * Update entity by ID
   */
  async update(id: string, data: Partial<T>): Promise<UpdateResult> {
    return await this.repository.update(id, {
      ...data,
      updatedAt: new Date(),
    } as any);
  }

  /**
   * Update entity by criteria
   */
  async updateBy(criteria: FindOptionsWhere<T>, data: Partial<T>): Promise<UpdateResult> {
    return await this.repository.update(criteria, {
      ...data,
      updatedAt: new Date(),
    } as any);
  }

  /**
   * Delete entity by ID
   */
  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  /**
   * Delete entity by criteria
   */
  async deleteBy(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
    return await this.repository.delete(criteria);
  }

  /**
   * Soft delete entity by ID (if entity has deletedAt field)
   */
  async softDelete(id: string): Promise<UpdateResult> {
    return await this.repository.update(id, {
      deletedAt: new Date(),
    } as any);
  }

  /**
   * Count entities
   */
  async count(criteria?: FindOptionsWhere<T>): Promise<number> {
    return await this.repository.count({
      where: criteria,
    });
  }

  /**
   * Check if entity exists
   */
  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { id } as FindOptionsWhere<T>,
    });
    return count > 0;
  }

  /**
   * Find entities with pagination
   */
  async findWithPagination(
    page: number = 1,
    limit: number = 10,
    options?: FindManyOptions<T>
  ): Promise<{ data: T[]; total: number; page: number; limit: number; totalPages: number }> {
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.repository.findAndCount({
      ...options,
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get repository instance for advanced queries
   */
  getRepository(): Repository<T> {
    return this.repository;
  }
}




