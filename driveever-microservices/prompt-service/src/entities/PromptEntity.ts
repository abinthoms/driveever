// Prompt Entity for TypeORM
// Maps to the database table for prompt storage

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { IPrompt, PromptCategory } from '../../../common/interfaces/prompt.interface';

@Entity('prompts')
@Index(['category', 'isActive'])
@Index(['isActive', 'performance'])
export class PromptEntity implements IPrompt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ 
    type: 'enum', 
    enum: [
      'vehicle_advice',
      'safety_assessment', 
      'maintenance_guidance',
      'cost_analysis',
      'purchase_recommendation',
      'technical_support',
      'general_inquiry',
      'emergency_guidance',
      'insurance_advice'
    ] as PromptCategory[]
  })
  category: PromptCategory;

  @Column({ type: 'varchar', length: 20 })
  version: string;

  @Column({ type: 'text' })
  template: string;

  @Column({ type: 'json' })
  variables: string[];

  @Column({ type: 'text' })
  expectedOutput: string;

  @Column({ type: 'json' })
  performance: IPrompt['performance'];

  @Column({ type: 'json' })
  tags: string[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'json', nullable: true })
  metadata?: IPrompt['metadata'];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdated: Date;
}




