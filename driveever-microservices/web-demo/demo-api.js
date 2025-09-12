// Demo API Server - Simulates the microservices without Docker
const http = require('http');
const url = require('url');

const PORT = 3002; // AI Service port

// Mock AI responses
const mockAIResponses = {
    gemini: {
        question: "Is my car safe to drive?",
        answer: "Based on your vehicle information, your 2020 Toyota Corolla appears to be in good condition for driving. However, I recommend checking the following safety items:\n\n1. **Tire Condition**: Ensure all tires have adequate tread depth (minimum 1.6mm)\n2. **Brake System**: Listen for any unusual noises when braking\n3. **Lights**: Check all headlights, taillights, and indicators\n4. **Fluid Levels**: Verify oil, coolant, and brake fluid levels\n\nFor a comprehensive safety assessment, I recommend scheduling a professional inspection at your local garage.",
        confidence: 0.92,
        responseTime: 245,
        provider: "gemini",
        success: true
    },
    openai: {
        question: "What maintenance does my car need?",
        answer: "Your vehicle requires regular maintenance to ensure optimal performance and safety. Here's a recommended maintenance schedule:\n\n**Immediate Attention:**\n- Oil change (if due)\n- Tire rotation and alignment check\n- Brake pad inspection\n\n**Monthly Checks:**\n- Tire pressure and condition\n- Fluid levels (oil, coolant, brake fluid)\n- Light functionality\n\n**Annual Service:**\n- Full vehicle inspection\n- Air filter replacement\n- Spark plug check\n- Transmission service\n\nI recommend consulting your vehicle's owner manual for specific maintenance intervals based on your driving conditions.",
        confidence: 0.89,
        responseTime: 312,
        provider: "openai",
        success: true
    },
    claude: {
        question: "How much is my car worth?",
        answer: "Based on current market data and your vehicle specifications, here's an estimated valuation:\n\n**2020 Toyota Corolla Valuation:**\n- **Private Sale**: £12,000 - £15,000\n- **Trade-in Value**: £10,500 - £13,000\n- **Dealer Retail**: £14,000 - £17,000\n\n**Factors Affecting Value:**\n- Mileage: Lower mileage = higher value\n- Condition: Well-maintained vehicles retain value better\n- Location: Regional market variations apply\n- Service History: Complete records increase value\n\n**Recommendations:**\n- Get multiple valuations from different sources\n- Consider timing (spring/summer often better for sales)\n- Prepare all service documentation\n- Clean and detail the vehicle before valuation\n\nFor the most accurate valuation, I recommend getting a professional appraisal or using online valuation tools with your specific vehicle details.",
        confidence: 0.94,
        responseTime: 198,
        provider: "claude",
        success: true
    }
};

const mockPrompts = [
    {
        id: "prompt_001",
        name: "Golden Vehicle Advisor",
        description: "The primary optimized prompt for vehicle advice",
        category: "vehicle_advice",
        version: "2.1.0",
        template: "You are an expert vehicle advisor. Help with: {{userQuestion}}",
        variables: ["userQuestion"],
        performance: {
            averageRating: 4.7,
            totalUses: 1250,
            successRate: 0.94,
            averageResponseTime: 280
        },
        tags: ["golden", "vehicle", "advice"],
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        lastUpdated: "2024-01-20T14:22:00Z"
    },
    {
        id: "prompt_002",
        name: "Safety Assessment Expert",
        description: "Vehicle safety evaluation and recommendations",
        category: "safety_assessment",
        version: "1.8.0",
        template: "Assess safety for vehicle: {{vehicleData}}",
        variables: ["vehicleData"],
        performance: {
            averageRating: 4.5,
            totalUses: 890,
            successRate: 0.91,
            averageResponseTime: 320
        },
        tags: ["safety", "assessment"],
        isActive: true,
        createdAt: "2024-01-10T09:15:00Z",
        lastUpdated: "2024-01-18T16:45:00Z"
    },
    {
        id: "prompt_003",
        name: "Maintenance Guide",
        description: "Vehicle maintenance recommendations and scheduling",
        category: "maintenance_guidance",
        version: "1.5.0",
        template: "Provide maintenance guidance for: {{vehicleData}}",
        variables: ["vehicleData"],
        performance: {
            averageRating: 4.3,
            totalUses: 650,
            successRate: 0.88,
            averageResponseTime: 295
        },
        tags: ["maintenance", "guidance"],
        isActive: true,
        createdAt: "2024-01-05T11:20:00Z",
        lastUpdated: "2024-01-15T13:30:00Z"
    }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Health check
    if (path === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            service: 'ai-service-demo',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        }));
        return;
    }

    // AI Service endpoints
    if (path.startsWith('/ai/')) {
        if (path === '/ai/test') {
            const provider = parsedUrl.query.provider || 'gemini';
            const response = mockAIResponses[provider] || mockAIResponses.gemini;
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                id: `ai_${Date.now()}`,
                promptId: 'test_prompt',
                userId: 'demo_user',
                vehicleId: 'demo_vehicle',
                provider: response.provider,
                question: response.question,
                answer: response.answer,
                confidence: response.confidence,
                sources: ['Vehicle Database', 'MOT Records', 'Safety Standards'],
                responseTime: response.responseTime,
                success: response.success,
                createdAt: new Date().toISOString(),
                metadata: {
                    sessionId: 'demo_session',
                    requestId: `req_${Date.now()}`,
                    model: `${response.provider}-demo`
                }
            }));
            return;
        }

        if (path === '/ai/providers/status') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                gemini: true,
                openai: true,
                claude: true
            }));
            return;
        }

        if (path === '/ai/providers') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                providers: ['gemini', 'openai', 'claude']
            }));
            return;
        }

        if (path === '/ai/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'healthy',
                providers: {
                    gemini: true,
                    openai: true,
                    claude: true
                },
                availableCount: 3,
                totalCount: 3
            }));
            return;
        }
    }

    // Prompt Service endpoints
    if (path.startsWith('/prompts')) {
        if (path === '/prompts') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(mockPrompts));
            return;
        }

        if (path === '/prompts/stats/usage') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                totalPrompts: mockPrompts.length,
                activePrompts: mockPrompts.filter(p => p.isActive).length,
                averageRating: 4.5,
                topCategory: 'vehicle_advice'
            }));
            return;
        }

        if (path === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'ok',
                service: 'prompt-service-demo',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            }));
            return;
        }
    }

    // Default response
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: 'Not Found',
        message: 'The requested endpoint was not found',
        availableEndpoints: [
            'GET /health',
            'GET /ai/test?provider=gemini|openai|claude',
            'GET /ai/providers/status',
            'GET /ai/providers',
            'GET /ai/health',
            'GET /prompts',
            'GET /prompts/stats/usage'
        ]
    }));
});

server.listen(PORT, () => {
    console.log(`🤖 AI Service Demo running at http://localhost:${PORT}`);
    console.log(`📝 Prompt Service Demo running at http://localhost:${PORT}`);
    console.log(`🧪 Test endpoints:`);
    console.log(`   - http://localhost:${PORT}/ai/test?provider=gemini`);
    console.log(`   - http://localhost:${PORT}/ai/test?provider=openai`);
    console.log(`   - http://localhost:${PORT}/ai/test?provider=claude`);
    console.log(`   - http://localhost:${PORT}/prompts`);
    console.log(`   - http://localhost:${PORT}/health`);
});




