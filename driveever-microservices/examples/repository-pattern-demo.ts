// Base Repository Pattern Demo
// Demonstrates how to use the BaseRepository for consistent data access

import { BaseRepository } from '../common/repositories/BaseRepository';
import { IPrompt, PromptCategory } from '../common/interfaces/prompt.interface';

// Mock Repository for demonstration (in real app, this would use TypeORM)
class MockPromptRepository extends BaseRepository<IPrompt> {
  private data: Map<string, IPrompt> = new Map();

  constructor() {
    super(null as any); // Mock implementation
  }

  async create(data: Partial<IPrompt>): Promise<IPrompt> {
    const id = `prompt_${Date.now()}`;
    const prompt: IPrompt = {
      id,
      name: data.name || 'Untitled Prompt',
      description: data.description || '',
      category: data.category || 'vehicle_advice',
      version: data.version || '1.0.0',
      template: data.template || '',
      variables: data.variables || [],
      expectedOutput: data.expectedOutput || '',
      performance: data.performance || {
        averageRating: 0,
        totalUses: 0,
        successRate: 0,
        averageResponseTime: 0,
      },
      tags: data.tags || [],
      lastUpdated: new Date(),
      createdAt: new Date(),
      isActive: data.isActive ?? true,
      metadata: data.metadata,
    };
    
    this.data.set(id, prompt);
    return prompt;
  }

  async findOne(id: string): Promise<IPrompt | null> {
    return this.data.get(id) || null;
  }

  async findMany(options?: any): Promise<IPrompt[]> {
    return Array.from(this.data.values());
  }

  async update(id: string, data: Partial<IPrompt>): Promise<any> {
    const existing = this.data.get(id);
    if (existing) {
      const updated = { ...existing, ...data, lastUpdated: new Date() };
      this.data.set(id, updated);
      return { affected: 1 };
    }
    return { affected: 0 };
  }

  async delete(id: string): Promise<any> {
    return this.data.delete(id) ? { affected: 1 } : { affected: 0 };
  }

  async count(criteria?: any): Promise<number> {
    return this.data.size;
  }

  // Custom methods specific to prompts
  async findByCategory(category: PromptCategory): Promise<IPrompt[]> {
    return Array.from(this.data.values()).filter(p => p.category === category);
  }

  async findActivePrompts(): Promise<IPrompt[]> {
    return Array.from(this.data.values()).filter(p => p.isActive);
  }
}

// Demo usage
async function demonstrateRepositoryPattern() {
  console.log('🏗️  Base Repository Pattern Demo');
  console.log('================================\n');

  const promptRepo = new MockPromptRepository();

  // 1. Create a new prompt
  console.log('1. Creating a new prompt...');
  const newPrompt = await promptRepo.create({
    name: 'Golden Vehicle Advisor',
    description: 'The primary optimized prompt for vehicle advice',
    category: 'vehicle_advice',
    template: 'You are an expert vehicle advisor. Help with: {{userQuestion}}',
    variables: ['userQuestion'],
    expectedOutput: 'Comprehensive vehicle advice',
    tags: ['golden', 'vehicle', 'advice'],
  });
  console.log('✅ Created:', newPrompt.name, '(ID:', newPrompt.id, ')\n');

  // 2. Find the prompt by ID
  console.log('2. Finding prompt by ID...');
  const foundPrompt = await promptRepo.findOne(newPrompt.id);
  console.log('✅ Found:', foundPrompt?.name, '\n');

  // 3. Update the prompt
  console.log('3. Updating prompt...');
  await promptRepo.update(newPrompt.id, {
    description: 'Updated: The most optimized prompt for vehicle advice',
    tags: ['golden', 'vehicle', 'advice', 'optimized'],
  });
  const updatedPrompt = await promptRepo.findOne(newPrompt.id);
  console.log('✅ Updated description:', updatedPrompt?.description, '\n');

  // 4. Find prompts by category
  console.log('4. Finding prompts by category...');
  const vehiclePrompts = await promptRepo.findByCategory('vehicle_advice');
  console.log('✅ Found', vehiclePrompts.length, 'vehicle advice prompts\n');

  // 5. Get all active prompts
  console.log('5. Getting all active prompts...');
  const activePrompts = await promptRepo.findActivePrompts();
  console.log('✅ Found', activePrompts.length, 'active prompts\n');

  // 6. Count total prompts
  console.log('6. Counting total prompts...');
  const totalCount = await promptRepo.count();
  console.log('✅ Total prompts:', totalCount, '\n');

  // 7. Create another prompt for demonstration
  console.log('7. Creating another prompt...');
  const safetyPrompt = await promptRepo.create({
    name: 'Safety Assessment Prompt',
    description: 'Prompt for vehicle safety evaluation',
    category: 'safety_assessment',
    template: 'Assess the safety of this vehicle: {{vehicleData}}',
    variables: ['vehicleData'],
    expectedOutput: 'Safety assessment report',
    tags: ['safety', 'assessment'],
  });
  console.log('✅ Created:', safetyPrompt.name, '\n');

  // 8. Demonstrate pagination (simulated)
  console.log('8. Demonstrating pagination...');
  const allPrompts = await promptRepo.findMany();
  const pageSize = 1;
  const page = 1;
  const startIndex = (page - 1) * pageSize;
  const paginatedPrompts = allPrompts.slice(startIndex, startIndex + pageSize);
  console.log('✅ Page', page, 'of', Math.ceil(allPrompts.length / pageSize), 'prompts:', paginatedPrompts.map(p => p.name), '\n');

  console.log('🎉 Repository Pattern Demo Complete!');
  console.log('\nKey Benefits Demonstrated:');
  console.log('• Consistent CRUD operations across all entities');
  console.log('• Type-safe data access with TypeScript');
  console.log('• Extensible with custom methods per entity');
  console.log('• Built-in pagination, counting, and filtering');
  console.log('• Easy to mock for testing');
  console.log('• Follows the Repository pattern for clean architecture');
}

// Run the demo
if (require.main === module) {
  demonstrateRepositoryPattern().catch(console.error);
}

export { MockPromptRepository, demonstrateRepositoryPattern };




