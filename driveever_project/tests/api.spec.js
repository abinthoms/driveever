import { test, expect } from '@playwright/test';

test.describe('DriveEver API Tests', () => {
  test('API endpoints are accessible', async ({ request }) => {
    // Test that the API registration endpoint is accessible (POST only)
    const timestamp = Date.now();
    const response = await request.post('/api/users/register/', {
      data: {
        username: `testaccess${timestamp}`,
        email: `access${timestamp}@test.com`,
        password: 'testpass123',
        user_type: 'learner',
        full_name: 'Test Access'
      }
    });
    expect(response.status()).toBe(201);
  });

  test('User registration API endpoint works', async ({ request }) => {
    // Test the user registration endpoint
    const timestamp = Date.now();
    const response = await request.post('/api/users/register/', {
      data: {
        username: `testuser${timestamp}`,
        email: `test${timestamp}@example.com`,
        password: 'testpass123',
        user_type: 'learner',
        full_name: 'Test User'
      }
    });
    
    // Should return 201 Created for successful registration
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('username');
    expect(data).toHaveProperty('email');
    expect(data.username).toBe(`testuser${timestamp}`);
  });

  test('Instructor registration API endpoint works', async ({ request }) => {
    // Test the instructor registration endpoint
    const timestamp = Date.now();
    const response = await request.post('/api/users/register/instructor/', {
      data: {
        username: `testinstructor${timestamp}`,
        email: `instructor${timestamp}@test.com`,
        password: 'testpass123',
        full_name: 'Test Instructor',
        mobile_number: '+447123456789',
        adi_number: `ADI${timestamp}`,
        postcodes: 'SW1A 1AA, W1A 1AA',
        price_per_hour: '35.00'
      }
    });
    
    // Should return 201 Created for successful registration
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('Instructor account created successfully');
  });

  test('Learner registration API endpoint works', async ({ request }) => {
    // Test the learner registration endpoint
    const timestamp = Date.now();
    const response = await request.post('/api/users/register/learner/', {
      data: {
        username: `testlearner${timestamp}`,
        email: `learner${timestamp}@test.com`,
        password: 'testpass123',
        full_name: 'Test Learner'
      }
    });
    
    // Should return 201 Created for successful registration
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('Learner account created successfully');
  });

  test('Academy registration API endpoint works', async ({ request }) => {
    // Test the academy registration endpoint
    const timestamp = Date.now();
    const response = await request.post('/api/users/register/academy/', {
      data: {
        username: `testacademy${timestamp}`,
        email: `academy${timestamp}@test.com`,
        password: 'testpass123',
        academy_name: 'Test Driving Academy',
        owner_name: 'Test Owner',
        business_email: `business${timestamp}@academy.com`,
        main_postcode: 'SW1A 1AA'
      }
    });
    
    // Should return 201 Created for successful registration
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('Academy account created successfully');
  });

  test('User search API endpoint works', async ({ request }) => {
    // Test the user search endpoint with required postcode parameter
    const response = await request.get('/api/users/search/?postcode=SW1A1AA');
    expect(response.status()).toBe(200);
  });

  test('Duplicate username registration fails', async ({ request }) => {
    // First registration should succeed
    const timestamp = Date.now();
    const response1 = await request.post('/api/users/register/', {
      data: {
        username: `duplicateuser${timestamp}`,
        email: `user1${timestamp}@test.com`,
        password: 'testpass123',
        user_type: 'learner',
        full_name: 'User One'
      }
    });
    expect(response1.status()).toBe(201);
    
    // Second registration with same username should fail
    const response2 = await request.post('/api/users/register/', {
      data: {
        username: `duplicateuser${timestamp}`,
        email: `user2${timestamp}@test.com`,
        password: 'testpass123',
        user_type: 'learner',
        full_name: 'User Two'
      }
    });
    expect(response2.status()).toBe(400);
  });

  test('Invalid data registration fails', async ({ request }) => {
    // Test with missing required fields
    const response = await request.post('/api/users/register/', {
      data: {
        username: '',  // Empty username
        email: 'invalid-email',  // Invalid email
        password: '123'  // Too short password
      }
    });
    
    // Should return 400 Bad Request
    expect(response.status()).toBe(400);
  });
});
