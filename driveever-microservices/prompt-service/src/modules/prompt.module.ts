import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptController } from '../controllers/prompt.controller';
import { PromptService } from '../services/prompt.service';
import { PromptRepository } from '../repositories/PromptRepository';
import { PromptEntity } from '../entities/PromptEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PromptEntity]),
  ],
  controllers: [PromptController],
  providers: [
    PromptService,
    PromptRepository,
  ],
  exports: [PromptService, PromptRepository],
})
export class PromptModule {}




