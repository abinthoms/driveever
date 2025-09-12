import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIController } from './controllers/ai.controller';
import { AIService } from './services/ai.service';
import { GeminiProvider } from './providers/gemini.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { ClaudeProvider } from './providers/claude.provider';
import { aiServiceDbConfig } from '../../database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(aiServiceDbConfig),
  ],
  controllers: [AIController],
  providers: [
    AIService,
    GeminiProvider,
    OpenAIProvider,
    ClaudeProvider,
  ],
  exports: [AIService],
})
export class AppModule {}




