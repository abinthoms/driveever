// DriveEver Microservices Test Script
// Tests all services and their integrations

const axios = require('axios');

const services = [
  { name: 'Gateway', url: 'http://localhost:3000', healthPath: '/health' },
  { name: 'Prompt Service', url: 'http://localhost:3001', healthPath: '/health' },
  { name: 'AI Service', url: 'http://localhost:3002', healthPath: '/health' },
  { name: 'Analytics Service', url: 'http://localhost:3003', healthPath: '/health' },
  { name: 'User Service', url: 'http://localhost:3004', healthPath: '/health' },
  { name: 'Vehicle Service', url: 'http://localhost:3005', healthPath: '/health' },
  { name: 'Notification Service', url: 'http://localhost:3006', healthPath: '/health' },
];

const monitoring = [
  { name: 'Prometheus', url: 'http://localhost:9090', healthPath: '/-/healthy' },
  { name: 'Grafana', url: 'http://localhost:3001', healthPath: '/api/health' },
];

async function testService(service) {
  try {
    const response = await axios.get(`${service.url}${service.healthPath}`, {
      timeout: 5000,
    });
    
    if (response.status === 200) {
      console.log(`✅ ${service.name}: Healthy (${response.status})`);
      return true;
    } else {
      console.log(`❌ ${service.name}: Unhealthy (${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${service.name}: Error - ${error.message}`);
    return false;
  }
}

async function testAIService() {
  try {
    console.log('\n🤖 Testing AI Service functionality...');
    
    // Test AI provider status
    const statusResponse = await axios.get('http://localhost:3002/ai/providers/status');
    console.log('📊 AI Provider Status:', statusResponse.data);
    
    // Test AI generation
    const testResponse = await axios.post('http://localhost:3002/ai/test', {
      provider: 'gemini'
    });
    
    if (testResponse.data.success) {
      console.log('✅ AI Generation Test: Success');
      console.log(`   Response: ${testResponse.data.answer.substring(0, 100)}...`);
      console.log(`   Confidence: ${(testResponse.data.confidence * 100).toFixed(1)}%`);
      console.log(`   Response Time: ${testResponse.data.responseTime}ms`);
    } else {
      console.log('❌ AI Generation Test: Failed');
    }
    
    return testResponse.data.success;
  } catch (error) {
    console.log(`❌ AI Service Test: Error - ${error.message}`);
    return false;
  }
}

async function testPromptService() {
  try {
    console.log('\n📝 Testing Prompt Service functionality...');
    
    // Test getting all prompts
    const promptsResponse = await axios.get('http://localhost:3001/prompts');
    console.log(`✅ Prompts Retrieved: ${promptsResponse.data.length} prompts`);
    
    // Test creating a new prompt
    const newPrompt = {
      name: 'Test Prompt',
      description: 'A test prompt for verification',
      category: 'vehicle_advice',
      template: 'Test template for {{userQuestion}}',
      variables: ['userQuestion'],
      expectedOutput: 'Test response',
      tags: ['test', 'verification']
    };
    
    const createResponse = await axios.post('http://localhost:3001/prompts', newPrompt);
    console.log(`✅ Prompt Created: ${createResponse.data.name} (ID: ${createResponse.data.id})`);
    
    // Test getting usage statistics
    const statsResponse = await axios.get('http://localhost:3001/prompts/stats/usage');
    console.log('📊 Usage Statistics:', statsResponse.data);
    
    return true;
  } catch (error) {
    console.log(`❌ Prompt Service Test: Error - ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 DriveEver Microservices Test Suite');
  console.log('=====================================\n');
  
  let healthyServices = 0;
  let totalServices = services.length;
  
  // Test all services
  console.log('🔍 Testing Service Health...');
  for (const service of services) {
    const isHealthy = await testService(service);
    if (isHealthy) healthyServices++;
  }
  
  // Test monitoring
  console.log('\n📊 Testing Monitoring Services...');
  for (const service of monitoring) {
    await testService(service);
  }
  
  // Test specific functionality
  const aiTest = await testAIService();
  const promptTest = await testPromptService();
  
  // Summary
  console.log('\n📋 Test Summary');
  console.log('================');
  console.log(`Services Healthy: ${healthyServices}/${totalServices}`);
  console.log(`AI Service: ${aiTest ? '✅ Working' : '❌ Failed'}`);
  console.log(`Prompt Service: ${promptTest ? '✅ Working' : '❌ Failed'}`);
  
  if (healthyServices === totalServices && aiTest && promptTest) {
    console.log('\n🎉 All tests passed! DriveEver microservices are running correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the logs above for details.');
  }
  
  console.log('\n🌐 Service URLs:');
  services.forEach(service => {
    console.log(`   ${service.name}: ${service.url}`);
  });
  
  console.log('\n📈 Monitoring URLs:');
  monitoring.forEach(service => {
    console.log(`   ${service.name}: ${service.url}`);
  });
}

// Run the tests
runAllTests().catch(console.error);




