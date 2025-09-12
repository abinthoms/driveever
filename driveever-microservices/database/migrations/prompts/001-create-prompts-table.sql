-- Migration: Create prompts table
-- Service: prompt-service
-- Version: 001

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'vehicle_advice',
        'safety_assessment',
        'maintenance_guidance',
        'cost_analysis',
        'purchase_recommendation',
        'technical_support',
        'general_inquiry',
        'emergency_guidance',
        'insurance_advice'
    )),
    version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    template TEXT NOT NULL,
    variables JSONB NOT NULL DEFAULT '[]',
    expected_output TEXT NOT NULL,
    performance JSONB NOT NULL DEFAULT '{
        "averageRating": 0,
        "totalUses": 0,
        "successRate": 0,
        "averageResponseTime": 0
    }',
    tags JSONB NOT NULL DEFAULT '[]',
    is_active BOOLEAN NOT NULL DEFAULT true,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prompts_category ON prompts(category);
CREATE INDEX IF NOT EXISTS idx_prompts_is_active ON prompts(is_active);
CREATE INDEX IF NOT EXISTS idx_prompts_performance ON prompts USING GIN(performance);
CREATE INDEX IF NOT EXISTS idx_prompts_tags ON prompts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON prompts(created_at);

-- Trigger to update last_updated timestamp
CREATE OR REPLACE FUNCTION update_prompts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_prompts_updated_at
    BEFORE UPDATE ON prompts
    FOR EACH ROW
    EXECUTE FUNCTION update_prompts_updated_at();




