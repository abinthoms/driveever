-- Database initialization script for DriveEver Microservices
-- Creates all necessary databases for the microservices architecture

-- Create databases for each service
CREATE DATABASE driveever_gateway;
CREATE DATABASE driveever_prompts;
CREATE DATABASE driveever_ai;
CREATE DATABASE driveever_analytics;
CREATE DATABASE driveever_users;
CREATE DATABASE driveever_vehicles;
CREATE DATABASE driveever_notifications;

-- Create users for each service (optional, for enhanced security)
CREATE USER gateway_user WITH PASSWORD 'gateway_password';
CREATE USER prompt_user WITH PASSWORD 'prompt_password';
CREATE USER ai_user WITH PASSWORD 'ai_password';
CREATE USER analytics_user WITH PASSWORD 'analytics_password';
CREATE USER user_user WITH PASSWORD 'user_password';
CREATE USER vehicle_user WITH PASSWORD 'vehicle_password';
CREATE USER notification_user WITH PASSWORD 'notification_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE driveever_gateway TO gateway_user;
GRANT ALL PRIVILEGES ON DATABASE driveever_prompts TO prompt_user;
GRANT ALL PRIVILEGES ON DATABASE driveever_ai TO ai_user;
GRANT ALL PRIVILEGES ON DATABASE driveever_analytics TO analytics_user;
GRANT ALL PRIVILEGES ON DATABASE driveever_users TO user_user;
GRANT ALL PRIVILEGES ON DATABASE driveever_vehicles TO vehicle_user;
GRANT ALL PRIVILEGES ON DATABASE driveever_notifications TO notification_user;

-- Enable UUID extension for all databases
\c driveever_gateway;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c driveever_prompts;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c driveever_ai;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c driveever_analytics;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c driveever_users;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c driveever_vehicles;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c driveever_notifications;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";




