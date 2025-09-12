// Service Integration Demo
// Shows how the microservices work together using the base repository pattern

import { MockPromptRepository } from './repository-pattern-demo';
import { IPrompt, PromptCategory } from '../common/interfaces/prompt.interface';
import { IOrder, OrderStatus } from '../common/interfaces/order.interface';
import { IAIResponse, AIProvider } from '../common/interfaces/ai-response.interface';

// Mock services to demonstrate integration
class MockPromptService {
  constructor(private promptRepo: MockPromptRepository) {}

  async getGoldenPrompt(category: PromptCategory): Promise<IPrompt | null> {
    const prompts = await this.promptRepo.findByCategory(category);
    return prompts.find(p => p.tags.includes('golden')) || prompts[0] || null;
  }

  async optimizePrompt(promptId: string): Promise<boolean> {
    const prompt = await this.promptRepo.findOne(promptId);
    if (!prompt) return false;

    // Simulate optimization
    await this.promptRepo.update(promptId, {
      performance: {
        ...prompt.performance,
        averageRating: Math.min(prompt.performance.averageRating + 0.5, 5.0),
        totalUses: prompt.performance.totalUses + 1,
      }
    });
    return true;
  }
}

class MockAIService {
  async generateResponse(
    prompt: IPrompt,
    question: string,
    provider: AIProvider = 'gemini'
  ): Promise<IAIResponse> {
    // Simulate AI response generation
    const startTime = Date.now();
    
    // Mock AI processing time
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    const responseTime = Date.now() - startTime;
    
    return {
      id: `ai_${Date.now()}`,
      promptId: prompt.id,
      userId: 'user_123',
      provider,
      question,
      answer: `AI Response for "${question}" using ${prompt.name}. This is a simulated response from ${provider}.`,
      confidence: 0.85 + Math.random() * 0.15,
      sources: ['Vehicle Database', 'MOT Records', 'Safety Standards'],
      responseTime,
      success: true,
      createdAt: new Date(),
      metadata: {
        sessionId: 'session_123',
        requestId: `req_${Date.now()}`,
      }
    };
  }
}

class MockOrderService {
  async createOrder(
    userId: string,
    aiResponse: IAIResponse,
    prompt: IPrompt
  ): Promise<IOrder> {
    return {
      id: `order_${Date.now()}`,
      userId,
      items: [{
        id: `item_${Date.now()}`,
        productId: prompt.id,
        productType: 'ai_response',
        name: prompt.name,
        description: prompt.description,
        quantity: 1,
        unitPrice: 0.50, // Free for demo
        totalPrice: 0.50,
        metadata: {
          promptTemplate: prompt.template,
          aiProvider: aiResponse.provider,
        }
      }],
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      totalAmount: 0.50,
      currency: 'USD',
      metadata: {
        vehicleData: { registration: 'AB12 CDE' },
        promptId: prompt.id,
        aiResponseId: aiResponse.id,
        sessionId: aiResponse.metadata?.sessionId,
      }
    };
  }
}

// Integration Demo
async function demonstrateServiceIntegration() {
  console.log('🔗 Service Integration Demo');
  console.log('==========================\n');

  // Initialize services
  const promptRepo = new MockPromptRepository();
  const promptService = new MockPromptService(promptRepo);
  const aiService = new MockAIService();
  const orderService = new MockOrderService();

  // 1. Create some sample prompts
  console.log('1. Setting up sample prompts...');
  const vehiclePrompt = await promptRepo.create({
    name: 'Golden Vehicle Advisor',
    description: 'Expert vehicle advice and recommendations',
    category: 'vehicle_advice',
    template: 'As a vehicle expert, provide advice for: {{userQuestion}}',
    variables: ['userQuestion'],
    expectedOutput: 'Comprehensive vehicle advice',
    tags: ['golden', 'vehicle', 'advice'],
  });

  const safetyPrompt = await promptRepo.create({
    name: 'Safety Assessment Expert',
    description: 'Vehicle safety evaluation and recommendations',
    category: 'safety_assessment',
    template: 'Assess safety for vehicle: {{vehicleData}}',
    variables: ['vehicleData'],
    expectedOutput: 'Safety assessment report',
    tags: ['safety', 'assessment'],
  });

  console.log('✅ Created', 2, 'sample prompts\n');

  // 2. User asks a question - simulate the flow
  console.log('2. User asks: "Is my car safe to drive?"');
  const userQuestion = 'Is my car safe to drive?';
  
  // 3. Select appropriate prompt
  console.log('3. Selecting appropriate prompt...');
  const selectedPrompt = await promptService.getGoldenPrompt('safety_assessment');
  console.log('✅ Selected prompt:', selectedPrompt?.name, '\n');

  // 4. Generate AI response
  console.log('4. Generating AI response...');
  const aiResponse = await aiService.generateResponse(
    selectedPrompt!,
    userQuestion,
    'gemini'
  );
  console.log('✅ AI Response generated in', aiResponse.responseTime, 'ms');
  console.log('   Confidence:', (aiResponse.confidence! * 100).toFixed(1) + '%');
  console.log('   Answer preview:', aiResponse.answer.substring(0, 100) + '...\n');

  // 5. Create order for the service
  console.log('5. Creating order for AI service...');
  const order = await orderService.createOrder(
    'user_123',
    aiResponse,
    selectedPrompt!
  );
  console.log('✅ Order created:', order.id);
  console.log('   Status:', order.status);
  console.log('   Total:', '$' + order.totalAmount, order.currency, '\n');

  // 6. Optimize prompt based on usage
  console.log('6. Optimizing prompt based on usage...');
  const optimized = await promptService.optimizePrompt(selectedPrompt!.id);
  console.log('✅ Prompt optimization:', optimized ? 'Applied' : 'Not needed', '\n');

  // 7. Show final prompt performance
  console.log('7. Final prompt performance:');
  const finalPrompt = await promptRepo.findOne(selectedPrompt!.id);
  console.log('   Average Rating:', finalPrompt?.performance.averageRating.toFixed(2));
  console.log('   Total Uses:', finalPrompt?.performance.totalUses);
  console.log('   Success Rate:', (finalPrompt?.performance.successRate! * 100).toFixed(1) + '%\n');

  console.log('🎉 Service Integration Demo Complete!');
  console.log('\nIntegration Flow Demonstrated:');
  console.log('1. User Question → Prompt Selection');
  console.log('2. Prompt + Question → AI Service');
  console.log('3. AI Response → Order Creation');
  console.log('4. Usage Data → Prompt Optimization');
  console.log('5. Performance Tracking → Continuous Improvement');
  console.log('\nThis demonstrates the complete microservices architecture');
  console.log('with consistent data access patterns and service integration.');
}

// Run the demo
if (require.main === module) {
  demonstrateServiceIntegration().catch(console.error);
}

export { MockPromptService, MockAIService, MockOrderService, demonstrateServiceIntegration };




